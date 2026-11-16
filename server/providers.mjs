import { env } from "./core.mjs";
/** @typedef {{folio:string,items:Array<{titulo:string,cantidad:number,precio:number}>,totalCents:number}} CheckoutOrder */
/** @typedef {{createCheckout(order:CheckoutOrder):Promise<{redirectUrl:string,sessionId:string}>}} PaymentProvider */
async function request(url, key, body, idempotency, form = false) {
  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": form
        ? "application/x-www-form-urlencoded"
        : "application/json",
      ...(idempotency
        ? { [form ? "Idempotency-Key" : "X-Idempotency-Key"]: idempotency }
        : {}),
    },
    body: form ? body.toString() : JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) throw new Error("No fue posible crear la sesión de pago.");
  return data;
}
/** @implements {PaymentProvider} */
export class StripeProvider {
  async createCheckout(order) {
    const base = env().APP_URL.replace(/\/$/, "");
    const params = new URLSearchParams({
      mode: "payment",
      client_reference_id: order.folio,
      "metadata[folio]": order.folio,
      success_url: base + "/pago/exito?folio=" + order.folio,
      cancel_url: base + "/pago/error?folio=" + order.folio,
    });
    order.items.forEach((item, i) => {
      params.set("line_items[" + i + "][price_data][currency]", "mxn");
      params.set(
        "line_items[" + i + "][price_data][unit_amount]",
        String(Math.round(item.precio * 100)),
      );
      params.set(
        "line_items[" + i + "][price_data][product_data][name]",
        item.titulo,
      );
      params.set("line_items[" + i + "][quantity]", String(item.cantidad));
    });
    const session = await request(
      "https://api.stripe.com/v1/checkout/sessions",
      env().STRIPE_SECRET_KEY,
      params,
      "inversa-" + order.folio,
      true,
    );
    return { redirectUrl: session.url, sessionId: session.id };
  }
}
/** @implements {PaymentProvider} */
export class MercadoPagoProvider {
  async createCheckout(order) {
    const base = env().APP_URL.replace(/\/$/, "");
    const preference = await request(
      "https://api.mercadopago.com/checkout/preferences",
      env().MP_ACCESS_TOKEN,
      {
        external_reference: order.folio,
        metadata: { folio: order.folio },
        items: order.items.map((p) => ({
          title: p.titulo,
          quantity: p.cantidad,
          unit_price: p.precio,
          currency_id: "MXN",
        })),
        back_urls: {
          success: base + "/pago/exito?folio=" + order.folio,
          failure: base + "/pago/error?folio=" + order.folio,
          pending: base + "/pago/pendiente?folio=" + order.folio,
        },
        notification_url: base + "/api/webhooks/payments",
        auto_return: "approved",
      },
      "inversa-" + order.folio,
    );
    return {
      redirectUrl:
        env().PAYMENT_TEST_MODE !== "false"
          ? preference.sandbox_init_point
          : preference.init_point,
      sessionId: preference.id,
    };
  }
}
export function paymentProvider() {
  return env().PAYMENT_PROVIDER === "stripe"
    ? new StripeProvider()
    : new MercadoPagoProvider();
}
