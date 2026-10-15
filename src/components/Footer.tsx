import React from 'react';
import { Shield, Terminal, Zap, MessageSquare } from 'lucide-react';
import { InversaLogo } from './InversaLogo';

interface FooterProps {
  onNavigate?: (view: 'tienda' | 'sobre_inversa' | 'contacto', tab?: 'hardware' | 'crea_tu_web') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '5215555555555';

  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#05080E] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info with Official Inversa Logo */}
          <div className="space-y-4 md:col-span-1">
            <button 
              onClick={() => onNavigate?.('tienda')}
              className="text-left group cursor-pointer"
            >
              <InversaLogo size="md" showText={true} animated={false} />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed mt-3">
              División corporativa de hardware especializado de alto rendimiento y consultoría en arquitectura de software escalable.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Sistemas Operativos 24/7 en Infraestructura Cloud
            </div>
          </div>

          {/* Categorías Hardware */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Hardware &amp; Cómputo
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-cyan-400 transition-colors cursor-pointer">Workstations &amp; Cómputo Móvil M3</li>
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-cyan-400 transition-colors cursor-pointer">Aislamiento Acústico Industrial</li>
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-cyan-400 transition-colors cursor-pointer">Periféricos Programables QMK/VIA</li>
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-cyan-400 transition-colors cursor-pointer">Procesamiento Gráfico RTX Serie 40</li>
              <li onClick={() => onNavigate?.('tienda', 'hardware')} className="hover:text-cyan-400 transition-colors cursor-pointer">Displays Curvos UltraWide 4K</li>
            </ul>
          </div>

          {/* Soluciones Web */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              Arquitectura de Software
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-blue-400 transition-colors cursor-pointer">Landing Pages de Alto Desempeño</li>
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-blue-400 transition-colors cursor-pointer">Plataformas E-Commerce B2B / B2C</li>
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-blue-400 transition-colors cursor-pointer">SaaS Empresarial &amp; Dashboards</li>
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-blue-400 transition-colors cursor-pointer">Integración de Pasarelas y APIs</li>
              <li onClick={() => onNavigate?.('tienda', 'crea_tu_web')} className="hover:text-cyan-400 transition-colors cursor-pointer text-cyan-400/90 font-medium">Configurador &amp; Cotizador Web</li>
            </ul>
          </div>

          {/* Contacto Institucional */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Mesa de Atención Técnica
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Consulte con nuestros ingenieros para requerimientos empresariales o cotizaciones por volumen.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate?.('contacto')}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all"
              >
                Mesa de Atención Corporativa
              </button>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Estimado equipo de Inversa, solicito asistencia técnica para requerimientos de hardware y software.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] hover:border-cyan-500/50 text-slate-300 text-xs font-semibold transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                Mesa de Ayuda Directa
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Inversa. Tecnología en Movimiento. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-slate-400">
            Precios expresados en Pesos Mexicanos (MXN).
          </div>
        </div>
      </div>
    </footer>
  );
};
