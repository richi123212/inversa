import { SectionBackground } from "./components/SectionBackground";
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CatalogPage } from "./pages/CatalogPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { HomePage, CorporatePage } from "./pages/CompanyPages";
import { DevelopmentPage } from "./pages/DevelopmentPage";
import { LegalPage, legalPages } from "./pages/LegalPage";
import { ContactSection } from "./components/ContactSection";
import { CookieConsent } from "./components/CookieConsent";
import { PaymentReturnPage } from "./pages/PaymentReturnPage";
import { Seo } from "./components/Seo";
import { company, pending } from "./data/company";
import { chatbotEnabled, features } from "./config/features";
const Chatbot = lazy(() =>
  import("./components/InversaChatbot").then((m) => ({
    default: m.InversaChatbot,
  })),
);
const Wizard = lazy(() =>
  import("./pages/QuoteWizard").then((m) => ({ default: m.QuoteWizard })),
);
const Legacy = lazy(() =>
  import("./components/configurator/DynamicSoftwareConfigurator").then((m) => ({
    default: m.DynamicSoftwareConfigurator,
  })),
);
function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [bot, setBot] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setBot(chatbotEnabled());
  }, [pathname]);
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <a href="#main-content" className="skip-link">
        Ir al contenido
      </a>
      <Navbar />
      <main id="main-content" className="page-stage">
        <SectionBackground pathname={pathname} />
        <Suspense
          fallback={
            <p className="page-shell section" role="status">
              Cargando…
            </p>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      {pathname.startsWith("/tienda") && <CartDrawer />}
      <CookieConsent />
      {bot &&
        !pathname.startsWith("/cotizador") &&
        !pathname.startsWith("/pago") && (
          <Suspense fallback={null}>
            <Chatbot
              onNavigateTab={(tab) =>
                navigate(tab === "hardware" ? "/tienda" : "/cotizador")
              }
            />
          </Suspense>
        )}
    </div>
  );
}
function StorePage() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Seo
        title="Tienda"
        description={
          "Computadoras, periféricos, redes y servidores. Cobertura de envíos: " +
          (company.coberturaEnvios ?? pending) +
          "."
        }
      />
      <div className="page-shell store-strip">
        <span>
          Factura CFDI 4.0 · Garantía · Cobertura:{" "}
          {company.coberturaEnvios ?? pending}
        </span>
        <a className="btn secondary" href="/contacto">
          Cotizar por volumen
        </a>
      </div>
      <CatalogPage
        activeTab="hardware"
        setActiveTab={() => {
          location.assign("/desarrollo");
        }}
        searchQuery={search}
        setSearchQuery={setSearch}
      />
    </>
  );
}
export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/tienda" element={<StorePage />} />
              <Route path="/desarrollo" element={<DevelopmentPage />} />
              <Route path="/perfil-corporativo" element={<CorporatePage />} />
              <Route
                path="/sobre-inversa"
                element={<Navigate to="/perfil-corporativo" replace />}
              />
              <Route path="/contacto" element={<ContactSection />} />
              <Route path="/cotizador" element={<Wizard />} />
              {features.legacyQuoter && (
                <Route path="/legacy/cotizador" element={<Legacy />} />
              )}
              <Route path="/pago/:result" element={<PaymentReturnPage />} />
              {legalPages.map((p) => (
                <Route path={p.route} key={p.route} element={<LegalPage />} />
              ))}
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;
