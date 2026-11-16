import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import fs from "node:fs";
import ts from "typescript";
import { verifyStripe, verifyMercadoPago } from "../api/webhooks/payments.mjs";
import { paymentReady, reprice } from "../server/core.mjs";
import checkout from "../api/checkout.mjs";
const compiled = ts.transpileModule(
  fs.readFileSync("src/data/quoteConfig.ts", "utf8"),
  {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ES2020,
    },
  },
).outputText;
const { calculateQuote, resolveSelection, initialAnswers, quoteConfig } =
  await import(
    "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
  );
test("base, IVA y mantenimiento separado", () => {
  const base = calculateQuote(initialAnswers);
  assert.equal(base.total, 4408);
  assert.equal(base.days, 3);
  const quote = calculateQuote({ ...initialAnswers, maintenance: ["plus"] });
  assert.equal(quote.monthly, 1500);
  assert.equal(quote.total, 4408);
});
test("dependencias y eliminación en cascada", () => {
  let a = resolveSelection(initialAnswers, "data", "datatable").answers;
  assert.deepEqual(new Set(a.data), new Set(["datatable", "mysql"]));
  a = resolveSelection(a, "data", "mysql").answers;
  assert.deepEqual(a.data, []);
  let b = resolveSelection(initialAnswers, "security", "roles").answers;
  b = resolveSelection(b, "security", "activity").answers;
  assert(b.security.includes("users"));
  b = resolveSelection(b, "security", "users").answers;
  assert.deepEqual(b.security, []);
});
test("recargos, IVA y días redondeados", () => {
  const q = calculateQuote({
    ...initialAnswers,
    pages: ["home", "page-0"],
    data: ["mysql", "datatable"],
    delivery: ["express"],
    maintenance: ["premium-maintenance"],
  });
  assert.equal(q.base, 7250);
  assert.equal(q.surcharge, 1450);
  assert.equal(q.vat, 1392);
  assert.equal(q.total, 10092);
  assert.equal(q.days, 5);
  assert.equal(q.monthly, 3000);
  assert.equal(quoteConfig.steps.length, 14);
});
test("Stripe rechaza firmas alteradas y antiguas, acepta firmas rotadas", () => {
  const raw = '{"type":"checkout.session.completed"}',
    secret = "test-only",
    now = Date.now(),
    ts = Math.floor(now / 1000);
  const sig = createHmac("sha256", secret)
    .update(ts + "." + raw)
    .digest("hex");
  assert(verifyStripe(raw, "t=" + ts + ",v1=bad,v1=" + sig, secret, now));
  assert(!verifyStripe(raw + "x", "t=" + ts + ",v1=" + sig, secret, now));
  assert(!verifyStripe(raw, "t=" + ts + ",v1=" + sig, secret, now + 301000));
});
test("Mercado Pago vincula id, request-id y timestamp", () => {
  const now = Date.now(),
    ts = String(now),
    secret = "test-only";
  const sig = createHmac("sha256", secret)
    .update("id:abc123;request-id:req-1;ts:" + ts + ";")
    .digest("hex");
  assert(
    verifyMercadoPago(
      "ABC123",
      "req-1",
      "ts=" + ts + ",v1=" + sig,
      secret,
      now,
    ),
  );
  assert(
    !verifyMercadoPago(
      "other",
      "req-1",
      "ts=" + ts + ",v1=" + sig,
      secret,
      now,
    ),
  );
  assert(
    !verifyMercadoPago(
      "ABC123",
      "req-2",
      "ts=" + ts + ",v1=" + sig,
      secret,
      now,
    ),
  );
  assert(
    !verifyMercadoPago(
      "ABC123",
      "req-1",
      "ts=" + ts + ",v1=" + sig,
      secret,
      now + 301000,
    ),
  );
});
test("pagos sin llaves deshabilitados; no acepta partidas malformadas", async () => {
  const previous = process.env.PAYMENT_PROVIDER;
  process.env.PAYMENT_PROVIDER = "none";
  assert.equal(paymentReady(), false);
  const res = {
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
  await checkout({ method: "GET" }, res);
  assert.equal(res.code, 200);
  assert.equal(res.data.enabled, false);
  for (const input of [
    [],
    [{ productoId: "../otro", cantidad: 1 }],
    [{ productoId: "a", cantidad: -1 }],
    [{ productoId: "a", cantidad: 1.5 }],
  ]) {
    await assert.rejects(reprice(input));
  }
  if (previous === undefined) delete process.env.PAYMENT_PROVIDER;
  else process.env.PAYMENT_PROVIDER = previous;
});
test("fuente legal preservada y cinco rutas sin duplicados", () => {
  const text = fs.readFileSync("content/legal/INVERSA_legales.md", "utf8");
  const routes = Array.from(
    text.matchAll(/<!-- ruta: (.*?) -->/g),
    (m) => m[1],
  );
  assert.equal(routes.length, 5);
  assert.equal(new Set(routes).size, 5);
  const original = "C:/Users/richi/Downloads/INVERSA_legales.md";
  if (fs.existsSync(original))
    assert.equal(text, fs.readFileSync(original, "utf8"));
});
