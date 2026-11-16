import { qrMatrix } from "../../utils/qr";
import { CSSProperties, useEffect, useState } from "react";
import { QuoteAnswers, quoteConfig } from "../../data/quoteConfig";
export function QuotePreview({
  answers,
  name,
  color,
  industryOther,
  mobile,
}: {
  answers: QuoteAnswers;
  name: string;
  color: string;
  industryOther: string;
  mobile: boolean;
}) {
  const [dark, setDark] = useState(false);
  const [customColor, setCustomColor] = useState(color);
  useEffect(() => setCustomColor(color), [color]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [chat, setChat] = useState(false);
  const has = (id: string) =>
    Object.values(answers).some((v) => v.includes(id));
  const project = name.trim() || "Tu proyecto";
  const industry = answers.industry?.[0];
  const sector =
    quoteConfig.steps
      .find((s) => s.id === "industry")
      ?.options?.find((o) => o.id === industry)?.label ?? "";
  const copy: Record<string, [string, string, string]> = {
    health: ["Cuidamos de ti", "Consulta nuestros servicios de salud.", "✚"],
    education: ["Aprende y crece", "Conoce nuestra oferta educativa.", "▤"],
    food: [
      "Sabor para compartir",
      "Descubre nuestro menú y reserva tu mesa.",
      "♨",
    ],
    professional: [
      "Experiencia a tu servicio",
      "Soluciones profesionales para tus necesidades.",
      "§",
    ],
    retail: [
      "Encuentra lo que buscas",
      "Explora nuestro catálogo de productos.",
      "▣",
    ],
    industry: [
      "Procesos que avanzan",
      "Conoce nuestras soluciones para la industria.",
      "⚙",
    ],
    government: [
      "Servicios para la comunidad",
      "Información y trámites a tu alcance.",
      "▥",
    ],
  };
  const [headline, desc, icon] = copy[industry ?? ""] ?? [
    "Bienvenido a " + project,
    industry === "other"
      ? industryOther
      : "Elige tu giro para dar forma a este espacio.",
    "◇",
  ];
  const style = answers.style?.[0] ?? "minimal";
  const activeColor = has("personalize") ? customColor : color;
  const built =
    Object.values(answers)
      .flat()
      .filter((id) => id !== "home").length + (name ? 1 : 0);
  const pages =
    quoteConfig.steps
      .find((s) => s.id === "pages")
      ?.options?.filter((o) => has(o.id)) ?? [];
  const widgets = quoteConfig.steps
    .filter((s) =>
      ["php", "data", "security", "documents", "tools", "appearance"].includes(
        s.id,
      ),
    )
    .flatMap((s) => s.options ?? [])
    .filter((o) => has(o.id));
  return (
    <div className={"preview-shell " + (mobile ? "device-mobile" : "")}>
      <div className="browser-bar">
        <span>● ● ●</span>
        <span>Vista previa de tu proyecto</span>
      </div>
      <div
        className={
          "mock-site style-" +
          style +
          (dark || style === "tech" ? " mock-dark" : "")
        }
        style={{ "--preview-accent": activeColor } as CSSProperties}
      >
        <header className="mock-header">
          <strong>{project}</strong>
          <nav>
            {pages.map((p) => (
              <span key={p.id}>{p.label}</span>
            ))}
          </nav>
          {has("users") && (
            <button
              onClick={() => alert("Vista de ejemplo: acceso de usuarios")}
              aria-label="Ver acceso de ejemplo"
            >
              ◉ Ingresar
            </button>
          )}
          {has("roles") && <span className="mock-badge">Admin</span>}
        </header>
        {!answers.type ? (
          <div className="mock-skeleton">
            <div />
            <div />
            <div />
            <p>Tu página se construye con cada respuesta.</p>
          </div>
        ) : (
          <section className="mock-hero build-in">
            <span className="sector-icon">{icon}</span>
            <p>{sector}</p>
            <h2>{headline}</h2>
            <p>{desc}</p>
            <button
              onClick={() =>
                document
                  .querySelector(".mock-widgets")
                  ?.scrollIntoView({ block: "nearest", behavior: "smooth" })
              }
            >
              Conocer más →
            </button>
            <div className="mock-illustration">
              <span>{icon}</span>
              <i />
              <i />
              <i />
            </div>
          </section>
        )}
        <div className="mock-widgets">
          {widgets.map((w) => (
            <section className="mock-widget build-in" key={w.id}>
              <h3>{w.label}</h3>
              {w.id === "mysql" && (
                <p>◫ Datos conectados · Registros de ejemplo</p>
              )}
              {w.id === "datatable" && (
                <>
                  <label>
                    Buscar registro
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar…"
                    />
                  </label>
                  <table>
                    <tbody>
                      {["Proyecto A", "Proyecto B", "Proyecto C"]
                        .filter((s) =>
                          s.toLowerCase().includes(search.toLowerCase()),
                        )
                        .slice(page === 1 ? 0 : 2, page === 1 ? 2 : 3)
                        .map((s) => (
                          <tr key={s}>
                            <td>{s}</td>
                            <td>Activo</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <button onClick={() => setPage(page === 1 ? 2 : 1)}>
                    Página {page} de 2 →
                  </button>
                </>
              )}
              {["excel", "pdf", "word"].includes(w.id) && (
                <button
                  onClick={() =>
                    alert(
                      "Ejemplo de exportación: se implementará en tu proyecto.",
                    )
                  }
                >
                  ⇩ Exportar {w.id.toUpperCase()}
                </button>
              )}
              {w.id === "users" && (
                <div>
                  <label>
                    Correo
                    <input type="email" placeholder="tu@empresa.mx" />
                  </label>
                  <button>Iniciar sesión · Ejemplo</button>
                </div>
              )}
              {w.id === "roles" && (
                <p>
                  <span className="mock-badge">Admin</span> Gestión de permisos
                  · Lectura · Edición
                </p>
              )}
              {w.id === "activity" && (
                <ul>
                  <li>09:30 · Inicio de sesión</li>
                  <li>09:35 · Registro actualizado</li>
                </ul>
              )}
              {w.id === "charts" && (
                <div className="mini-chart" aria-label="Gráfica de ejemplo">
                  {[35, 65, 45, 90, 70].map((v, i) => (
                    <span key={i} style={{ height: v + "%" }} />
                  ))}
                </div>
              )}
              {w.id === "calendar" && (
                <>
                  <p>Agenda · Noviembre</p>
                  <div className="mini-calendar">
                    {Array.from({ length: 28 }, (_, i) => (
                      <span className={i === 15 ? "event" : ""} key={i}>
                        {i + 1}
                      </span>
                    ))}
                  </div>
                  <p>16 · Reunión de seguimiento</p>
                </>
              )}
              {w.id === "alerts" && (
                <p role="status" className="mock-toast">
                  ✓ Los cambios se guardaron correctamente.
                </p>
              )}
              {w.id === "email" && (
                <div className="email-preview">
                  <strong>{project}</strong>
                  <p>Asunto: Tu solicitud está lista</p>
                  <p>Hola, gracias por ponerte en contacto.</p>
                </div>
              )}
              {w.id === "qr" && (
                <div>
                  <svg
                    viewBox="0 0 49 49"
                    width="112"
                    role="img"
                    aria-label={"Código QR de " + project}
                    shapeRendering="crispEdges"
                  >
                    <rect width="49" height="49" fill="white" />
                    {qrMatrix(project).flatMap((row, y) =>
                      row.map((dark, x) =>
                        dark ? (
                          <rect
                            key={y * 41 + x}
                            x={x + 4}
                            y={y + 4}
                            width="1"
                            height="1"
                            fill="black"
                          />
                        ) : null,
                      ),
                    )}
                  </svg>
                  <p>{project}</p>
                </div>
              )}
              {w.id === "chatbot" && (
                <>
                  <button onClick={() => setChat(!chat)}>
                    ☏ Asistente de {project}
                  </button>
                  {chat && (
                    <div>
                      <p>¿En qué podemos ayudarte?</p>
                      <button onClick={() => alert(desc)}>Servicios</button>
                      <button onClick={() => alert("Contacto de ejemplo")}>
                        Contacto
                      </button>
                    </div>
                  )}
                </>
              )}
              {w.id === "dark" && (
                <label>
                  Modo oscuro{" "}
                  <input
                    type="checkbox"
                    checked={dark}
                    onChange={(e) => setDark(e.target.checked)}
                  />
                </label>
              )}
              {w.id === "personalize" && (
                <label>
                  Color de la página{" "}
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                  />
                </label>
              )}
              {["ajax", "panel", "logic", "apis"].includes(w.id) && (
                <div className="mock-placeholder">
                  <span>◇</span>
                  <p>{w.description}</p>
                </div>
              )}
            </section>
          ))}
        </div>
        <footer>
          {project} · {new Date().getFullYear()}
        </footer>
      </div>
      <p className="preview-count" aria-live="polite">
        Componentes construidos: {built}
      </p>
    </div>
  );
}
