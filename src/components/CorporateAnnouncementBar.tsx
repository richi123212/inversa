import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, Receipt, Cpu } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    icon: Receipt,
    text: 'Facturación Fiscal CFDI 4.0 Institucional en Pesos Mexicanos (MXN)',
    badge: 'EMPRESARIAL'
  },
  {
    icon: ShieldCheck,
    text: 'Póliza de Garantía Oficial en Todo el Hardware & Componentes Certificados',
    badge: 'GARANTÍA'
  },
  {
    icon: Cpu,
    text: 'Arquitectura de Software con Código Limpio, Alta Velocidad & Seguridad TLS 1.3',
    badge: 'INGENIERÍA'
  },
  {
    icon: Truck,
    text: 'Despacho Seguro & Cobertura Logística en Toda la República Mexicana',
    badge: 'COBERTURA'
  }
];

export const CorporateAnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="w-full bg-[#05080E] border-b border-[#1E293B]/80 text-slate-300 text-[11px] font-mono py-2 px-4 relative z-50 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Active Rotating Announcement */}
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 shrink-0">
            {current.badge}
          </span>
          <div className="flex items-center gap-2 transition-all duration-500 transform animate-fadeIn truncate">
            <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate text-slate-300 tracking-wide">
              {current.text}
            </span>
          </div>
        </div>

        {/* Right: Currency and Direct Status */}
        <div className="hidden sm:flex items-center gap-4 shrink-0 text-[10px] text-slate-500">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Operaciones Centrales Activas
          </span>
          <span className="border-l border-[#1E293B] pl-3 text-cyan-400 font-bold">
            MXN ($)
          </span>
        </div>

      </div>
    </div>
  );
};
