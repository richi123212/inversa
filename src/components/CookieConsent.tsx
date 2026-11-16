import { useState } from "react";
import { Link } from "react-router-dom";
export function CookieConsent() {
  const [choice, setChoice] = useState(() => {
    try {
      return localStorage.getItem("inversa.cookies");
    } catch {
      return null;
    }
  });
  function choose(value: string) {
    try {
      localStorage.setItem("inversa.cookies", value);
    } catch {
      /* La elección sigue vigente en memoria. */
    }
    setChoice(value);
    window.dispatchEvent(new CustomEvent("inversa:consent", { detail: value }));
  }
  // No se carga analítica. Una futura integración debe consultar esta elección antes de importar su script.
  if (choice) return null;
  return (
    <aside
      className="cookie-banner no-print"
      aria-label="Preferencias de cookies"
    >
      <span>Usamos cookies necesarias y de analítica.</span>
      <button className="btn" onClick={() => choose("all")}>
        Aceptar
      </button>
      <button className="btn secondary" onClick={() => choose("necessary")}>
        Solo necesarias
      </button>
      <Link to="/aviso-de-privacidad">Aviso de privacidad</Link>
    </aside>
  );
}
