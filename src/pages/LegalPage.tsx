import { Fragment, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import source from "../../content/legal/INVERSA_legales.md?raw";
import { company } from "../data/company";
import { InversaLogo } from "../components/InversaLogo";
import { Seo } from "../components/Seo";
type CompanyKey = keyof typeof company;
// Los marcadores sin etiqueta dependen de la página y del apartado original.
const genericFields: Record<string, CompanyKey[]> = {
  "/terminos-y-condiciones": ["rfc", "domicilioFiscal", "horario"],
  "/tienda/terminos-de-venta": ["diasEntrega", "envioGratisDesde"],
  "/tienda/devoluciones-y-garantias": ["diasReembolso"],
  "/desarrollo/terminos-de-servicio": [
    "anticipoPct",
    "avancePct",
    "finalPct",
    "diasRevision",
    "diasGarantiaSoftware",
    "diasAvisoMantenimiento",
  ],
};
const namedFields: Record<string, CompanyKey> = {
  "razón social": "razonSocial",
  "domicilio fiscal": "domicilioFiscal",
  "correo de privacidad": "correoPrivacidad",
  "nombre o área responsable de datos personales": "responsableDatos",
  correo: "correoContacto",
  "teléfono / WhatsApp": "telefono",
  "confirmar si se ofrece": "transferencias",
  "correo de facturación": "correoFacturacion",
  "confirmar si hay envíos nacionales": "enviosNacionales",
  "correo de soporte": "correoSoporte",
  número: "rondasAjustes",
};
export const legalPages = source
  .split(/^## /m)
  .slice(1)
  .map((section) => {
    const lines = section.trim().split(/\r?\n/);
    return {
      title: lines[0].replace(/^\d+\.\s*/, ""),
      route: section.match(/<!-- ruta: (.*?) -->/)?.[1] ?? "",
      body: lines.slice(1).join("\n"),
    };
  });
function slug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}
export function LegalPage() {
  const { pathname } = useLocation();
  const page = legalPages.find((p) => p.route === pathname)!;
  let genericIndex = 0;
  function inline(text: string): ReactNode[] {
    return text
      .split(/(\*\*.*?\*\*|\[Información pendiente[^\]]*\])/g)
      .filter(Boolean)
      .map((token, i) => {
        if (token.startsWith("**"))
          return <strong key={i}>{inline(token.slice(2, -2))}</strong>;
        if (token.startsWith("[Información pendiente")) {
          const label = token.match(/: (.*?)\]/)?.[1];
          const field = label
            ? namedFields[label]
            : token.includes("por marca")
              ? "garantiasSoporte"
              : genericFields[pathname]?.[genericIndex++];
          const value =
            field === "telefono"
              ? (company.telefono ?? company.whatsapp)
              : field
                ? company[field]
                : null;
          return value !== null && value !== undefined ? (
            <Fragment key={i}>{String(value)}</Fragment>
          ) : (
            <span key={i} className="pending-badge" title="Dato por confirmar">
              ⚠ {token.slice(1, -1)}
            </span>
          );
        }
        return <Fragment key={i}>{token}</Fragment>;
      });
  }
  const lines = page.body.split("\n").filter((l) => !l.startsWith("<!--"));
  const blocks: ReactNode[] = [];
  const headings = lines
    .filter((l) => l.startsWith("### "))
    .map((l) => l.slice(4));
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith("### ")) {
      blocks.push(
        <h2 id={slug(line.slice(4))} key={i}>
          {line.slice(4)}
        </h2>,
      );
      continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(
          lines[i]
            .trim()
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim()),
        );
        i++;
      }
      i--;
      blocks.push(
        <div className="table-scroll" key={i}>
          <table>
            <thead>
              <tr>
                {rows[0].map((c, k) => (
                  <th key={k}>{inline(c)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(2).map((row, k) => (
                <tr key={k}>
                  {row.map((c, j) => (
                    <td key={j}>{inline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d/.test(line);
      const items: ReactNode[] = [];
      while (
        i < lines.length &&
        (ordered ? /^\d+\. / : /^- /).test(lines[i].trim())
      ) {
        items.push(
          <li key={i}>
            {inline(lines[i].trim().replace(/^(- |\d+\. )/, ""))}
          </li>,
        );
        i++;
      }
      i--;
      blocks.push(
        ordered ? <ol key={i}>{items}</ol> : <ul key={i}>{items}</ul>,
      );
      continue;
    }
    const paragraph = [line];
    while (
      i + 1 < lines.length &&
      lines[i + 1].trim() &&
      !/^(### |\||- |\d+\. )/.test(lines[i + 1])
    ) {
      i++;
      paragraph.push(lines[i]);
    }
    blocks.push(<p key={i}>{inline(paragraph.join(" "))}</p>);
  }
  const index = (
    <ul>
      {headings.map((h) => (
        <li key={h}>
          <a href={"#" + slug(h)}>{h}</a>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="page-shell section legal-page" id="legal-top">
      <Seo
        title={page.title}
        description={
          page.title +
          " de INVERSA. Consulta las condiciones y políticas aplicables."
        }
      />
      <InversaLogo animated={false} />
      <h1>{page.title}</h1>
      <button
        className="btn no-print"
        onClick={() => window.print()}
        aria-label="Imprimir o guardar esta página legal como PDF"
      >
        Imprimir / Guardar PDF
      </button>
      <div className="legal-grid">
        <aside className="legal-index no-print">
          <div className="desktop-index">
            <h2>En esta página</h2>
            {index}
          </div>
          <details className="mobile-index">
            <summary>Índice de contenido</summary>
            {index}
          </details>
        </aside>
        <article className="legal-content">
          {blocks}
          <a className="btn secondary no-print" href="#legal-top">
            Volver arriba ↑
          </a>
        </article>
      </div>
    </div>
  );
}
