import React, { useState, useMemo, useEffect } from 'react';
import { 
  Code2, 
  Sparkles, 
  FileCheck, 
  RotateCcw, 
  Sliders, 
  Eye, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Shield,
  Laptop
} from 'lucide-react';
import { 
  ConfigState, 
  LookFeel, 
  SoftwareModuleId, 
  SlaTier,
  SavedSoftwareQuote 
} from '../../types/configurator';
import { 
  calculateQuote, 
  INITIAL_CONFIG_STATE 
} from '../../utils/configuratorCalculator';
import { ConfiguratorControls } from './ConfiguratorControls';
import { ConfiguratorPreview } from './ConfiguratorPreview';
import { SaveQuoteModal } from './SaveQuoteModal';
import { formatPrice } from '../../utils/formatters';

export const DynamicSoftwareConfigurator: React.FC = () => {
  const [config, setConfig] = useState<ConfigState>(() => {
    // Check if there is a saved draft in sessionStorage
    try {
      const saved = sessionStorage.getItem('inversa_configurator_draft');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_CONFIG_STATE;
  });

  const [activeMobileView, setActiveMobileView] = useState<'controls' | 'preview'>('controls');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [lastSavedQuote, setLastSavedQuote] = useState<SavedSoftwareQuote | null>(null);

  // Sync state to session draft
  useEffect(() => {
    try {
      sessionStorage.setItem('inversa_configurator_draft', JSON.stringify(config));
    } catch (e) {
      // ignore
    }
  }, [config]);

  // Reactive calculation
  const calculation = useMemo(() => {
    return calculateQuote(config);
  }, [config]);

  // Handlers
  const handleUpdateTheme = (theme: LookFeel) => {
    setConfig((prev) => ({ ...prev, theme }));
  };

  const handleToggleModule = (id: SoftwareModuleId) => {
    if (id === 'base_landing') return; // Base landing is required
    setConfig((prev) => ({
      ...prev,
      activeModules: {
        ...prev.activeModules,
        [id]: !prev.activeModules[id]
      }
    }));
  };

  const handleToggleAddon = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      addons: {
        ...prev.addons,
        [id]: !prev.addons[id]
      }
    }));
  };

  const handleUpdatePages = (pagesCount: number) => {
    setConfig((prev) => ({ ...prev, pagesCount }));
  };

  const handleUpdateSla = (sla: SlaTier) => {
    setConfig((prev) => ({ ...prev, sla }));
  };

  const handleReset = () => {
    setConfig(INITIAL_CONFIG_STATE);
  };

  return (
    <div className="w-full min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      
      {/* 1. Header Hero of the Configurator Module */}
      <div className="border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-[#0d1117] to-[#09090b] py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Configurador Visual Dinámico v2.5</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Construye y Cotiza tu Plataforma Web en Tiempo Real
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Personaliza el estilo visual, activa módulos transaccionales y observa la maqueta interactiva funcional actualizarse en vivo con cálculo instantáneo de tiempos y costos en MXN.
            </p>
          </div>

          {/* Quick Stats Ticker in Header */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-right font-mono">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Total Estimado</span>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                ${formatPrice(calculation.total)} <span className="text-xs font-normal text-zinc-400">MXN</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsSaveModalOpen(true)}
              className="py-3 px-5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm shrink-0"
            >
              <FileCheck className="w-4 h-4 text-zinc-900" />
              <span className="hidden sm:inline">Generar Propuesta</span>
              <span className="sm:hidden">Cotizar</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Mobile View Switcher (Controles vs Live Preview Sandbox) */}
      <div className="lg:hidden p-3 bg-zinc-950 border-b border-zinc-800 sticky top-16 z-30 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveMobileView('controls')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeMobileView === 'controls'
              ? 'bg-zinc-800 text-white shadow-xs'
              : 'text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Controles de Configuración</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMobileView('preview')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeMobileView === 'preview'
              ? 'bg-zinc-800 text-white shadow-xs'
              : 'text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vista Previa en Vivo</span>
        </button>
      </div>

      {/* 3. Main Split-Screen Layout */}
      <main className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Clean Interactive Controls (5 cols) */}
          <div className={`lg:col-span-5 ${activeMobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <ConfiguratorControls
              config={config}
              calculation={calculation}
              onUpdateTheme={handleUpdateTheme}
              onToggleModule={handleToggleModule}
              onToggleAddon={handleToggleAddon}
              onUpdatePages={handleUpdatePages}
              onUpdateSla={handleUpdateSla}
              onReset={handleReset}
              onOpenSaveModal={() => setIsSaveModalOpen(true)}
            />
          </div>

          {/* RIGHT COLUMN: Live Preview Sandbox (7 cols, Sticky on Desktop) */}
          <div className={`lg:col-span-7 lg:sticky lg:top-24 ${activeMobileView === 'controls' ? 'hidden lg:block' : 'block'}`}>
            <ConfiguratorPreview
              config={config}
              estimatedDays={calculation.estimatedDays}
              totalPrice={calculation.total}
            />
          </div>

        </div>
      </main>

      {/* 4. Save Quote & Firebase Persistence Modal */}
      <SaveQuoteModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        config={config}
        calculation={calculation}
        onQuoteSaved={(saved) => {
          setLastSavedQuote(saved);
        }}
      />

    </div>
  );
};
