import { test } from "node:test";
import assert from "node:assert/strict";
import { StripeProvider, MercadoPagoProvider } from "../server/providers.mjs";
test("ambos proveedores generan checkout alojado, MXN y folio; Mercado Pago usa sandbox de inicio", async () => {
  const previousFetch = globalThis.fetch,
    previousEnv = { ...process.env };
  Object.assign(process.env, {
    APP_URL: "https://test.example",
    MP_ACCESS_TOKEN: "TEST-dummy",
    PAYMENT_TEST_MODE: "true",
    STRIPE_SECRET_KEY: "sk_test_dummy",
  });
  let count = 0;
  globalThis.fetch = async (url, opts) => {
    count++;
    if (String(url).includes("mercadopago")) {
      const payload = JSON.parse(opts.body);
      assert.equal(payload.external_reference, "ORD-TEST");
      assert.equal(payload.metadata.folio, "ORD-TEST");
      assert.equal(payload.items[0].currency_id, "MXN");
      assert.equal(payload.items[0].unit_price, 1234.5);
      assert.equal(
        payload.back_urls.pending,
        "https://test.example/pago/pendiente?folio=ORD-TEST",
      );
      return Response.json({
        id: "preference-test",
        sandbox_init_point: "https://sandbox.mercadopago.com.mx/test",
        init_point: "https://www.mercadopago.com.mx/test",
      });
    }
    const payload = new URLSearchParams(opts.body);
    assert.equal(payload.get("mode"), "payment");
    assert.equal(payload.get("line_items[0][price_data][currency]"), "mxn");
    assert.equal(
      payload.get("line_items[0][price_data][unit_amount]"),
      "123450",
    );
    return Response.json({
      id: "cs_test",
      url: "https://checkout.stripe.com/test",
    });
  };
  try {
    const order = {
      folio: "ORD-TEST",
      items: [{ titulo: "Equipo de prueba", cantidad: 1, precio: 1234.5 }],
      totalCents: 123450,
    };
    assert.equal(
      (await new MercadoPagoProvider().createCheckout(order)).redirectUrl,
      "https://sandbox.mercadopago.com.mx/test",
    );
    assert.equal(
      (await new StripeProvider().createCheckout(order)).redirectUrl,
      "https://checkout.stripe.com/test",
    );
    assert.equal(count, 2);
  } finally {
    globalThis.fetch = previousFetch;
    for (const key of Object.keys(process.env))
      if (!(key in previousEnv)) delete process.env[key];
    Object.assign(process.env, previousEnv);
  }
});
