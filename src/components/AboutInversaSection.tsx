import React from 'react';
import { 
  Cpu, 
  Code2, 
  ShieldCheck, 
  Truck, 
  Terminal, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { ProcessorCircuitAnimation } from './ProcessorCircuitAnimation';

interface AboutInversaSectionProps {
  onGoToStore: () => void;
}

export const AboutInversaSection: React.FC<AboutInversaSectionProps> = ({ onGoToStore }) => {
  return (
    <div className="min-h-screen bg-[#080C14] py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Banner with Circuit Backdrop */}
      <div className="max-w-6xl mx-auto relative rounded-3xl bg-[#0F172A] border border-[#1E293B] p-8 sm:p-14 overflow-hidden shadow-2xl mb-12">
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
          <ProcessorCircuitAnimation className="w-full h-full max-w-5xl" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#080C14] border border-cyan-500/30 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            INFORMACIÓN INSTITUCIONAL • INVERSA MÉXICO
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Tecnología en Movimiento &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              Arquitectura Híbrida
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            Inversa es una plataforma tecnológica creada para poner al alcance de todos (desde personas individuales, creadores y negocios independientes hasta empresas consolidadas) hardware físico de alto rendimiento y desarrollo de sitios web profesionales a la medida.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onGoToStore}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <span>Explorar Tienda &amp; Productos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* Pillar 1 */}
        <div className="p-8 rounded-2xl bg-[#0F172A]/80 border border-[#1E293B] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Hardware Certificado</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Suministro de estaciones de trabajo, componentes GPU de cálculo paralelo, almacenamiento ultrarrápido y periféricos de ingeniería con póliza de garantía oficial y trazabilidad de origen.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#1E293B] text-xs font-mono text-cyan-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Original &amp; Facturado</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-8 rounded-2xl bg-[#0F172A]/80 border border-[#1E293B] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Desarrollo Web a Medida</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Ingeniería de software para plataformas web de alta conversión: landing pages, portales de catálogo, e-commerce y sistemas SaaS construidos con React, Next.js y TypeScript.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#1E293B] text-xs font-mono text-blue-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Velocidad &lt; 800ms &amp; SSL TLS 1.3</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-8 rounded-2xl bg-[#0F172A]/80 border border-[#1E293B] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Atención &amp; Respaldo Total</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Atención cercana para personas, profesionistas independientes y empresas en México. Cotizaciones claras con desglose de IVA, folios oficiales y emisión de factura fiscal CFDI 4.0 cuando la necesites.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#1E293B] text-xs font-mono text-sky-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CFDI 4.0 en Pesos Mexicanos (MXN)</span>
          </div>
        </div>

      </div>

      {/* Operational Highlights */}
      <div className="max-w-6xl mx-auto rounded-2xl bg-[#0B101E] border border-[#1E293B] p-8 sm:p-10">
        <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider font-mono text-cyan-400">
          Infraestructura &amp; Compromiso Operativo
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-[#080C14] border border-[#1E293B]">
            <ShieldCheck className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Garantía Total</h4>
            <p className="text-xs text-slate-400 mt-1">Póliza directa en hardware y 30 días de garantía post-lanzamiento en código web.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-[#1E293B]">
            <Truck className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Despacho Nacional</h4>
            <p className="text-xs text-slate-400 mt-1">Envíos asegurados a cualquier entidad federativa con rastreo en tiempo real.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-[#1E293B]">
            <Terminal className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Código de Producción</h4>
            <p className="text-xs text-slate-400 mt-1">Arquitectura mantenible sin dependencias innecesarias, testeada para alta escalabilidad.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-[#1E293B]">
            <Layers className="w-5 h-5 text-sky-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Cotizador Abierto</h4>
            <p className="text-xs text-slate-400 mt-1">Cálculo transparente de costos sin intermediarios ni cargos ocultos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
