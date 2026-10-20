import React, { useState } from 'react';
import { 
  Laptop, 
  Tablet, 
  Smartphone, 
  ExternalLink, 
  Shield, 
  Cpu, 
  ShoppingBag, 
  Calculator, 
  LayoutDashboard, 
  Zap, 
  CheckCircle2, 
  Search, 
  Menu, 
  ArrowRight,
  Database,
  Bot,
  Sparkles,
  Lock,
  BarChart2,
  RefreshCw
} from 'lucide-react';
import { ConfigState, LookFeel } from '../../types/configurator';

interface ConfiguratorPreviewProps {
  config: ConfigState;
  estimatedDays: number;
  totalPrice: number;
}

export const ConfiguratorPreview: React.FC<ConfiguratorPreviewProps> = ({
  config,
  estimatedDays,
  totalPrice
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTabPreview, setActiveTabPreview] = useState<'inicio' | 'tienda' | 'cotizador' | 'dashboard'>('inicio');
  const [miniSliderValue, setMiniSliderValue] = useState(5);
  const [animKey, setAnimKey] = useState(0);

  const handleRefresh = () => {
    setAnimKey((prev) => prev + 1);
  };

  // Theme-based class dictionaries
  const themeStyles: Record<LookFeel, {
    bg: string;
    cardBg: string;
    border: string;
    accentText: string;
    accentBg: string;
    button: string;
    glow: string;
    fontStyle: string;
    badge: string;
  }> = {
    'minimalista-corporativo': {
      bg: 'bg-[#09090b]',
      cardBg: 'bg-zinc-900/70',
      border: 'border-zinc-800',
      accentText: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10 border-emerald-500/30',
      button: 'bg-zinc-100 hover:bg-white text-zinc-950 font-semibold',
      glow: 'shadow-[0_0_25px_rgba(255,255,255,0.03)]',
      fontStyle: 'font-sans',
      badge: 'bg-zinc-800 text-zinc-300 border-zinc-700'
    },
    'high-tech-dark': {
      bg: 'bg-[#030712]',
      cardBg: 'bg-slate-900/80',
      border: 'border-cyan-900/60',
      accentText: 'text-cyan-400',
      accentBg: 'bg-cyan-950/60 border-cyan-500/40',
      button: 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]',
      glow: 'shadow-[0_0_35px_rgba(6,182,212,0.1)]',
      fontStyle: 'font-mono',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-800'
    },
    'ecommerce-comercial': {
      bg: 'bg-[#0b0f19]',
      cardBg: 'bg-slate-900/90',
      border: 'border-blue-900/40',
      accentText: 'text-amber-400',
      accentBg: 'bg-blue-950/60 border-blue-600/40',
      button: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-md shadow-blue-500/20',
      glow: 'shadow-[0_0_30px_rgba(59,130,246,0.12)]',
      fontStyle: 'font-sans',
      badge: 'bg-amber-950/60 text-amber-300 border-amber-800'
    }
  };

  const currentTheme = themeStyles[config.theme];

  // Dynamic preview width based on simulated viewport
  const viewportWidthClass = 
    viewport === 'mobile' ? 'max-w-[360px]' :
    viewport === 'tablet' ? 'max-w-[640px]' :
    'max-w-full';

  return (
    <div className="w-full flex flex-col h-full">
      {/* Sandbox Browser Frame Chrome Header */}
      <div className="rounded-t-2xl bg-zinc-950 border border-zinc-800 p-3 sm:px-4 sm:py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg select-none">
        
        {/* Left: Window Dots & Device Viewport Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-zinc-400 text-xs">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-md transition-all ${
                viewport === 'desktop' ? 'bg-zinc-800 text-white shadow-xs' : 'hover:text-white'
              }`}
              title="Vista Escritorio (100%)"
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-md transition-all ${
                viewport === 'tablet' ? 'bg-zinc-800 text-white shadow-xs' : 'hover:text-white'
              }`}
              title="Vista Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-md transition-all ${
                viewport === 'mobile' ? 'bg-zinc-800 text-white shadow-xs' : 'hover:text-white'
              }`}
              title="Vista Móvil (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center: Simulated Domain Bar */}
        <div className="flex-1 max-w-xs mx-auto hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400 truncate">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="text-zinc-500">https://</span>
          <span className="text-zinc-200 truncate font-semibold">
            {config.clientInfo?.company ? config.clientInfo.company.toLowerCase().replace(/\s+/g, '') : 'tu-empresa'}
          </span>
          <span className="text-zinc-500">.inversati.com</span>
        </div>

        {/* Right: Live Sandbox Tag & Trigger reload */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SANDBOX VIVO</span>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            title="Reiniciar micro-animación"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Simulated Browser Canvas Body */}
      <div className="flex-1 bg-zinc-950/90 border-x border-b border-zinc-800 rounded-b-2xl p-2 sm:p-5 flex items-start justify-center overflow-x-hidden overflow-y-auto max-h-[720px] transition-all">
        
        <div 
          key={animKey}
          className={`w-full transition-all duration-300 ${viewportWidthClass} ${currentTheme.bg} ${currentTheme.border} ${currentTheme.glow} rounded-xl border overflow-hidden flex flex-col`}
        >
          {/* 1. Sandboxed Header Navigation */}
          <div className={`px-4 py-3 border-b ${currentTheme.border} flex items-center justify-between gap-3 bg-zinc-950/60 backdrop-blur-md`}>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                config.theme === 'minimalista-corporativo' ? 'bg-zinc-100 text-zinc-950' :
                config.theme === 'high-tech-dark' ? 'bg-cyan-500 text-black shadow-xs' :
                'bg-blue-600 text-white'
              }`}>
                {config.clientInfo?.company ? config.clientInfo.company.charAt(0).toUpperCase() : 'I'}
              </div>
              <span className="font-semibold text-xs tracking-tight text-white font-mono">
                {config.clientInfo?.company || 'TU PROYECTO WEB'}
              </span>
            </div>

            {/* Simulated Desktop Nav Items */}
            <nav className="hidden sm:flex items-center gap-3 text-[11px] text-zinc-400">
              <span 
                onClick={() => setActiveTabPreview('inicio')}
                className={`cursor-pointer transition-colors ${activeTabPreview === 'inicio' ? 'text-white font-semibold' : 'hover:text-zinc-200'}`}
              >
                Inicio
              </span>

              {config.activeModules.ecommerce_cart && (
                <span 
                  onClick={() => setActiveTabPreview('tienda')}
                  className={`cursor-pointer flex items-center gap-1 transition-colors ${activeTabPreview === 'tienda' ? 'text-white font-semibold' : 'hover:text-zinc-200'}`}
                >
                  <ShoppingBag className="w-3 h-3" />
                  Tienda
                </span>
              )}

              {config.activeModules.interactive_quoter && (
                <span 
                  onClick={() => setActiveTabPreview('cotizador')}
                  className={`cursor-pointer flex items-center gap-1 transition-colors ${activeTabPreview === 'cotizador' ? 'text-white font-semibold' : 'hover:text-zinc-200'}`}
                >
                  <Calculator className="w-3 h-3" />
                  Cotizador
                </span>
              )}

              {config.activeModules.auth_dashboard && (
                <span 
                  onClick={() => setActiveTabPreview('dashboard')}
                  className={`cursor-pointer flex items-center gap-1 transition-colors ${activeTabPreview === 'dashboard' ? 'text-white font-semibold' : 'hover:text-zinc-200'}`}
                >
                  <LayoutDashboard className="w-3 h-3" />
                  Panel
                </span>
              )}

              <span className="text-zinc-500 font-mono">({config.pagesCount} págs)</span>
            </nav>

            {/* Micro Action Button in Header */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`px-3 py-1.5 rounded-md text-[11px] transition-all flex items-center gap-1.5 ${currentTheme.button}`}
              >
                <span>Contactar</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 2. Sandboxed Hero Banner */}
          <div className="p-6 sm:p-8 relative overflow-hidden border-b border-zinc-800/80">
            {/* Background dynamic grid or glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono mb-3 border ${currentTheme.badge}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Arquitectura Digital de Alto Impacto</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {config.theme === 'minimalista-corporativo' && 'Precisión técnica y diseño minimalista para tu organización.'}
                {config.theme === 'high-tech-dark' && 'Infraestructura cloud, alta disponibilidad y telemetría en vivo.'}
                {config.theme === 'ecommerce-comercial' && 'Convierte visitantes en clientes recurrentes con checkout optimizado.'}
              </h1>

              <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-md">
                Plataforma web escalable estructurada para {config.pagesCount} página(s) clave, equipada con {Object.values(config.activeModules).filter(Boolean).length} módulos de software activo(s).
              </p>

              {/* Badges of Addons Active */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {config.addons.seo_speed && (
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-emerald-400">
                    ⚡ Core Web Vitals 99+
                  </span>
                )}
                {config.addons.database_mysql && (
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-sky-400">
                    🗄️ PostgreSQL / MySQL
                  </span>
                )}
                {config.addons.ai_chatbot && (
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-purple-400">
                    🤖 Asistente IA Entrenado
                  </span>
                )}
                {config.addons.cms_admin && (
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-amber-400">
                    📝 CMS Autoadministrable
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 3. Sandboxed Dynamic Modules Showcase */}
          <div className="p-4 sm:p-6 space-y-5">
            
            {/* A. E-COMMERCE MODULE PREVIEW (If active) */}
            {config.activeModules.ecommerce_cart && (
              <div className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.cardBg} transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className={`w-4 h-4 ${currentTheme.accentText}`} />
                    <span className="text-xs font-semibold text-white">Módulo E-Commerce &amp; Pasarelas</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    Stripe / SPEI / MP
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { name: 'Solución Corporativa Alpha', price: '$4,990', tag: 'Destacado' },
                    { name: 'Licencia Servidor Pro', price: '$8,450', tag: 'Cloud' },
                    { name: 'Paquete de Integración', price: '$3,200', tag: 'Servicio' }
                  ].map((prod, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800 flex flex-col justify-between">
                      <div className="w-full aspect-[4/3] rounded bg-zinc-900 border border-zinc-800/80 mb-2 flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-zinc-600" />
                      </div>
                      <span className="text-[11px] font-medium text-white truncate">{prod.name}</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[11px] font-mono font-bold text-zinc-200">{prod.price}</span>
                        <button type="button" className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
                          + Agregar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* B. INTERACTIVE QUOTER MODULE PREVIEW (If active) */}
            {config.activeModules.interactive_quoter && (
              <div className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.cardBg} transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className={`w-4 h-4 ${currentTheme.accentText}`} />
                    <span className="text-xs font-semibold text-white">Cotizador Dinámico Interactivo</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Cálculo Reactivo
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[11px]">Volumen / Alcance del Cliente:</span>
                    <span className="font-mono text-white font-bold">{miniSliderValue} unidades</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={miniSliderValue}
                    onChange={(e) => setMiniSliderValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[11px] font-mono">
                    <span className="text-zinc-400">Total Proyectado en Vivo:</span>
                    <span className="text-emerald-400 font-bold">
                      ${(miniSliderValue * 1450).toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* C. DASHBOARD / RBAC MODULE PREVIEW (If active) */}
            {config.activeModules.auth_dashboard && (
              <div className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.cardBg} transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className={`w-4 h-4 ${currentTheme.accentText}`} />
                    <span className="text-xs font-semibold text-white">Dashboard &amp; Panel Privado RBAC</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Auth JWT 256-Bit</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2 rounded bg-zinc-950/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 block">Usuarios</span>
                    <span className="text-xs font-bold text-white">1,420</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 block">Conversión</span>
                    <span className="text-xs font-bold text-emerald-400">8.4%</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 block">Uptime</span>
                    <span className="text-xs font-bold text-sky-400">99.98%</span>
                  </div>
                </div>
              </div>
            )}

            {/* D. API & AUTOMATION MODULE PREVIEW (If active) */}
            {config.activeModules.api_automation && (
              <div className={`p-3.5 rounded-xl border ${currentTheme.border} ${currentTheme.cardBg} flex items-center justify-between font-mono text-[11px]`}>
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-zinc-200">API Webhook Pipeline</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[10px]">
                    200 OK
                  </span>
                  <span className="text-zinc-500 text-[10px]">42ms</span>
                </div>
              </div>
            )}

          </div>

          {/* 4. Sandboxed Footer */}
          <div className="mt-auto px-4 py-3 border-t border-zinc-800/80 bg-zinc-950/80 flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>© {new Date().getFullYear()} {config.clientInfo?.company || 'Tu Empresa'}. Todos los derechos reservados.</span>
            <span className="text-zinc-400">Desarrollado con arquitectura Inversa</span>
          </div>

        </div>

      </div>

    </div>
  );
};
