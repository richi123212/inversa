import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, Receipt, Sparkles } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    icon: Receipt,
    text: 'Facturación fiscal CFDI 4.0 automática en Pesos Mexicanos (IVA incluido)',
    badge: 'CFDI 4.0'
  },
  {
    icon: ShieldCheck,
    text: 'Equipos 100% originales con garantía oficial directa de fabricante',
    badge: 'Garantía'
  },
  {
    icon: Truck,
    text: 'Envíos asegurados a las 32 entidades de la República con DHL y FedEx',
    badge: 'Cobertura'
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
    <div className="w-full bg-zinc-950 border-b border-zinc-800/80 text-zinc-300 text-[11px] font-mono py-1.5 px-4 select-none overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        
        {/* Left: Active Announcement */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700/60 shrink-0">
            {current.badge}
          </span>
          <div className="flex items-center gap-1.5 transition-all duration-300 truncate">
            <Icon className="w-3 h-3 text-zinc-400 shrink-0" />
            <span className="truncate text-zinc-400 text-xs">
              {current.text}
            </span>
          </div>
        </div>

        {/* Right: Currency & Immediate Operational Notice */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operaciones directas en México
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300 font-semibold">
            MXN ($)
          </span>
        </div>

      </div>
    </div>
  );
};
