import {
  authorizedOrder,
  body,
  env,
  json,
  paymentReady,
  reprice,
  sameOrigin,
  store,
} from "../server/core.mjs";
import { paymentProvider } from "../server/providers.mjs";
export default async function handler(req, res) {
  if (req.method === "GET") return json(res, 200, { enabled: paymentReady() });
  if (req.method !== "POST")
    return json(res, 405, { error: "Método no permitido." });
  try {
    sameOrigin(req);
    if (!paymentReady())
      return json(res, 503, { error: "Pagos en línea próximamente." });
    const { folio } = await body(req);
    const record = await authorizedOrder(req, folio);
    const order = record.data;
    if (order.paymentStatus === "pagado")
      return json(res, 409, { error: "El pedido ya está pagado." });
    if (order.provider !== env().PAYMENT_PROVIDER)
      throw new Error(
        "El proveedor del pedido cambió. Genera un pedido nuevo.",
      );
    if (order.redirectUrl)
      return json(res, 200, { redirectUrl: order.redirectUrl });
    const priced = await reprice(order.items);
    if (priced.totalCents !== order.totalCents)
      throw new Error(
        "El precio cambió. Revisa tu carrito y genera un pedido nuevo.",
      );
    const session = await paymentProvider().createCheckout({
      ...order,
      ...priced,
    });
    if (!session.redirectUrl || !session.sessionId)
      throw new Error("Sesión de pago no disponible.");
    await store("checkout_orders/" + folio, {
      method: "PATCH",
      query:
        "?currentDocument.updateTime=" + encodeURIComponent(record.updateTime),
      data: { ...order, ...session },
    });
    return json(res, 200, { redirectUrl: session.redirectUrl });
  } catch (e) {
    return json(res, 400, { error: e.message });
  }
}
