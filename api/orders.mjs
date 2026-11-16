import { randomUUID } from "node:crypto";
import {
  authorizedOrder,
  body,
  createOrderToken,
  hash,
  json,
  paymentReady,
  reprice,
  sameOrigin,
  store,
} from "../server/core.mjs";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { folio } = req.query;
      const order = await authorizedOrder(req, folio);
      return json(res, 200, { folio, paymentStatus: order.data.paymentStatus });
    }
    if (req.method !== "POST")
      return json(res, 405, { error: "Método no permitido." });
    sameOrigin(req);
    if (!paymentReady())
      return json(res, 503, { error: "Pagos en línea próximamente." });
    const data = await body(req);
    const {
      clienteNombre,
      clienteTelefono,
      clienteEmail,
      direccionEntrega,
      privacyAccepted,
    } = data;
    if (
      privacyAccepted !== true ||
      typeof clienteNombre !== "string" ||
      clienteNombre.trim().length < 2 ||
      clienteNombre.length > 150 ||
      typeof clienteEmail !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clienteEmail) ||
      clienteEmail.length > 254 ||
      typeof clienteTelefono !== "string" ||
      !/^[+0-9 ()-]{10,20}$/.test(clienteTelefono) ||
      clienteTelefono.replace(/\D/g, "").length < 10 ||
      typeof direccionEntrega !== "string" ||
      direccionEntrega.trim().length < 10 ||
      direccionEntrega.length > 1000
    )
      throw new Error("Revisa tus datos de contacto y envío.");
    const priced = await reprice(data.items);
    const folio = "ORD-" + randomUUID();
    const token = createOrderToken();
    await store("checkout_orders/" + folio, {
      method: "PATCH",
      query: "?currentDocument.exists=false",
      data: {
        ...priced,
        folio,
        clienteNombre: clienteNombre.trim(),
        clienteTelefono,
        clienteEmail,
        direccionEntrega,
        privacyAccepted: true,
        privacyAcceptedAt: new Date().toISOString(),
        tokenHash: hash(token),
        paymentStatus: "pendiente",
        provider: process.env.PAYMENT_PROVIDER,
        createdAt: new Date().toISOString(),
      },
    });
    return json(res, 201, { folio, token, ...priced });
  } catch (e) {
    return json(res, 400, { error: e.message });
  }
}
