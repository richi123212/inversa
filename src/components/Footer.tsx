import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Terminal, Zap, MessageSquare, User, FileCheck, Truck, CreditCard } from 'lucide-react';
import { InversaLogo } from './InversaLogo';

interface FooterProps {
  onNavigate?: (view: 'tienda' | 'sobre_inversa' | 'contacto', tab?: 'hardware' | 'crea_tu_web') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '5215555555555';
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="mt-20 border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info with Official Inversa Logo */}
          <div className="space-y-4 md:col-span-1">
            <button 
              onClick={() => onNavigate?.('tienda', 'hardware')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <InversaLogo size="md" showText={true} animated={false} />
            </button>
            <p className="text-xs text-zinc-400 leading-relaxed mt-3">
              Soluciones integrales de hardware de alto rendimiento y arquitectura digital a la medida con facturación inmediata y cobertura nacional.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Facturación CFDI 4.0 • Precios en MXN</span>
            </div>
          </div>

          {/* Categorías Hardware */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              Hardware &amp; Equipamiento
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-white transition-colors cursor-pointer">Laptops &amp; Workstations</li>
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-white transition-colors cursor-pointer">Tarjetas Gráficas (GPUs)</li>
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-white transition-colors cursor-pointer">Audio Profesional</li>
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-white transition-colors cursor-pointer">Monitores &amp; Pantallas</li>
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-white transition-colors cursor-pointer">Periféricos &amp; Teclados</li>
            </ul>
          </div>

          {/* Soluciones Web */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-zinc-400" />
              Soluciones Web &amp; Software
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-white transition-colors cursor-pointer">Landing Pages Corporativas</li>
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-white transition-colors cursor-pointer">Comercio Electrónico (E-Commerce)</li>
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-white transition-colors cursor-pointer">SaaS &amp; Dashboards Empresariales</li>
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-white transition-colors cursor-pointer">Portales Web Institucionales</li>
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-white transition-colors cursor-pointer text-zinc-200 font-medium">Cotizador &amp; Configurador Web</li>
            </ul>
          </div>

          {/* Contacto Institucional & Trust Signals */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Atención a Empresas
            </h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Consulte con nuestro equipo para requerimientos empresariales, licitaciones o cotizaciones por volumen.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola, me comunico desde el portal de Inversa para solicitar asistencia para mi empresa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-medium transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hablar con un Asesor (WhatsApp)</span>
              </a>

              <button
                onClick={() => onNavigate?.('contacto')}
                className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-medium transition-colors"
              >
                <span>Mesa de Contacto Formal</span>
              </button>

              <Link
                to="/admin"
                className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg text-zinc-500 hover:text-zinc-300 text-[11px] font-mono transition-colors"
              >
                <User className="w-3 h-3" />
                <span>Acceso Administrativo</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Corporate Trust Badges in Footer */}
        <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <FileCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>CFDI 4.0 con IVA Desglosado</span>
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Truck className="w-3.5 h-3.5 text-zinc-300" />
              <span>Envíos Nacionales DHL / FedEx</span>
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>SPEI • Stripe • Mercado Pago</span>
            </span>
          </div>

          <div className="text-[11px] text-zinc-500 font-mono">
            © {new Date().getFullYear()} INVERSA. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
