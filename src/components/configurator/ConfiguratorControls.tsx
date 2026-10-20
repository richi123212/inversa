import React from 'react';
import { 
  Palette, 
  Layers, 
  Sliders, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Shield, 
  Zap, 
  Sparkles,
  FileCheck,
  RotateCcw,
  ShoppingBag,
  Calculator,
  LayoutDashboard,
  FileText
} from 'lucide-react';
import { 
  ConfigState, 
  QuoteCalculation, 
  SoftwareModuleId,
  LookFeel,
  SlaTier 
} from '../../types/configurator';
import { 
  SOFTWARE_MODULES_CATALOG, 
  ADDONS_CATALOG, 
  THEME_OPTIONS 
} from '../../utils/configuratorCalculator';
import { formatPrice } from '../../utils/formatters';

interface ConfiguratorControlsProps {
  config: ConfigState;
  calculation: QuoteCalculation;
  onUpdateTheme: (theme: LookFeel) => void;
  onToggleModule: (id: SoftwareModuleId) => void;
  onToggleAddon: (id: string) => void;
  onUpdatePages: (pages: number) => void;
  onUpdateSla: (sla: SlaTier) => void;
  onReset: () => void;
  onOpenSaveModal: () => void;
}

export const ConfiguratorControls: React.FC<ConfiguratorControlsProps> = ({
  config,
  calculation,
  onUpdateTheme,
  onToggleModule,
  onToggleAddon,
  onUpdatePages,
  onUpdateSla,
  onReset,
  onOpenSaveModal
}) => {
  return (
    <div className="w-full space-y-6">
      
      {/* 1. LOOK & FEEL / ESTILO VISUAL */}
      <section className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Palette className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white tracking-tight uppercase font-mono">
                1. Estilo Visual &amp; Look &amp; Feel
              </h3>
              <p className="text-[11px] text-zinc-400">
                Determina la estética, tipografía y paleta del Live Preview.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Reactivo en Vivo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {THEME_OPTIONS.map((theme) => {
            const isSelected = config.theme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onUpdateTheme(theme.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-800/90 border-zinc-500 shadow-md ring-1 ring-zinc-500'
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div>
                  {/* Color dots preview */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    {theme.paletteColors.map((hex, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-xs"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                    {isSelected && (
                      <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        Activo
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-semibold text-white tracking-tight">
                    {theme.name}
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
                    {theme.tagline}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 mt-2.5 leading-relaxed line-clamp-2">
                  {theme.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. MÓDULOS DE SOFTWARE PRINCIPALES */}
      <section className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Layers className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white tracking-tight uppercase font-mono">
                2. Módulos &amp; Capacidades del Software
              </h3>
              <p className="text-[11px] text-zinc-400">
                Selecciona las capas funcionales que requiere tu plataforma.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            {calculation.activeModulesCount} seleccionados
          </span>
        </div>

        <div className="space-y-2.5">
          {SOFTWARE_MODULES_CATALOG.map((mod) => {
            const isActive = Boolean(config.activeModules[mod.id]);
            const isBase = Boolean(mod.required);

            return (
              <div
                key={mod.id}
                onClick={() => !isBase && onToggleModule(mod.id)}
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  isBase
                    ? 'bg-zinc-900/80 border-zinc-700/80 cursor-default'
                    : isActive
                    ? 'bg-zinc-800/80 border-zinc-600 cursor-pointer shadow-xs'
                    : 'bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700 cursor-pointer hover:bg-zinc-900/40'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-semibold text-white tracking-tight">
                      {mod.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {mod.badge}
                    </span>
                    {isBase && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                        Obligatorio
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {mod.shortDesc}
                  </p>

                  <div className="flex items-center gap-2 mt-2 font-mono text-[11px] text-zinc-400">
                    <span className="text-white font-semibold">
                      +${formatPrice(mod.basePrice)} MXN
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      +{mod.days} días
                    </span>
                  </div>
                </div>

                {/* Switch Toggle */}
                <div className="shrink-0 pt-0.5">
                  <div
                    className={`w-10 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      isActive ? 'bg-emerald-500' : 'bg-zinc-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ALCANCE Y PÁGINAS A MEDIDA */}
      <section className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Sliders className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white tracking-tight uppercase font-mono">
                3. Alcance de Páginas &amp; Secciones
              </h3>
              <p className="text-[11px] text-zinc-400">
                Vistas corporativas adicionales (ej. Nosotros, Servicios, Casos, FAQ).
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">
            {config.pagesCount} {config.pagesCount === 1 ? 'Página' : 'Páginas'}
          </span>
        </div>

        <div className="space-y-3">
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={config.pagesCount}
            onChange={(e) => onUpdatePages(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
          />

          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>1 Página (One-Page)</span>
            <span>5 Páginas</span>
            <span>10 Páginas</span>
            <span>15 Páginas</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-400">
              {config.pagesCount === 1 ? 'Incluida en la base' : `${config.pagesCount - 1} páginas extras estructuradas`}
            </span>
            <span className="font-mono text-white font-semibold">
              {config.pagesCount === 1 ? '$0 MXN' : `+$${formatPrice(calculation.pagesPrice)} MXN`}
            </span>
          </div>
        </div>
      </section>

      {/* 4. COMPLEMENTOS & SERVICIOS DE VALOR AGREGADO */}
      <section className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white tracking-tight uppercase font-mono">
                4. Complementos Técnicos &amp; IA
              </h3>
              <p className="text-[11px] text-zinc-400">
                Potencia la velocidad, infraestructura o automatización de tu web.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Opcional</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ADDONS_CATALOG.map((addon) => {
            const isChecked = Boolean(config.addons[addon.id]);

            return (
              <label
                key={addon.id}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                  isChecked
                    ? 'bg-zinc-800/70 border-zinc-600 shadow-xs'
                    : 'bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleAddon(addon.id)}
                  className="mt-0.5 rounded bg-zinc-900 border-zinc-700 text-emerald-500 focus:ring-0 cursor-pointer accent-emerald-500"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-white block">
                    {addon.name}
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                    {addon.desc}
                  </p>
                  <div className="mt-1.5 font-mono text-[10px] text-emerald-400 font-semibold">
                    +${formatPrice(addon.price)} MXN • +{addon.days}d
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* 5. VELOCIDAD DE ENTREGA / SLA */}
      <section className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white tracking-tight uppercase font-mono">
                5. Tiempo de Entrega &amp; Modalidad
              </h3>
              <p className="text-[11px] text-zinc-400">
                Selecciona la velocidad de despliegue de tu equipo de ingeniería.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { id: 'standard' as SlaTier, name: 'Estándar', desc: 'Desarrollo regular con sprints planificados', tag: 'Sin recargo' },
            { id: 'express' as SlaTier, name: 'Express (-35% tiempo)', desc: 'Equipo dedicado para entrega rápida', tag: '+20% Inversión' },
            { id: 'enterprise' as SlaTier, name: 'Enterprise (-50% tiempo)', desc: 'Despliegue prioritario de alta urgencia', tag: '+35% Inversión' }
          ].map((tier) => {
            const isSelected = config.sla === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onUpdateSla(tier.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-zinc-800 border-zinc-600 text-white font-semibold shadow-xs'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white">{tier.name}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {tier.tag}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 leading-snug">
                  {tier.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. LIVE TOTAL CALCULATION CARD & ACTIONS */}
      <div className="sticky bottom-4 z-20 p-5 rounded-2xl bg-zinc-950/95 border border-zinc-700/80 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
              Inversión Estimada del Proyecto
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                ${formatPrice(calculation.total)}
              </span>
              <span className="text-xs font-semibold text-zinc-400 font-mono">MXN</span>
              <span className="text-[11px] text-zinc-500 font-mono ml-2">
                (${formatPrice(calculation.subtotal)} + 16% IVA)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 shrink-0">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-zinc-500 block">Tiempo Estimado:</span>
              <span className="font-bold text-white">~{calculation.estimatedDays} días hábiles</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={onOpenSaveModal}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <FileCheck className="w-4 h-4 text-zinc-900 group-hover:scale-110 transition-transform" />
            <span>Guardar Cotización / Generar Propuesta</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            title="Restablecer configuración"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

    </div>
  );
};
