import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Cpu, 
  Code2, 
  Info, 
  Mail, 
  Menu, 
  X,
  Phone,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { InversaLogo } from './InversaLogo';

interface NavbarProps {
  currentView: 'tienda' | 'sobre_inversa' | 'contacto';
  setCurrentView: (view: 'tienda' | 'sobre_inversa' | 'contacto') => void;
  activeTab?: 'hardware' | 'crea_tu_web';
  setActiveTab?: (tab: 'hardware' | 'crea_tu_web') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  activeTab = 'hardware',
  setActiveTab,
  searchQuery,
  setSearchQuery
}) => {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '5215555555555';
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const corporatePhoneDisplay = '+52 (55) 8432-9000';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola, me comunico desde Inversa para atención a empresas y cotizaciones de equipamiento y software.')}`;

  const handleNav = (view: 'tienda' | 'sobre_inversa' | 'contacto', tab?: 'hardware' | 'crea_tu_web') => {
    setCurrentView(view);
    if (tab && setActiveTab) {
      setActiveTab(tab);
    }
    setMobileMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* 1. Sober Official Inversa Logo */}
          <Link 
            to="/" 
            onClick={() => handleNav('tienda', 'hardware')}
            className="flex items-center shrink-0 group focus:outline-none"
          >
            <InversaLogo size="md" showText={true} animated={false} />
          </Link>

          {/* 2. Desktop Navigation Links (Separación nítida de negocio) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-zinc-300">
            {/* Hardware & Equipamiento */}
            <button
              onClick={() => handleNav('tienda', 'hardware')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'tienda' && activeTab === 'hardware'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>Hardware &amp; Equipamiento</span>
            </button>

            {/* Soluciones Web & Software */}
            <button
              onClick={() => handleNav('tienda', 'crea_tu_web')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'tienda' && activeTab === 'crea_tu_web'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Soluciones Web &amp; Software</span>
            </button>

            {/* Sobre Inversa */}
            <button
              onClick={() => handleNav('sobre_inversa')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'sobre_inversa'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-zinc-400" />
              <span>Sobre Inversa</span>
            </button>

            {/* Contacto */}
            <button
              onClick={() => handleNav('contacto')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'contacto'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>Contacto</span>
            </button>
          </nav>

          {/* 3. Quick Actions: Moneda, Buscador, Carrito y Atención a Empresas */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Search Input (Desktop) */}
            {currentView === 'tienda' && (
              <div className="relative hidden xl:block w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar modelo o especificación..."
                  className="w-full pl-9 pr-3 py-1.5 bg-zinc-900/70 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
                    title="Limpiar"
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            {/* Selector / Indicador de Moneda */}
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-medium text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>MXN ($)</span>
            </div>

            {/* Carrito / Cotizador */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
              title="Ver Pedido / Cotizador"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-zinc-950 text-[10px] font-mono font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botón Directo: Atención a Empresas (WhatsApp / Teléfono) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSupportDropdownOpen(!supportDropdownOpen)}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-700" />
                <span>Atención a Empresas</span>
                <ChevronDown className="w-3 h-3 text-zinc-600" />
              </button>

              {/* Support Dropdown */}
              {supportDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-20" 
                    onClick={() => setSupportDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-72 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl p-3 z-30 flex flex-col gap-2">
                    <div className="px-2 py-1">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                        Mesa de Atención Corporativa
                      </span>
                      <p className="text-xs text-zinc-300 mt-0.5">
                        Asesoría para licitaciones, compras por volumen y desarrollo web.
                      </p>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSupportDropdownOpen(false)}
                      className="p-2.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 flex items-center gap-2.5 text-xs text-white font-medium transition-colors"
                    >
                      <div className="w-7 h-7 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block font-semibold">WhatsApp Empresas</span>
                        <span className="text-[11px] text-zinc-400 font-mono">Respuesta inmediata</span>
                      </div>
                    </a>

                    <a
                      href="tel:+525584329000"
                      onClick={() => setSupportDropdownOpen(false)}
                      className="p-2.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 flex items-center gap-2.5 text-xs text-white font-medium transition-colors"
                    >
                      <div className="w-7 h-7 rounded-md bg-zinc-700/60 text-zinc-300 border border-zinc-600/50 flex items-center justify-center shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block font-semibold">Línea Telefónica</span>
                        <span className="text-[11px] text-zinc-400 font-mono">{corporatePhoneDisplay}</span>
                      </div>
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-800 space-y-3">
            {currentView === 'tienda' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar modelo o especificación..."
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-1 text-xs">
              <button
                onClick={() => handleNav('tienda', 'hardware')}
                className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2 ${
                  currentView === 'tienda' && activeTab === 'hardware'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <Cpu className="w-4 h-4 text-zinc-400" />
                <span>Hardware &amp; Equipamiento</span>
              </button>

              <button
                onClick={() => handleNav('tienda', 'crea_tu_web')}
                className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2 ${
                  currentView === 'tienda' && activeTab === 'crea_tu_web'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <Code2 className="w-4 h-4 text-zinc-400" />
                <span>Soluciones Web &amp; Software</span>
              </button>

              <button
                onClick={() => handleNav('sobre_inversa')}
                className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2 ${
                  currentView === 'sobre_inversa'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <Info className="w-4 h-4 text-zinc-400" />
                <span>Sobre Inversa</span>
              </button>

              <button
                onClick={() => handleNav('contacto')}
                className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2 ${
                  currentView === 'contacto'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>Contacto</span>
              </button>
            </div>

            {/* Mobile Support Action */}
            <div className="pt-2 border-t border-zinc-800/80">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-zinc-100 text-zinc-950 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Atención a Empresas (WhatsApp)</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
