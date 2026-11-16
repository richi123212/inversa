import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { InversaLogo } from "./InversaLogo";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { pathname } = useLocation();
  return (
    <header className="site-nav no-print">
      <div className="site-nav-inner">
        <Link
          to="/"
          aria-label="INVERSA, inicio"
          onClick={() => setOpen(false)}
        >
          <InversaLogo animated={false} />
        </Link>
        <button
          className="mobile-menu btn secondary"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          className={open ? "nav-links is-open" : "nav-links"}
          aria-label="Navegación principal"
        >
          {[
            ["/tienda", "Tienda"],
            ["/desarrollo", "Desarrollo"],
            ["/perfil-corporativo", "Perfil corporativo"],
            ["/contacto", "Contacto"],
          ].map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        {pathname.startsWith("/tienda") && (
          <button
            className="btn secondary"
            onClick={openCart}
            aria-label={"Abrir carrito, " + totalItems + " artículos"}
          >
            <ShoppingBag size={18} />
            <span>{totalItems}</span>
          </button>
        )}
      </div>
    </header>
  );
}
