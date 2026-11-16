import { Link } from "react-router-dom";
import { InversaLogo } from "./InversaLogo";
import { company, pending, whatsappUrl } from "../data/company";
export const legalLinks = [
  ["/aviso-de-privacidad", "Aviso de privacidad"],
  ["/terminos-y-condiciones", "Términos y condiciones"],
  ["/tienda/terminos-de-venta", "Términos de venta"],
  ["/tienda/devoluciones-y-garantias", "Devoluciones y garantías"],
  ["/desarrollo/terminos-de-servicio", "Términos de desarrollo"],
];
export function Footer() {
  const wa = whatsappUrl("Hola, solicito información de INVERSA.");
  return (
    <footer className="site-footer no-print">
      <div className="page-shell grid md:grid-cols-3 gap-10">
        <div>
          <InversaLogo animated={false} />
          <p className="muted mt-4">{company.lema}</p>
          <p className="muted">{company.cobertura}</p>
          <p className="muted">Envíos: {company.coberturaEnvios ?? pending}</p>
        </div>
        <div>
          <h2>INVERSA</h2>
          <Link to="/tienda">Tienda</Link>
          <Link to="/desarrollo">Desarrollo</Link>
          <Link to="/perfil-corporativo">Perfil corporativo</Link>
          <Link to="/contacto">Contacto</Link>
          <p>{company.correoContacto ?? pending}</p>
          <p>{company.telefono ?? pending}</p>
          {wa && <a href={wa}>WhatsApp</a>}
        </div>
        <div>
          <h2>Legal</h2>
          {legalLinks.map(([path, label]) => (
            <Link key={path} to={path}>
              {label}
            </Link>
          ))}
        </div>
      </div>
      <p className="page-shell muted mt-8">
        © {new Date().getFullYear()} {company.nombre} · {company.lema}
      </p>
    </footer>
  );
}
