import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Store, 
  Info, 
  Mail, 
  ShieldCheck, 
  Menu, 
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { InversaLogo } from './InversaLogo';

interface NavbarProps {
  currentView: 'tienda' | 'sobre_inversa' | 'contacto';
  setCurrentView: (view: 'tienda' | 'sobre_inversa' | 'contacto') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  searchQuery,
  setSearchQuery
}) => {
  const { totalItems, openCart } = useCart();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (view: 'tienda' | 'sobre_inversa' | 'contacto') => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E293B] bg-[#080C14]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Official Inversa Logo */}
          <Link 
            to="/" 
            onClick={() => setCurrentView('tienda')}
            className="flex items-center group shrink-0"
          >
            <InversaLogo size="md" showText={true} animated={true} />
          </Link>

          {/* Main Navigation (Executive Standard: Tienda, Sobre Inversa, Contacto) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#0F172A] p-1.5 rounded-2xl border border-[#1E293B]">
            <button
              onClick={() => handleNavClick('tienda')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                currentView === 'tienda'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Store className="w-4 h-4 text-cyan-400" />
              <span>Tienda</span>
            </button>

            <button
              onClick={() => handleNavClick('sobre_inversa')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                currentView === 'sobre_inversa'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Info className="w-4 h-4 text-sky-400" />
              <span>Sobre Inversa</span>
            </button>

            <button
              onClick={() => handleNavClick('contacto')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                currentView === 'contacto'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Contacto</span>
            </button>
          </nav>

          {/* Right Actions: Buscador & Carrito cuando es Tienda */}
          <div className="flex items-center gap-3">
            
            {currentView === 'tienda' && (
              <>
                {/* Search Input */}
                <div className="relative hidden xl:block w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar hardware o servicios..."
                    className="w-full pl-10 pr-4 py-2 bg-[#0F172A] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      title="Limpiar búsqueda"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Cart Button */}
                <button
                  onClick={openCart}
                  className="relative p-2.5 rounded-xl bg-[#0F172A] border border-[#1E293B] hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all duration-200 group shadow-sm"
                  title="Abrir Pedido"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-cyan-500 text-[11px] font-mono font-bold text-black flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </>
            )}

            {/* Admin Portal Button */}
            <Link
              to="/admin"
              className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2 text-xs font-semibold ${
                isAdmin
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                  : 'bg-[#0F172A] border-[#1E293B] text-slate-400 hover:text-white hover:border-slate-600'
              }`}
              title={isAdmin ? "Panel Administrativo Activo" : "Acceso Administrativo"}
            >
              <ShieldCheck className="w-5 h-5" />
              <span className="hidden sm:inline font-mono">{isAdmin ? 'ADMIN' : 'ACCESO'}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#0F172A] border border-[#1E293B] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1E293B] flex flex-col gap-3">
            {currentView === 'tienda' && (
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar hardware o servicios..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F172A] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                onClick={() => handleNavClick('tienda')}
                className={`p-3 rounded-xl text-center text-xs font-semibold flex flex-col items-center gap-1.5 ${
                  currentView === 'tienda' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'bg-[#0F172A] text-slate-300'
                }`}
              >
                <Store className="w-4 h-4 text-cyan-400" />
                <span>Tienda</span>
              </button>

              <button
                onClick={() => handleNavClick('sobre_inversa')}
                className={`p-3 rounded-xl text-center text-xs font-semibold flex flex-col items-center gap-1.5 ${
                  currentView === 'sobre_inversa' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'bg-[#0F172A] text-slate-300'
                }`}
              >
                <Info className="w-4 h-4 text-sky-400" />
                <span>Sobre Inversa</span>
              </button>

              <button
                onClick={() => handleNavClick('contacto')}
                className={`p-3 rounded-xl text-center text-xs font-semibold flex flex-col items-center gap-1.5 ${
                  currentView === 'contacto' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'bg-[#0F172A] text-slate-300'
                }`}
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Contacto</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
