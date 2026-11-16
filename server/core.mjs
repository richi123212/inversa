import {
  createHash,
  createHmac,
  createSign,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
export const env = () => process.env;
export function paymentReady() {
  const e = env();
  return Boolean(
    e.APP_URL &&
    e.FIREBASE_PROJECT_ID &&
    e.FIREBASE_CLIENT_EMAIL &&
    e.FIREBASE_PRIVATE_KEY &&
    (e.PAYMENT_PROVIDER === "stripe"
      ? e.STRIPE_SECRET_KEY && e.STRIPE_WEBHOOK_SECRET
      : e.PAYMENT_PROVIDER === "mercadopago"
        ? e.MP_ACCESS_TOKEN && e.MP_WEBHOOK_SECRET
        : false),
  );
}
export function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}
export function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length)
    return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
export function json(res, status, data) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(data);
}
export function sameOrigin(req) {
  if (!env().APP_URL) throw new Error("Servidor sin configurar.");
  const origin = req.headers.origin;
  if (origin && origin !== new URL(env().APP_URL).origin)
    throw new Error("Origen no permitido.");
}
export async function rawBody(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    const b = Buffer.from(chunk);
    size += b.length;
    if (size > 65536) throw new Error("Solicitud demasiado grande.");
    chunks.push(b);
  }
  return Buffer.concat(chunks).toString("utf8");
}
export async function body(req) {
  if (req.body && typeof req.body === "object") return req.body;
  return JSON.parse(
    typeof req.body === "string" ? req.body : await rawBody(req),
  );
}
let cachedToken;
async function accessToken() {
  if (cachedToken && cachedToken.exp > Date.now() + 60000)
    return cachedToken.value;
  const e = env(),
    now = Math.floor(Date.now() / 1000);
  const encode = (x) => Buffer.from(JSON.stringify(x)).toString("base64url");
  const data =
    encode({ alg: "RS256", typ: "JWT" }) +
    "." +
    encode({
      iss: e.FIREBASE_CLIENT_EMAIL,
      scope: "https://www.googleapis.com/auth/datastore",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    });
  const sign = createSign("RSA-SHA256");
  sign.update(data);
  const assertion =
    data +
    "." +
    sign.sign(e.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), "base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const out = await r.json();
  if (!r.ok) throw new Error("No se pudo autenticar el servidor.");
  cachedToken = {
    value: out.access_token,
    exp: Date.now() + out.expires_in * 1000,
  };
  return cachedToken.value;
}
function unpack(v) {
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("arrayValue" in v) return (v.arrayValue.values ?? []).map(unpack);
  if ("mapValue" in v)
    return Object.fromEntries(
      Object.entries(v.mapValue.fields ?? {}).map(([k, x]) => [k, unpack(x)]),
    );
  return null;
}
function pack(v) {
  if (v === null) return { nullValue: null };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(pack) } };
  if (typeof v === "object")
    return {
      mapValue: {
        fields: Object.fromEntries(
          Object.entries(v).map(([k, x]) => [k, pack(x)]),
        ),
      },
    };
  if (typeof v === "number")
    return Number.isInteger(v)
      ? { integerValue: String(v) }
      : { doubleValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  return { stringValue: String(v) };
}
export async function store(path, options = {}) {
  const url =
    "https://firestore.googleapis.com/v1/projects/" +
    encodeURIComponent(env().FIREBASE_PROJECT_ID) +
    "/databases/(default)/documents/" +
    path;
  const r = await fetch(url + (options.query ?? ""), {
    method: options.method ?? "GET",
    headers: {
      Authorization: "Bearer " + (await accessToken()),
      "Content-Type": "application/json",
    },
    ...(options.data
      ? {
          body: JSON.stringify({
            fields: Object.fromEntries(
              Object.entries(options.data).map(([k, v]) => [k, pack(v)]),
            ),
          }),
        }
      : {}),
  });
  if (r.status === 404) return null;
  if (!r.ok) {
    const error = new Error("No se pudo acceder al registro.");
    error.status = r.status;
    throw error;
  }
  const doc = await r.json();
  return {
    data: Object.fromEntries(
      Object.entries(doc.fields ?? {}).map(([k, v]) => [k, unpack(v)]),
    ),
    updateTime: doc.updateTime,
  };
}
export async function reprice(items) {
  if (!Array.isArray(items) || !items.length || items.length > 50)
    throw new Error("Pedido inválido.");
  const seen = new Set();
  const priced = [];
  for (const item of items) {
    if (
      !/^[\w-]{1,120}$/.test(item.productoId) ||
      !Number.isInteger(item.cantidad) ||
      item.cantidad < 1 ||
      item.cantidad > 100 ||
      seen.has(item.productoId)
    )
      throw new Error("Partida inválida.");
    seen.add(item.productoId);
    const record = await store("productos/" + item.productoId);
    const p = record?.data;
    if (
      !p ||
      p.activo === false ||
      p.tipo !== "hardware" ||
      !Number.isFinite(p.stock) ||
      p.stock < item.cantidad
    )
      throw new Error("Producto no disponible.");
    const precio = p.precioOferta ?? p.precio;
    if (!Number.isFinite(precio) || precio <= 0)
      throw new Error("Precio pendiente de confirmar.");
    priced.push({
      productoId: item.productoId,
      titulo: String(p.titulo),
      cantidad: item.cantidad,
      precio: Math.round(precio * 100) / 100,
    });
  }
  const totalCents = priced.reduce(
    (sum, p) => sum + Math.round(p.precio * 100) * p.cantidad,
    0,
  );
  if (totalCents < 1 || totalCents > 100000000)
    throw new Error("Total fuera del límite permitido.");
  return { items: priced, totalCents, total: totalCents / 100 };
}
export async function authorizedOrder(req, folio) {
  if (!/^[A-Za-z0-9-]{1,100}$/.test(folio)) throw new Error("Folio inválido.");
  const record = await store("checkout_orders/" + folio);
  const token = (req.headers.authorization ?? "").replace(/^Bearer /, "");
  if (!record || !token || !safeEqual(record.data.tokenHash, hash(token)))
    throw new Error("Pedido no autorizado.");
  return record;
}
export function createOrderToken() {
  return randomBytes(32).toString("hex");
}
export async function markPayment(folio, status, payment) {
  if (!/^[A-Za-z0-9-]{1,100}$/.test(folio)) throw new Error("Folio inválido.");
  for (let i = 0; i < 3; i++) {
    const current = await store("checkout_orders/" + folio);
    if (!current) throw new Error("Pedido no encontrado.");
    const order = current.data;
    if (
      order.provider !== payment.provider ||
      order.totalCents !== payment.totalCents ||
      payment.currency.toLowerCase() !== "mxn"
    )
      throw new Error("Pago no coincide con el pedido.");
    if (payment.provider === "stripe" && order.sessionId !== payment.sessionId)
      throw new Error("Sesión no coincide.");
    if (
      payment.provider === "mercadopago" &&
      String(payment.metadata?.folio) !== folio
    )
      throw new Error("Referencia no coincide.");
    if (order.paymentStatus === "pagado") return;
    if ((order.paymentUpdatedAt ?? 0) > payment.updatedAt) return;
    try {
      await store("checkout_orders/" + folio, {
        method: "PATCH",
        query:
          "?currentDocument.updateTime=" +
          encodeURIComponent(current.updateTime),
        data: {
          ...order,
          paymentStatus: status,
          paymentId: payment.id,
          paymentUpdatedAt: payment.updatedAt,
        },
      });
      return;
    } catch (e) {
      if (e.status !== 409 && e.status !== 412) throw e;
    }
  }
  throw new Error("Reintentar actualización del pago.");
}
