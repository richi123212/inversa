import { test } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync, createHmac } from "node:crypto";
import { Readable } from "node:stream";
import orders from "../api/orders.mjs";
import checkout from "../api/checkout.mjs";
import webhook from "../api/webhooks/payments.mjs";
function response() {
  return {
    setHeader() {},
    status(code) {
      this.code = code;
      return this;
    },
    json(data) {
      this.data = data;
      return this;
    },
  };
}
const pack = (v) =>
  typeof v === "string"
    ? { stringValue: v }
    : typeof v === "number"
      ? { integerValue: String(v) }
      : { booleanValue: v };
test("pedido y checkout ignoran precios del cliente; webhook firmado confirma pago una sola vez", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  const { privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  });
  Object.assign(process.env, {
    APP_URL: "https://test.example",
    PAYMENT_PROVIDER: "stripe",
    STRIPE_SECRET_KEY: "sk_test_dummy",
    STRIPE_WEBHOOK_SECRET: "whsec_dummy",
    FIREBASE_PROJECT_ID: "test",
    FIREBASE_CLIENT_EMAIL: "server@example.test",
    FIREBASE_PRIVATE_KEY: privateKey,
  });
  const docs = new Map();
  let sessions = 0,
    revision = 0;
  docs.set("productos/prod-1", {
    fields: Object.fromEntries(
      Object.entries({
        titulo: "Equipo",
        tipo: "hardware",
        precio: 1250,
        stock: 4,
        activo: true,
      }).map(([k, v]) => [k, pack(v)]),
    ),
    updateTime: "initial",
  });
  globalThis.fetch = async (url, opts = {}) => {
    if (String(url) === "https://oauth2.googleapis.com/token")
      return Response.json({
        access_token: "server-only-token",
        expires_in: 3600,
      });
    if (String(url) === "https://api.stripe.com/v1/checkout/sessions") {
      sessions++;
      const data = new URLSearchParams(opts.body);
      assert.equal(data.get("line_items[0][price_data][currency]"), "mxn");
      assert.equal(
        data.get("line_items[0][price_data][unit_amount]"),
        "125000",
      );
      assert.equal(data.get("line_items[0][quantity]"), "2");
      assert.equal(data.get("mode"), "payment");
      return Response.json({
        id: "cs_test_1",
        url: "https://checkout.stripe.com/c/pay/test",
      });
    }
    const parsed = new URL(url);
    const path = parsed.pathname.split("/documents/")[1];
    assert(path, "Sólo Firestore está simulado.");
    if (opts.method === "PATCH") {
      const existing = docs.get(path);
      if (
        parsed.searchParams.has("currentDocument.updateTime") &&
        existing?.updateTime !==
          parsed.searchParams.get("currentDocument.updateTime")
      )
        return new Response("", { status: 412 });
      const doc = {
        ...JSON.parse(opts.body),
        updateTime: "revision-" + ++revision,
      };
      docs.set(path, doc);
      return Response.json(doc);
    }
    return docs.has(path)
      ? Response.json(docs.get(path))
      : new Response("", { status: 404 });
  };
  try {
    let res = response();
    await orders(
      {
        method: "POST",
        headers: { origin: "https://test.example" },
        body: {
          clienteNombre: "Prueba",
          clienteTelefono: "5512345678",
          clienteEmail: "test@example.com",
          direccionEntrega: "Calle de prueba 123, Ciudad de México",
          privacyAccepted: true,
          items: [{ productoId: "prod-1", cantidad: 2, precio: 0.01 }],
          total: 0.02,
        },
      },
      res,
    );
    assert.equal(res.code, 201);
    assert.equal(res.data.total, 2500);
    const { folio, token } = res.data;
    let unauthorized = response();
    await checkout(
      {
        method: "POST",
        headers: {
          authorization: "Bearer wrong",
          origin: "https://test.example",
        },
        body: { folio },
      },
      unauthorized,
    );
    assert.equal(unauthorized.code, 400);
    assert.equal(sessions, 0);
    for (let i = 0; i < 2; i++) {
      res = response();
      await checkout(
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            origin: "https://test.example",
          },
          body: { folio, total: 1 },
        },
        res,
      );
      assert.equal(res.code, 200);
      assert.equal(
        res.data.redirectUrl,
        "https://checkout.stripe.com/c/pay/test",
      );
    }
    assert.equal(sessions, 1);
    const event = {
      type: "checkout.session.completed",
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: "cs_test_1",
          client_reference_id: folio,
          payment_intent: "pi_test",
          payment_status: "paid",
          amount_total: 250000,
          currency: "mxn",
        },
      },
    };
    async function notify(payload, signatureOk = true) {
      const raw = JSON.stringify(payload),
        ts = Math.floor(Date.now() / 1000);
      const sig = createHmac("sha256", "whsec_dummy")
        .update(ts + "." + raw)
        .digest("hex");
      const req = Readable.from([raw]);
      req.method = "POST";
      req.headers = {
        "stripe-signature": "t=" + ts + ",v1=" + (signatureOk ? sig : "bad"),
      };
      req.url = "/api/webhooks/payments";
      const res = response();
      await webhook(req, res);
      return res;
    }
    assert.equal((await notify(event, false)).code, 401);
    assert.equal(
      docs.get("checkout_orders/" + folio).fields.paymentStatus.stringValue,
      "pendiente",
    );
    assert.equal((await notify(event)).code, 200);
    assert.equal((await notify(event)).code, 200);
    assert.equal(
      docs.get("checkout_orders/" + folio).fields.paymentStatus.stringValue,
      "pagado",
    );
    event.type = "checkout.session.async_payment_failed";
    event.created++;
    assert.equal((await notify(event)).code, 200);
    assert.equal(
      docs.get("checkout_orders/" + folio).fields.paymentStatus.stringValue,
      "pagado",
    );
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of Object.keys(process.env))
      if (!(key in originalEnv)) delete process.env[key];
    Object.assign(process.env, originalEnv);
  }
});
