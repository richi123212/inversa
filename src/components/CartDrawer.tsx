import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PrivacyCheck, PrivacyNotice } from "./PrivacyNotice";
import { whatsappUrl } from "../data/company";
const money = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
    n,
  );
interface ServerOrder {
  folio: string;
  token: string;
  total: number;
  items: { titulo: string; cantidad: number; precio: number }[];
}
export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal } =
    useCart();
  const { pathname } = useLocation();
  const [step, setStep] = useState(1);
  const [enabled, setEnabled] = useState(false);
  const [consent, setConsent] = useState(false);
  const [client, setClient] = useState({
    clienteNombre: "",
    clienteEmail: "",
    clienteTelefono: "",
    direccionEntrega: "",
  });
  const [order, setOrder] = useState<ServerOrder | null>(null);
  const [localFolio, setLocalFolio] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      setError("");
      fetch("/api/checkout")
        .then((r) => (r.ok ? r.json() : { enabled: false }))
        .then((d) => setEnabled(d.enabled === true))
        .catch(() => setEnabled(false));
      const previous = document.activeElement as HTMLElement;
      dialog.current?.focus();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
        previous?.focus();
      };
    }
  }, [isOpen]);
  useEffect(() => {
    if (step !== 1) {
      setStep(1);
      setOrder(null);
      setConsent(false);
    }
  }, [items]);
  useEffect(() => {
    if (!pathname.startsWith("/tienda")) closeCart();
  }, [pathname]);
  if (!isOpen) return null;
  const folio = order?.folio ?? localFolio;
  const wa = whatsappUrl(
    "Hola, solicito pago por WhatsApp / transferencia para el folio " +
      folio +
      ".\n" +
      items.map((i) => i.cantidad + " × " + i.producto.titulo).join("\n") +
      "\nTotal de referencia: " +
      money(subtotal),
  );
  async function prepare(e: FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setBusy(true);
    setError("");
    try {
      if (enabled) {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...client,
            privacyAccepted: true,
            items: items.map((i) => ({
              productoId: i.producto.id,
              cantidad: i.cantidad,
            })),
          }),
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error ?? "No se pudo preparar el pedido.");
        try {
          sessionStorage.setItem("inversa.order." + data.folio, data.token);
        } catch {
          throw new Error(
            "Habilita el almacenamiento de sesión para continuar al pago.",
          );
        }
        setOrder(data);
      } else {
        setLocalFolio("SOL-" + crypto.randomUUID().slice(0, 8).toUpperCase());
        setOrder(null);
      }
      setStep(3);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function pay() {
    if (!order || !consent) return;
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + order.token,
        },
        body: JSON.stringify({ folio: order.folio }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error ?? "No se pudo iniciar el pago.");
      const url = new URL(d.redirectUrl);
      if (
        url.protocol !== "https:" ||
        ![
          "checkout.stripe.com",
          "www.mercadopago.com.mx",
          "sandbox.mercadopago.com.mx",
        ].includes(url.hostname)
      )
        throw new Error("Destino de pago inválido.");
      window.location.assign(url.href);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function trap(e: React.KeyboardEvent) {
    if (e.key === "Escape") closeCart();
    if (e.key === "Tab") {
      const list = dialog.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled),a[href],input,textarea",
      );
      if (!list?.length) return;
      const first = list[0],
        last = list[list.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === dialog.current)
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  return (
    <div
      className="cart-overlay no-print"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
    >
      <div
        className="checkout-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Pedido de tienda"
        tabIndex={-1}
        ref={dialog}
        onKeyDown={trap}
      >
        <div className="flex justify-between items-center gap-3">
          <h2>Tu pedido</h2>
          <button
            className="btn secondary"
            aria-label="Cerrar carrito"
            onClick={closeCart}
          >
            ✕
          </button>
        </div>
        <p className="eyebrow">
          Paso {step} de 3 ·{" "}
          {step === 1
            ? "Carrito"
            : step === 2
              ? "Datos de envío"
              : "Liquidación"}
        </p>
        {step === 1 && (
          <>
            <ul className="cart-items">
              {items.map(({ producto: p, cantidad }) => (
                <li key={p.id}>
                  <strong>{p.titulo}</strong>
                  <p>{money(p.precioOferta ?? p.precio)} MXN</p>
                  <label>
                    Cantidad
                    <input
                      aria-label={"Cantidad de " + p.titulo}
                      type="number"
                      min={1}
                      max={p.stock}
                      value={cantidad}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (Number.isInteger(n) && n >= 1)
                          updateQuantity(p.id, n);
                      }}
                    />
                  </label>
                  <button
                    className="text-cyan-300"
                    onClick={() => removeFromCart(p.id)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
            <p className="lead">Total: {money(subtotal)} MXN</p>
            <button
              className="btn"
              disabled={!items.length}
              onClick={() => setStep(2)}
            >
              Continuar →
            </button>
          </>
        )}
        {step === 2 && (
          <form className="form-grid" onSubmit={prepare}>
            <h3>Contacto y envío</h3>
            {[
              ["clienteNombre", "Nombre", "text"],
              ["clienteEmail", "Correo", "email"],
              ["clienteTelefono", "Teléfono / WhatsApp", "tel"],
            ].map(([key, label, type]) => (
              <label key={key}>
                {label}
                <input
                  required
                  type={type}
                  minLength={key === "clienteNombre" ? 2 : undefined}
                  maxLength={150}
                  pattern={type === "tel" ? "[+]?[0-9]{10,15}" : undefined}
                  value={client[key as keyof typeof client]}
                  onChange={(e) =>
                    setClient({ ...client, [key]: e.target.value })
                  }
                />
              </label>
            ))}
            <label>
              Dirección de envío (calle, número, colonia, CP, municipio y
              estado)
              <textarea
                required
                minLength={10}
                maxLength={1000}
                rows={4}
                value={client.direccionEntrega}
                onChange={(e) =>
                  setClient({ ...client, direccionEntrega: e.target.value })
                }
              />
            </label>
            <PrivacyNotice />
            <PrivacyCheck checked={consent} onChange={setConsent} />
            <button className="btn" disabled={busy || !consent}>
              {busy ? "Preparando…" : "Confirmar datos"}
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => setStep(1)}
            >
              Atrás
            </button>
          </form>
        )}
        {step === 3 && (
          <div className="space-y-5">
            <h3>Resumen del pedido</h3>
            <p>
              Folio: <strong>{folio}</strong>
            </p>
            {!order && (
              <p className="muted">
                Solicitud de referencia pendiente de confirmación; todavía no es
                un pedido confirmado.
              </p>
            )}
            <ul>
              {(
                order?.items ??
                items.map((i) => ({
                  titulo: i.producto.titulo,
                  cantidad: i.cantidad,
                  precio: i.producto.precioOferta ?? i.producto.precio,
                }))
              ).map((i, n) => (
                <li key={n}>
                  {i.cantidad} × {i.titulo} · {money(i.precio * i.cantidad)}
                </li>
              ))}
            </ul>
            <p className="lead">Total: {money(order?.total ?? subtotal)} MXN</p>
            <div className="panel">
              <strong>Dirección de envío confirmada</strong>
              <p>{client.direccionEntrega}</p>
              <button
                className="text-cyan-300 underline"
                onClick={() => {
                  setOrder(null);
                  setStep(2);
                }}
              >
                Modificar datos
              </button>
            </div>
            <PrivacyCheck checked={consent} onChange={setConsent} />
            <p className="text-sm">
              <Link to="/tienda/terminos-de-venta" onClick={closeCart}>
                Términos de venta
              </Link>{" "}
              ·{" "}
              <Link to="/tienda/devoluciones-y-garantias" onClick={closeCart}>
                Devoluciones y garantías
              </Link>
            </p>
            <button
              className="btn w-full"
              disabled={!enabled || !order || busy || !consent}
              onClick={pay}
            >
              {!enabled
                ? "Pagos en línea próximamente"
                : busy
                  ? "Redirigiendo…"
                  : "Ir a pagar de forma segura"}
            </button>
            <p className="muted text-sm">
              Serás redirigido a la plataforma de pago.
            </p>
            {wa ? (
              <a
                className="btn secondary w-full"
                href={wa}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar pago por WhatsApp / transferencia
              </a>
            ) : (
              <p className="muted">
                WhatsApp: Información pendiente.{" "}
                <Link
                  className="text-cyan-300 underline"
                  onClick={closeCart}
                  to="/contacto"
                >
                  Consultar canales de contacto
                </Link>
              </p>
            )}
          </div>
        )}
        {error && (
          <p role="alert" className="text-amber-300 mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
