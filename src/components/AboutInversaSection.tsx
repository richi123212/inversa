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
  Building2,
  FileCheck
} from 'lucide-react';
import { ProcessorCircuitAnimation } from './ProcessorCircuitAnimation';

interface AboutInversaSectionProps {
  onGoToStore: () => void;
}

export const AboutInversaSection: React.FC<AboutInversaSectionProps> = ({ onGoToStore }) => {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Banner with Circuit Backdrop */}
      <div className="max-w-6xl mx-auto relative rounded-2xl bg-zinc-900/60 border border-zinc-800 p-8 sm:p-14 overflow-hidden shadow-xl mb-12">
        <div className="absolute inset-0 opacity-25 pointer-events-none flex items-center justify-center">
          <ProcessorCircuitAnimation className="w-full h-full max-w-5xl" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700/80 text-zinc-300 text-xs font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Perfil Corporativo • Inversa México</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Equipamiento Tecnológico &amp; Arquitectura de Software
          </h1>

          <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
            Inversa es un portal especializado en el suministro de equipamiento tecnológico de alto rendimiento y consultoría en ingeniería de software para profesionistas y empresas en México. Catálogo especializado, asesoría técnica directa y soluciones a la medida.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onGoToStore}
              className="px-6 py-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm"
            >
              <span>Explorar Catálogo de Hardware</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        {/* Pillar 1 */}
        <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 mb-6">
              <Cpu className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Equipamiento Certificado</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Laptops, estaciones de trabajo, componentes GPU de última generación y periféricos de ingeniería con garantía directa de fabricante y trazabilidad oficial de importación.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Original con Garantía</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 mb-6">
              <Code2 className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Desarrollo Web &amp; Software</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Ingeniería digital para empresas: landing pages de alta conversión, plataformas transaccionales de e-commerce y aplicaciones SaaS con React, TypeScript y Next.js.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Código Limpio &amp; Alta Velocidad</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 mb-6">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Atención y Despacho Empresarial</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Todos los precios exhibidos en Inversa incluyen IVA en pesos mexicanos. Ofrecemos acompañamiento técnico personalizado y envíos asegurados para proyectos corporativos.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Precios Claros en MXN (IVA Incluido)</span>
          </div>
        </div>

      </div>

      {/* Operational Highlights */}
      <div className="max-w-6xl mx-auto rounded-xl bg-zinc-900/40 border border-zinc-800 p-8 sm:p-10">
        <h3 className="text-sm font-semibold text-white mb-6 font-mono uppercase tracking-wider text-zinc-300">
          Compromiso Operativo para Clientes B2B
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-lg bg-zinc-950/70 border border-zinc-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 className="text-sm font-semibold text-white">Garantía Directa</h4>
            <p className="text-xs text-zinc-400 mt-1">Póliza oficial en hardware y 30 días de garantía técnica posterior a la entrega en proyectos web.</p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-950/70 border border-zinc-800">
            <Truck className="w-5 h-5 text-zinc-200 mb-2" />
            <h4 className="text-sm font-semibold text-white">Logística Asegurada</h4>
            <p className="text-xs text-zinc-400 mt-1">Despacho con rastreo activo vía DHL Express y FedEx a las 32 entidades federativas del país.</p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-950/70 border border-zinc-800">
            <FileCheck className="w-5 h-5 text-sky-400 mb-2" />
            <h4 className="text-sm font-semibold text-white">Precios Transparentes</h4>
            <p className="text-xs text-zinc-400 mt-1">Valores finales en moneda nacional con IVA desglosado desde la primera consulta.</p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-950/70 border border-zinc-800">
            <Layers className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="text-sm font-semibold text-white">Cotizador Abierto</h4>
            <p className="text-xs text-zinc-400 mt-1">Cálculo transparente de costos sin intermediarios ni cobros imprevistos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
