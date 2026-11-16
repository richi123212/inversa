import { useEffect, useId, useState } from "react";

type BackgroundTheme =
  "development" | "corporate" | "contact" | "quote" | "legal" | "home";
const circuits: Record<BackgroundTheme, string[]> = {
  development: [
    "M0 100H180L240 160H520L580 100H900",
    "M0 370H280L340 310H680L740 370H900",
    "M80 0V220L140 280V640",
    "M740 0V180L680 240V460L740 520V640",
    "M0 560H380L440 500H900",
  ],
  corporate: [
    "M0 130H240L300 190H600L660 130H900",
    "M0 460H200L260 400H620L680 460H900",
    "M130 0V250L190 310V640",
    "M790 0V290L730 350V640",
    "M0 600H440L500 540H900",
  ],
  contact: [
    "M0 180H180L250 250H500L570 180H900",
    "M0 460H300L370 390H680L750 460H900",
    "M100 0V300L170 370V640",
    "M800 0V200L730 270V640",
    "M0 580H520L580 520H900",
  ],
  quote: [
    "M0 120H240V200H540V120H900",
    "M0 420H320V340H700V420H900",
    "M100 0V280H180V640",
    "M800 0V220H720V640",
    "M0 580H460V520H900",
  ],
  legal: [
    "M0 140H180L240 200H680L740 140H900",
    "M0 500H260L320 440H900",
    "M100 0V280L160 340V640",
    "M800 0V260L740 320V640",
  ],
  home: [
    "M0 180H200L260 240H600L660 180H900",
    "M0 460H300L360 400H700L760 460H900",
    "M120 0V200L180 260V640",
    "M780 0V300L720 360V640",
    "M0 590H400L460 530H900",
  ],
};
function themeFor(path: string): BackgroundTheme {
  if (path === "/desarrollo") return "development";
  if (path === "/perfil-corporativo") return "corporate";
  if (path === "/contacto") return "contact";
  if (path.startsWith("/cotizador")) return "quote";
  if (path !== "/") return "legal";
  return "home";
}
export function SectionBackground({ pathname }: { pathname: string }) {
  const id = useId().replace(/:/g, "");
  const [paused, setPaused] = useState(() => {
    try {
      return sessionStorage.getItem("inversa.background.paused") === "true";
    } catch {
      return false;
    }
  });
  const [hidden, setHidden] = useState(document.hidden);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  // La tienda conserva sus fondos existentes.
  if (pathname === "/tienda") return null;
  const theme = themeFor(pathname);
  function toggle() {
    setPaused((value) => {
      try {
        sessionStorage.setItem("inversa.background.paused", String(!value));
      } catch {}
      return !value;
    });
  }
  return (
    <>
      <div
        className={
          "section-background ambient-" +
          theme +
          (paused || hidden ? " ambient-paused" : "")
        }
        aria-hidden="true"
      >
        <div className="ambient-glow ambient-glow-one" />
        <div className="ambient-glow ambient-glow-two" />
        <svg
          className="ambient-circuits"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <defs>
            <pattern
              id={id + "-grid"}
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M60 0H0V60"
                fill="none"
                stroke="currentColor"
                strokeWidth=".5"
                opacity=".14"
              />
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity=".24" />
            </pattern>
            <pattern
              id={id + "-circuits"}
              width="900"
              height="640"
              patternUnits="userSpaceOnUse"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                {circuits[theme].map((d, i) => (
                  <path key={"base-" + i} d={d} opacity=".2" />
                ))}
                {circuits[theme].map((d, i) => (
                  <path
                    key={"signal-" + i}
                    d={d}
                    className={"ambient-signal signal-" + i}
                    pathLength="900"
                  />
                ))}
              </g>
              {[
                [180, 180],
                [300, 400],
                [740, 140],
                [160, 340],
                [460, 530],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="2.5"
                  className={"ambient-node node-" + i}
                  fill="currentColor"
                />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={"url(#" + id + "-grid)"} />
          <rect width="100%" height="100%" fill={"url(#" + id + "-circuits)"} />
        </svg>
        {theme === "corporate" && (
          <div className="ambient-orbits">
            <span />
            <span />
            <span />
          </div>
        )}
        {theme === "development" && (
          <div className="ambient-code-mark">
            <span>{"{ }"}</span>
            <span>{"</>"}</span>
          </div>
        )}
        {theme === "contact" && (
          <div className="ambient-ripples">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
      <button
        type="button"
        className="ambient-control no-print"
        onClick={toggle}
        aria-pressed={paused}
        aria-label={
          paused
            ? "Reanudar animaciones de fondo"
            : "Pausar animaciones de fondo"
        }
        title={
          paused
            ? "Reanudar animaciones de fondo"
            : "Pausar animaciones de fondo"
        }
      >
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
      </button>
    </>
  );
}
