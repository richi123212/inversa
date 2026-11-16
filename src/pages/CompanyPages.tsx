import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { company, pending } from "../data/company";
import { Seo } from "../components/Seo";
import { ProcessorCircuitAnimation } from "../components/ProcessorCircuitAnimation";
export function Process() {
  return (
    <ol className="process">
      {company.proceso.map((s, i) => (
        <li key={s}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}
export function Cases() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {company.casos.map((s, i) => (
        <article className="panel muted" key={i}>
          <h3>Proyecto {i + 1}</h3>
          <p>{s ?? pending}</p>
        </article>
      ))}
    </div>
  );
}
export function HomePage() {
  return (
    <>
      <Seo title="Tecnología en movimiento" />
      <section className="home-hero">
        <div className="hero-circuit">
          <ProcessorCircuitAnimation />
        </div>
        <div className="page-shell relative">
          <p className="eyebrow">{company.lema}</p>
          <h1>
            Tecnología para tu empresa.
            <br />
            <span>Ideas que toman forma.</span>
          </h1>
          <p className="muted max-w-2xl">
            Equipamiento tecnológico y desarrollo de software para empresas y
            organizaciones.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {[
              [
                "/tienda",
                "Tienda de equipo",
                "Computadoras, periféricos, redes y servidores para tu empresa.",
              ],
              [
                "/desarrollo",
                "Desarrollo de software",
                "Sitios web y sistemas a la medida en PHP, MySQL y JavaScript.",
              ],
            ].map(([to, title, text]) => (
              <Link className="business-card" to={to} key={to}>
                <h2>
                  {title} <span>↗</span>
                </h2>
                <p>{text}</p>
              </Link>
            ))}
          </div>
          <Link
            className="text-cyan-300 inline-block mt-6"
            to="/cotizador?nuevo=1"
          >
            Cotizar mi proyecto →
          </Link>
        </div>
      </section>
      <section className="page-shell section">
        <p className="eyebrow">Una empresa, dos líneas de negocio</p>
        <h2>¿A qué nos dedicamos?</h2>
        <p className="muted leading-relaxed max-w-4xl mb-8">
          {company.descripcion}
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {company.negocios.map((b) => (
            <article className="panel" key={b.titulo}>
              <h3>{b.titulo}</h3>
              <ul className="space-y-4 muted">
                {b.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <Link to="/contacto" className="btn mt-7">
          Solicitar cotización
        </Link>
      </section>
    </>
  );
}
const labels: Record<string, string> = {
  nombre: "Nombre comercial",
  lema: "Lema",
  sitioWeb: "Sitio web",
  cobertura: "Cobertura",
  razonSocial: "Razón social",
  rfc: "RFC",
  fechaConstitucion: "Fecha de constitución",
  domicilioFiscal: "Domicilio fiscal",
  telefono: "Teléfono",
  correoContacto: "Correo corporativo",
  representanteLegal: "Representante legal",
  equipoTecnico: "Equipo técnico",
  marcasComercializadas: "Marcas comercializadas",
  garantiasSoporte: "Garantías y soporte",
  certificaciones: "Certificaciones",
};
export function CorporatePage() {
  const [pdf, setPdf] = useState(false);
  useEffect(() => {
    fetch(company.perfilPdf, { method: "HEAD" })
      .then((r) =>
        setPdf(
          r.ok &&
            (r.headers.get("content-type") ?? "").includes("application/pdf"),
        ),
      )
      .catch(() => setPdf(false));
  }, []);
  return (
    <div className="page-shell section">
      <Seo
        title="Perfil corporativo"
        description="Perfil corporativo 2026 de INVERSA: equipamiento, infraestructura y soluciones digitales para empresas y organizaciones."
      />
      <p className="eyebrow">INVERSA · 2026</p>
      <h1>Perfil corporativo 2026</h1>
      <p className="lead">
        Soluciones tecnológicas para empresas y organizaciones.
      </p>
      {pdf ? (
        <a
          className="btn"
          href={company.perfilPdf}
          download
          aria-label="Descargar perfil corporativo en PDF"
        >
          Descargar perfil (PDF)
        </a>
      ) : (
        <button className="btn" disabled>
          PDF próximamente
        </button>
      )}
      <section className="section">
        <h2>Nuestra empresa</h2>
        <p className="muted">{company.nuestraEmpresa}</p>
      </section>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          ["Misión", company.mision],
          ["Visión", company.vision],
        ].map(([t, v]) => (
          <section className="panel" key={t}>
            <h2>{t}</h2>
            <p className="muted">{v}</p>
          </section>
        ))}
      </div>
      <section className="section">
        <h2>Valores</h2>
        <div className="flex flex-wrap gap-3">
          {company.valores.map((v) => (
            <span className="chip" key={v}>
              {v}
            </span>
          ))}
        </div>
      </section>
      <section>
        <h2>Forma de trabajar</h2>
        <Process />
      </section>
      <section className="section">
        <h2>Cobertura y sectores</h2>
        <p>
          {company.cobertura}. {company.sectores.join(" e ")}.
        </p>
      </section>
      <section>
        <h2>Experiencia / casos de éxito</h2>
        <Cases />
      </section>
      <section className="section">
        <h2>Datos institucionales</h2>
        <dl className="institutional">
          {Object.entries(labels).map(([key, label]) => (
            <div key={key}>
              <dt>{label}</dt>
              <dd
                className={
                  company[key as keyof typeof company] === null
                    ? "pending-neutral"
                    : ""
                }
              >
                {String(company[key as keyof typeof company] ?? pending)}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
