import { FormEvent, useState } from "react";
import { company, pending, whatsappUrl } from "../data/company";
import { Seo } from "./Seo";
import { PrivacyNotice } from "./PrivacyNotice";
import { createOrder } from "../services/ordersService";
export function ContactSection({ onGoToStore }: { onGoToStore?: () => void }) {
  const [result, setResult] = useState<{
    folio: string;
    local: boolean;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const wa = whatsappUrl("Hola, solicito una cotización.");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      const order = await createOrder({
        clienteNombre: String(data.get("name")),
        clienteEmail: String(data.get("email")),
        clienteTelefono: String(data.get("phone")),
        items: [],
        total: 0,
        estado: "pendiente",
        notas:
          "Solicitud de contacto. Empresa: " +
          String(data.get("company")) +
          "\n" +
          String(data.get("message")),
      });
      setResult({ folio: order.id, local: order.savedLocally === true });
    } catch {
      setError(
        "No se pudo registrar la solicitud. Intenta nuevamente o usa los canales de contacto.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="page-shell section">
      <Seo title="Contacto" />
      <p className="eyebrow">Hablemos de tu proyecto</p>
      <h1>Contacto y cotizaciones</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="panel">
          <h2>Atención INVERSA</h2>
          <dl className="space-y-5">
            {[
              ["Correo", company.correoContacto],
              ["Teléfono", company.telefono],
              ["Horario", company.horario],
              ["Cobertura de envíos", company.coberturaEnvios],
            ].map(([l, v]) => (
              <div key={l}>
                <dt>{l}</dt>
                <dd className="muted">{v ?? pending}</dd>
              </div>
            ))}
          </dl>
          {wa && (
            <a className="btn mt-6" href={wa}>
              WhatsApp
            </a>
          )}
        </div>
        <form className="panel form-grid" onSubmit={submit}>
          <h2>Cuéntanos qué necesitas</h2>
          {result ? (
            <div role="status">
              <p>
                {result.local
                  ? "Solicitud guardada en este navegador. Confirma el envío por un canal de contacto publicado."
                  : "Solicitud recibida. Revisaremos tus requerimientos."}
              </p>
              <p>Folio: {result.folio}</p>
            </div>
          ) : (
            <>
              <label>
                Nombre
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={150}
                  autoComplete="name"
                />
              </label>
              <label>
                Empresa (opcional)
                <input
                  name="company"
                  maxLength={150}
                  autoComplete="organization"
                />
              </label>
              <label>
                Correo
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                />
              </label>
              <label>
                Teléfono / WhatsApp
                <input
                  name="phone"
                  type="tel"
                  required
                  pattern="[+]?[0-9]{10,15}"
                  autoComplete="tel"
                />
              </label>
              <label>
                Mensaje
                <textarea name="message" required maxLength={3000} rows={4} />
              </label>
              <PrivacyNotice />
              <button className="btn" disabled={busy}>
                {busy ? "Enviando…" : "Enviar solicitud"}
              </button>
              {error && <p role="alert">{error}</p>}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
