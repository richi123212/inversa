import { createHmac } from "node:crypto";
import {
  env,
  json,
  markPayment,
  rawBody,
  safeEqual,
} from "../../server/core.mjs";
export const config = { api: { bodyParser: false } };
export function verifyStripe(raw, signature, secret, now = Date.now()) {
  const parts = String(signature ?? "")
    .split(",")
    .map((p) => p.split("="));
  const ts = parts.find(([k]) => k === "t")?.[1];
  if (!ts || Math.abs(now / 1000 - Number(ts)) > 300) return false;
  const expected = createHmac("sha256", secret)
    .update(ts + "." + raw)
    .digest("hex");
  return parts
    .filter(([k]) => k === "v1")
    .some(([, v]) => safeEqual(expected, v));
}
export function verifyMercadoPago(
  id,
  requestId,
  signature,
  secret,
  now = Date.now(),
) {
  const parts = Object.fromEntries(
    String(signature ?? "")
      .split(",")
      .map((p) => p.trim().split("=")),
  );
  if (!id || !requestId || !parts.ts || !parts.v1) return false;
  const timestamp = Number(parts.ts);
  const ms = timestamp < 1e12 ? timestamp * 1000 : timestamp;
  if (!Number.isFinite(ms) || Math.abs(now - ms) > 300000) return false;
  const manifest =
    "id:" +
    String(id).toLowerCase() +
    ";request-id:" +
    requestId +
    ";ts:" +
    parts.ts +
    ";";
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");
  return safeEqual(expected, parts.v1);
}
export default async function handler(req, res) {
  if (req.method !== "POST")
    return json(res, 405, { error: "Método no permitido." });
  try {
    const e = env();
    const raw = await rawBody(req);
    const event = JSON.parse(raw);
    if (e.PAYMENT_PROVIDER === "stripe" && e.STRIPE_WEBHOOK_SECRET) {
      if (
        !verifyStripe(
          raw,
          req.headers["stripe-signature"],
          e.STRIPE_WEBHOOK_SECRET,
        )
      )
        return json(res, 401, { error: "Firma inválida." });
      const statuses = {
        "checkout.session.completed":
          event.data?.object?.payment_status === "paid"
            ? "pagado"
            : "pendiente",
        "checkout.session.async_payment_succeeded": "pagado",
        "checkout.session.async_payment_failed": "rechazado",
        "checkout.session.expired": "rechazado",
      };
      const status = statuses[event.type];
      if (!status) return json(res, 200, { received: true });
      const p = event.data.object;
      await markPayment(p.client_reference_id, status, {
        provider: "stripe",
        id: p.payment_intent ?? p.id,
        sessionId: p.id,
        totalCents: p.amount_total,
        currency: p.currency,
        updatedAt: event.created,
      });
    } else if (e.PAYMENT_PROVIDER === "mercadopago" && e.MP_WEBHOOK_SECRET) {
      const id = new URL(req.url, e.APP_URL).searchParams.get("data.id");
      if (
        !verifyMercadoPago(
          id,
          req.headers["x-request-id"],
          req.headers["x-signature"],
          e.MP_WEBHOOK_SECRET,
        )
      )
        return json(res, 401, { error: "Firma inválida." });
      if (event.type !== "payment") return json(res, 200, { received: true });
      if (!/^[0-9]+$/.test(id))
        return json(res, 400, { error: "Referencia inválida." });
      const r = await fetch("https://api.mercadopago.com/v1/payments/" + id, {
        headers: { Authorization: "Bearer " + e.MP_ACCESS_TOKEN },
      });
      if (!r.ok) throw new Error("No se pudo verificar el pago.");
      const p = await r.json();
      const status =
        p.status === "approved"
          ? "pagado"
          : ["rejected", "cancelled"].includes(p.status)
            ? "rechazado"
            : "pendiente";
      await markPayment(p.external_reference, status, {
        provider: "mercadopago",
        id: String(p.id),
        totalCents: Math.round(p.transaction_amount * 100),
        currency: p.currency_id,
        metadata: p.metadata,
        updatedAt: Math.floor(Date.parse(p.date_last_updated) / 1000),
      });
    } else return json(res, 503, { error: "Proveedor sin configurar." });
    return json(res, 200, { received: true });
  } catch {
    return json(res, 500, {
      error: "No se pudo confirmar el evento. Se requiere reintento.",
    });
  }
}
