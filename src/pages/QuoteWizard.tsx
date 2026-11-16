import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  quoteConfig,
  initialAnswers,
  QuoteAnswers,
  calculateQuote,
  resolveSelection,
} from "../data/quoteConfig";
import { company, whatsappUrl } from "../data/company";
import { QuotePreview } from "../components/quote/QuotePreview";
import { InversaLogo } from "../components/InversaLogo";
import { PrivacyCheck, PrivacyNotice } from "../components/PrivacyNotice";
import { Seo } from "../components/Seo";
import { submitQuote } from "../services/quoteSubmission";
const money = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
    n,
  );
const key = "inversa.quote.v1";
function folio() {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/-/g, "");
  return "COT-" + date + "-" + crypto.randomUUID().slice(0, 4).toUpperCase();
}
function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);
  useEffect(() => {
    const from = previous.current;
    previous.current = value;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let frame: number;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min(1, (now - start) / 300);
      setDisplay(from + (value - from) * p);
      if (p < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{money(display)}</>;
}
export function QuoteWizard() {
  const [params] = useSearchParams();
  const [answers, setAnswers] = useState<QuoteAnswers>(initialAnswers);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [color, setColor] = useState(quoteConfig.colors[0]);
  const [other, setOther] = useState("");
  const [otherPage, setOtherPage] = useState("");
  const [saved, setSaved] = useState<null | Record<string, unknown>>(null);
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [notice, setNotice] = useState("");
  const [id, setId] = useState(folio);
  const [consent, setConsent] = useState(false);
  const [client, setClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    comments: "",
  });
  const [success, setSuccess] = useState<null | boolean>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const sheetRef = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const spec = quoteConfig.steps[step];
  const calc = calculateQuote(answers);
  const valid =
    (!spec.required || (answers[spec.id]?.length ?? 0) > 0) &&
    !(
      spec.id === "industry" &&
      answers.industry?.includes("other") &&
      !other.trim()
    ) &&
    !(
      spec.id === "pages" &&
      answers.pages?.includes("other-page") &&
      !otherPage.trim()
    );
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw);
        if (
          data.version === 1 &&
          data.answers &&
          Number.isInteger(data.step) &&
          data.step >= 0 &&
          data.step < quoteConfig.steps.length
        )
          setSaved(data);
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready || saved) return;
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          version: 1,
          answers,
          step,
          name,
          color,
          other,
          otherPage,
          id,
        }),
      );
    } catch {}
  }, [ready, saved, answers, step, name, color, other, otherPage, id]);
  useEffect(() => {
    heading.current?.focus();
  }, [step]);
  useEffect(() => {
    if (!sheet) return;
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [sheet]);
  function trapSheet(e: React.KeyboardEvent) {
    if (!sheet || e.key !== "Tab") return;
    const list = sheetRef.current?.querySelectorAll<HTMLElement>(
      "button,input,a[href]",
    );
    if (!list?.length) return;
    const first = list[0],
      last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  function move(delta: number) {
    if (delta > 0 && !valid) return;
    setStep((s) =>
      Math.max(0, Math.min(quoteConfig.steps.length - 1, s + delta)),
    );
    setNotice("");
  }
  useEffect(() => {
    function keyboard(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        if (sheet) setSheet(false);
        else move(-1);
        return;
      }
      if (
        e.target instanceof HTMLElement &&
        e.target.closest("textarea,select,button,a,[role=dialog]")
      )
        return;
      if (e.key === "Enter" && spec.type !== "summary") {
        e.preventDefault();
        move(1);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        if (sheet) setSheet(false);
        else move(-1);
      }
    }
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [step, valid, sheet]);
  function select(id: string) {
    const result = resolveSelection(answers, spec.id, id);
    setAnswers(result.answers);
    setNotice(result.notice);
  }
  function resume() {
    if (saved) {
      setAnswers(saved.answers as QuoteAnswers);
      setStep(saved.step as number);
      setName(String(saved.name ?? ""));
      setColor(String(saved.color ?? quoteConfig.colors[0]));
      setOther(String(saved.other ?? ""));
      setOtherPage(String(saved.otherPage ?? ""));
      setId(String(saved.id ?? folio()));
      setSaved(null);
    }
  }
  function reset() {
    setAnswers(initialAnswers);
    setStep(0);
    setName("");
    setColor(quoteConfig.colors[0]);
    setOther("");
    setOtherPage("");
    setId(folio());
    setSaved(null);
  }
  const presentation =
    quoteConfig.layouts.find(
      (layout) => layout.id === answers.presentation?.[0],
    ) ?? quoteConfig.layouts[0];
  const summaryText =
    id +
    "\n" +
    (name || "Tu proyecto") +
    "\n" +
    calc.selected.map((o) => o.label).join(", ") +
    "\nPresentación: " +
    presentation.label +
    "\nColor principal: " +
    color +
    "\nTotal: " +
    money(calc.total) +
    " MXN · " +
    calc.days +
    " días hábiles\nMantenimiento: " +
    money(calc.monthly) +
    "/mes\n" +
    quoteConfig.legend;
  const wa = whatsappUrl(
    "Hola INVERSA, solicito propuesta formal.\n" + summaryText,
  );
  function validate() {
    return form.current?.reportValidity() && consent;
  }
  async function send(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setBusy(true);
    setError("");
    try {
      const r = await submitQuote({
        folio: id,
        client,
        answers,
        calculation: calc,
        name,
        color,
        privacyAccepted: true,
      });
      setSuccess(r.simulated);
      try {
        localStorage.removeItem(key);
      } catch {}
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const preview = (
    <QuotePreview
      answers={answers}
      name={name}
      color={color}
      industryOther={other}
      mobile={mobile}
    />
  );
  return (
    <div className="quote-page page-shell section">
      <Seo title="Cotizador de desarrollo" />
      <div className="quote-print-brand">
        <InversaLogo animated={false} />
      </div>
      <p className="eyebrow">Construye tu página</p>
      {saved && (
        <div
          className="panel resume-prompt no-print"
          role="region"
          aria-label="Cotización guardada"
        >
          <h2>¿Continuar tu cotización?</h2>
          <p className="muted">
            Encontramos un avance guardado en este navegador.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="btn" onClick={resume}>
              Continuar cotización
            </button>
            <button className="btn secondary" onClick={reset}>
              Empezar de nuevo
            </button>
          </div>
        </div>
      )}
      {success !== null ? (
        <section className="panel build-in">
          <h1>
            ✓{" "}
            {success
              ? "Propuesta preparada en modo de prueba"
              : "Solicitud enviada"}
          </h1>
          <p>Folio {id}</p>
          <p>
            {success
              ? "El envío está simulado. Compártela por WhatsApp para solicitar atención."
              : "Recibimos tu solicitud para revisar los requerimientos."}
          </p>
          <h2>¿Qué sigue?</h2>
          <ol className="process">
            <li>Revisamos tus requerimientos.</li>
            <li>Confirmamos alcance, precio y tiempos.</li>
            <li>Acordamos el inicio del proyecto.</li>
          </ol>
          {wa && (
            <a className="btn" href={wa} target="_blank" rel="noreferrer">
              Enviar por WhatsApp
            </a>
          )}
          <button
            className="btn secondary"
            onClick={() => {
              setSuccess(null);
              reset();
            }}
          >
            Nueva cotización
          </button>
        </section>
      ) : (
        <>
          <div className="quote-progress no-print">
            <div>
              <span>
                Paso {step + 1} de {quoteConfig.steps.length} · {spec.title}
              </span>
              <strong>
                {Math.round(((step + 1) / quoteConfig.steps.length) * 100)}%
              </strong>
            </div>
            <progress max={quoteConfig.steps.length} value={step + 1} />
          </div>
          <div
            className={
              "wizard-grid " + (spec.type === "summary" ? "is-summary" : "")
            }
          >
            <section className="wizard-question">
              <h1 ref={heading} tabIndex={-1}>
                {spec.question}
              </h1>
              {spec.type === "text" && (
                <label className="form-grid">
                  Nombre del proyecto (opcional)
                  <input
                    value={name}
                    maxLength={40}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu proyecto"
                  />
                  <span className="muted">
                    Lo usaremos en la vista previa y en tu propuesta.
                  </span>
                </label>
              )}
              {spec.options && (
                <fieldset className="option-grid">
                  <legend className="sr-only">{spec.question}</legend>
                  {spec.options.map((o) => {
                    const selected = answers[spec.id]?.includes(o.id) ?? false;
                    return (
                      <label
                        className={
                          "option-card " + (selected ? "selected" : "")
                        }
                        key={o.id}
                      >
                        <input
                          type={spec.type === "multiple" ? "checkbox" : "radio"}
                          name={spec.id}
                          checked={selected}
                          disabled={o.id === "home"}
                          onChange={() => select(o.id)}
                        />
                        <span className="option-icon">{o.icon}</span>
                        <span className="option-copy">
                          {spec.type === "style" && (
                            <span className={"style-swatch swatch-" + o.id}>
                              <i />
                              <i />
                              <i />
                            </span>
                          )}
                          <strong>{o.label}</strong>
                          <span>{o.description}</span>
                          <small>
                            {o.monthly !== undefined
                              ? money(o.monthly) + "/mes"
                              : o.surcharge
                                ? "+" +
                                  o.surcharge * 100 +
                                  "% · −" +
                                  Math.round((1 - o.timeFactor!) * 100) +
                                  "% tiempo"
                                : "+" +
                                  money(o.price) +
                                  " MXN · +" +
                                  o.days +
                                  " días"}
                          </small>
                        </span>
                      </label>
                    );
                  })}
                </fieldset>
              )}
              {spec.id === "php" && (
                <p className="chip">
                  ✓ {quoteConfig.base.label} · {money(quoteConfig.base.price)} ·{" "}
                  {quoteConfig.base.days} días (base obligatoria)
                </p>
              )}
              {spec.id === "industry" &&
                answers.industry?.includes("other") && (
                  <label className="form-grid">
                    Describe tu giro
                    <input
                      required
                      value={other}
                      maxLength={120}
                      onChange={(e) => setOther(e.target.value)}
                    />
                  </label>
                )}
              {spec.id === "pages" && answers.pages?.includes("other-page") && (
                <label className="form-grid">
                  Nombre de la otra página
                  <input
                    required
                    value={otherPage}
                    maxLength={80}
                    onChange={(e) => setOtherPage(e.target.value)}
                  />
                </label>
              )}
              {spec.type === "style" && (
                <fieldset className="color-picker">
                  <legend>Color principal</legend>
                  {quoteConfig.colors.map((c) => (
                    <label key={c} style={{ background: c }}>
                      <input
                        aria-label={"Elegir color " + c}
                        type="radio"
                        name="color"
                        checked={color === c}
                        onChange={() => setColor(c)}
                      />
                      {color === c ? "✓" : ""}
                    </label>
                  ))}
                  <label className="custom-color">
                    Personalizado
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </label>
                </fieldset>
              )}
              {spec.type === "style" && (
                <fieldset className="presentation-picker">
                  <legend>Acomodo de la información</legend>
                  <p className="muted presentation-help">
                    Elige cómo presentar el contenido. Puedes combinar cualquier
                    acomodo con el estilo y color que prefieras, sin costo
                    adicional.
                  </p>
                  <div className="presentation-options">
                    {quoteConfig.layouts.map((layout) => (
                      <label
                        key={layout.id}
                        className={
                          "presentation-card " +
                          (presentation.id === layout.id ? "selected" : "")
                        }
                      >
                        <input
                          type="radio"
                          name="presentation"
                          value={layout.id}
                          checked={presentation.id === layout.id}
                          onChange={() => {
                            setAnswers({
                              ...answers,
                              presentation: [layout.id],
                            });
                            setNotice("✓ Presentación: " + layout.label);
                          }}
                        />
                        <span
                          className={"layout-thumbnail thumbnail-" + layout.id}
                          aria-hidden="true"
                        >
                          <i className="thumbnail-nav" />
                          <i className="thumbnail-copy" />
                          <i className="thumbnail-image" />
                          <i className="thumbnail-content" />
                          <i className="thumbnail-content" />
                        </span>
                        <strong>{layout.label}</strong>
                        <span>{layout.description}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <p className="feedback no-print" role="status">
                {notice}
              </p>
              {spec.type === "summary" && (
                <div className="quote-summary">
                  <p>
                    Folio <strong>{id}</strong> ·{" "}
                    {new Date().toLocaleDateString("es-MX", {
                      timeZone: "America/Mexico_City",
                    })}
                  </p>
                  <p>Vigencia: {quoteConfig.validityDays} días naturales.</p>
                  <h2>{name || "Tu proyecto"}</h2>
                  <p>
                    {quoteConfig.base.label}: {money(quoteConfig.base.price)}
                  </p>
                  {quoteConfig.steps
                    .filter((s) => s.options)
                    .map((s, i) => (
                      <div className="summary-category" key={s.id}>
                        <h3>
                          {s.title}
                          <button
                            className="no-print"
                            onClick={() =>
                              setStep(quoteConfig.steps.indexOf(s))
                            }
                            aria-label={"Editar " + s.title}
                          >
                            Editar ✎
                          </button>
                        </h3>
                        <p>
                          {s.options
                            ?.filter((o) => answers[s.id]?.includes(o.id))
                            .map(
                              (o) =>
                                o.label +
                                (o.price ? " (" + money(o.price) + ")" : ""),
                            )
                            .join(", ") || "Sin selección"}
                        </p>
                      </div>
                    ))}
                  <div className="summary-category">
                    <h3>
                      Presentación de la página
                      <button
                        className="no-print"
                        onClick={() =>
                          setStep(
                            quoteConfig.steps.findIndex(
                              (s) => s.id === "style",
                            ),
                          )
                        }
                        aria-label="Editar presentación de la página"
                      >
                        Editar ✎
                      </button>
                    </h3>
                    <p>
                      {presentation.label} · Color principal: {color}
                    </p>
                  </div>
                  <h3>Stack del proyecto</h3>
                  <div className="flex flex-wrap gap-2">
                    {quoteConfig.stack.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <dl className="totals">
                    <div>
                      <dt>Base y funcionalidades</dt>
                      <dd>{money(calc.base)}</dd>
                    </div>
                    <div>
                      <dt>Recargo de entrega</dt>
                      <dd>{money(calc.surcharge)}</dd>
                    </div>
                    <div>
                      <dt>Subtotal</dt>
                      <dd>{money(calc.subtotal)}</dd>
                    </div>
                    <div>
                      <dt>IVA ({quoteConfig.vat * 100}%)</dt>
                      <dd>{money(calc.vat)}</dd>
                    </div>
                    <div>
                      <dt>Total</dt>
                      <dd>{money(calc.total)}</dd>
                    </div>
                    <div>
                      <dt>Días hábiles estimados</dt>
                      <dd>{calc.days}</dd>
                    </div>
                    <div>
                      <dt>Mantenimiento mensual (aparte)</dt>
                      <dd>{money(calc.monthly)}/mes</dd>
                    </div>
                  </dl>
                  <p>{quoteConfig.legend}</p>
                  <Link
                    className="text-cyan-300 underline"
                    to="/desarrollo/terminos-de-servicio"
                  >
                    Términos de desarrollo
                  </Link>
                  <form
                    ref={form}
                    className="form-grid panel mt-6"
                    onSubmit={send}
                  >
                    <h2>Datos para tu propuesta</h2>
                    {[
                      ["name", "Nombre", true, "text"],
                      ["company", "Empresa (opcional)", false, "text"],
                      ["email", "Correo", true, "email"],
                      ["phone", "WhatsApp", true, "tel"],
                    ].map(([key, label, required, type]) => (
                      <label key={String(key)}>
                        {String(label)}
                        <input
                          type={String(type)}
                          required={Boolean(required)}
                          maxLength={150}
                          pattern={
                            key === "phone" ? "[+]?[0-9]{10,15}" : undefined
                          }
                          value={client[key as keyof typeof client]}
                          onChange={(e) =>
                            setClient({
                              ...client,
                              [String(key)]: e.target.value,
                            })
                          }
                        />
                      </label>
                    ))}
                    <label>
                      Comentarios
                      <textarea
                        rows={3}
                        maxLength={3000}
                        value={client.comments}
                        onChange={(e) =>
                          setClient({ ...client, comments: e.target.value })
                        }
                      />
                    </label>
                    <PrivacyNotice />
                    <PrivacyCheck checked={consent} onChange={setConsent} />
                    <div className="quote-actions no-print">
                      {wa ? (
                        <a
                          className="btn secondary"
                          href={wa}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            if (!validate()) e.preventDefault();
                          }}
                        >
                          Enviar por WhatsApp
                        </a>
                      ) : (
                        <p className="muted">WhatsApp: Información pendiente</p>
                      )}
                      <button className="btn" disabled={busy || !consent}>
                        {busy ? "Enviando…" : "Solicitar propuesta formal"}
                      </button>
                    </div>
                    {error && <p role="alert">{error}</p>}
                  </form>
                </div>
              )}
              <div className="wizard-navigation no-print">
                <button
                  className="btn secondary"
                  disabled={step === 0}
                  onClick={() => move(-1)}
                >
                  ← Atrás
                </button>
                {spec.type !== "summary" && (
                  <button
                    className="btn"
                    disabled={!valid}
                    onClick={() => move(1)}
                  >
                    Continuar →
                  </button>
                )}
              </div>
            </section>
            <aside
              ref={sheetRef}
              onKeyDown={trapSheet}
              role={sheet ? "dialog" : undefined}
              aria-modal={sheet ? true : undefined}
              aria-label="Vista previa de tu página"
              className={"wizard-preview " + (sheet ? "sheet-open" : "")}
            >
              <div className="preview-toolbar no-print">
                <button
                  className={"btn " + (!mobile ? "" : "secondary")}
                  onClick={() => setMobile(false)}
                >
                  Escritorio
                </button>
                <button
                  className={"btn " + (mobile ? "" : "secondary")}
                  onClick={() => setMobile(true)}
                >
                  Móvil
                </button>
                <button
                  className="btn secondary close-sheet"
                  onClick={() => setSheet(false)}
                >
                  Cerrar vista previa
                </button>
              </div>
              {preview}
            </aside>
          </div>
          <div className="quote-bottom no-print">
            <div aria-live="polite">
              <strong>
                <CountUp value={calc.total} />
              </strong>
              <span> MXN · {calc.days} días hábiles</span>
            </div>
            <button
              className="btn secondary preview-open"
              onClick={() => setSheet(true)}
              aria-expanded={sheet}
            >
              Ver mi página 👁
            </button>
          </div>
          <p className="quote-legend muted">{quoteConfig.legend}</p>
        </>
      )}
    </div>
  );
}
