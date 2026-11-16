import { Link } from "react-router-dom";
import { company } from "../data/company";
import { quoteConfig } from "../data/quoteConfig";
import { Seo } from "../components/Seo";
import { Cases, Process } from "./CompanyPages";
export function DevelopmentPage() {
  return (
    <div className="page-shell section">
      <Seo
        title="Desarrollo de software"
        description="Sitios web y sistemas a la medida en PHP, MySQL y JavaScript. Configura una estimación para tu proyecto con INVERSA."
      />
      <p className="eyebrow">Soluciones digitales</p>
      <h1>
        Software que se adapta
        <br />a tu forma de trabajar.
      </h1>
      <p className="lead">
        Sitios web y sistemas a la medida en PHP, MySQL y JavaScript.
      </p>
      <Link className="btn" to="/cotizador?nuevo=1">
        Cotizar mi proyecto →
      </Link>
      <section className="section">
        <h2>Servicios de desarrollo</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            quoteConfig.base,
            ...quoteConfig.steps
              .filter((s) =>
                [
                  "php",
                  "data",
                  "security",
                  "documents",
                  "tools",
                  "appearance",
                ].includes(s.id),
              )
              .flatMap((s) => s.options ?? []),
            {
              id: "maintenance",
              label: "Mantenimiento mensual",
              description:
                "Planes opcionales para dar continuidad a tu proyecto.",
            },
          ].map((o) => (
            <article className="panel" key={o.id}>
              <h3>{o.label}</h3>
              <p className="muted">{o.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2>Forma de trabajar</h2>
        <Process />
      </section>
      <section className="section">
        <h2>Portafolio</h2>
        <Cases />
      </section>
    </div>
  );
}
