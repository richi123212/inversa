import React from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  CreditCard, 
  Headphones, 
  ArrowUpRight,
  Truck,
  CheckCircle2
} from 'lucide-react';

interface TrustSignalsBarProps {
  onContactClick?: () => void;
  className?: string;
}

export const TrustSignalsBar: React.FC<TrustSignalsBarProps> = ({ 
  onContactClick,
  className = '' 
}) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '5215555555555';
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola, me comunico desde Inversa para solicitar una cotización corporativa para mi empresa.')}`;

  return (
    <section className={`w-full border-y border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md ${className}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Header summary label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 font-mono">
              Garantías Comerciales &amp; Respaldo B2B
            </span>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Operaciones directas en la República Mexicana • Precios en MXN
          </span>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          
          {/* 1. Facturación CFDI 4.0 */}
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-200">
                  <FileCheck className="w-4 h-4 text-sky-400" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  CFDI 4.0
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                Facturación Fiscal Inmediata
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Todos nuestros precios incluyen IVA. Facturación automática para empresas y personas físicas al momento de tu compra.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Desglose fiscal garantizado</span>
            </div>
          </div>

          {/* 2. Garantía y Respaldo */}
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  100% Original
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                Garantía y Respaldo Oficial
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Equipos 100% originales con garantía directa de fabricante y soporte técnico local especializado en territorio nacional.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Centros de servicio autorizados</span>
            </div>
          </div>

          {/* 3. Métodos de Pago y Logística */}
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-200">
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  Pago Seguro
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                Pagos Seguros &amp; Envíos
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Transferencia SPEI bancaria, Stripe y Mercado Pago. Envíos asegurados a todo México a través de DHL y FedEx.
              </p>
            </div>
            
            {/* Badges */}
            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950 text-zinc-300 border border-zinc-800">
                SPEI
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950 text-zinc-300 border border-zinc-800">
                Stripe
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950 text-zinc-300 border border-zinc-800">
                Mercado Pago
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950 text-zinc-300 border border-zinc-800">
                DHL / FedEx
              </span>
            </div>
          </div>

          {/* 4. Atención Humana y Cotizaciones por Volumen */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800/90 hover:border-zinc-700/90 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-200">
                  <Headphones className="w-4 h-4 text-blue-400" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-950/60 text-blue-300 border border-blue-800/50">
                  Atención B2B
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                Asesoría &amp; Volumen
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                ¿Necesitas una cotización por volumen, orden de compra o licitación? Habla directamente con un asesor especializado.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/60">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm group"
              >
                <span>Hablar con un Asesor</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
