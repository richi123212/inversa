import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { whatsappUrl } from "../data/company";
import { Seo } from "../components/Seo";
export function PaymentReturnPage() {
  const { result } = useParams();
  const [params] = useSearchParams();
  const folio = params.get("folio") ?? "Información pendiente";
  const [status, setStatus] = useState("pendiente");
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    async function check() {
      try {
        const token = sessionStorage.getItem("inversa.order." + folio);
        if (!token) return;
        const r = await fetch(
          "/api/orders?folio=" + encodeURIComponent(folio),
          { headers: { Authorization: "Bearer " + token } },
        );
        if (r.ok) {
          const d = await r.json();
          if (!stopped) {
            setStatus(d.paymentStatus);
            setVerified(true);
            if (d.paymentStatus === "pendiente")
              timer = setTimeout(check, 5000);
          }
        }
      } catch {}
    }
    check();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [folio]);
  const title =
    verified && status === "pagado"
      ? "Pago confirmado"
      : verified && status === "rechazado"
        ? "Pago no aprobado"
        : result === "error"
          ? "Pago no completado"
          : "Pago pendiente de confirmación";
  const wa = whatsappUrl(
    "Hola, solicito información del pago de mi pedido " + folio + ".",
  );
  return (
    <div className="page-shell section">
      <Seo title={title} />
      <p className="eyebrow">Pedido de tienda</p>
      <h1>{title}</h1>
      <p className="lead">Folio: {folio}</p>
      <p className="muted">
        {status === "pagado" && verified
          ? "El servidor confirmó tu pago a través del proveedor."
          : "La confirmación depende de la notificación del proveedor. Regresar a esta página no acredita un pago."}
      </p>
      <div className="flex flex-wrap gap-4 mt-8">
        {wa && (
          <a className="btn" href={wa}>
            Consultar por WhatsApp
          </a>
        )}
        <Link className="btn secondary" to="/tienda">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
