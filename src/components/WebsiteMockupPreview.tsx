import React, { useState, useEffect, useMemo } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  Lock,
  ExternalLink,
  Search,
  ShoppingCart,
  Package,
  Calendar,
  BarChart3,
  Users,
  FileText,
  FileSpreadsheet,
  FileEdit,
  Bot,
  MessageSquare,
  QrCode,
  Bell,
  Sun,
  Moon,
  Palette,
  CheckCircle2,
  Clock,
  ShieldCheck,
  History,
  X,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
  Sliders,
  Sparkles,
  PhoneCall,
  Check,
  UtensilsCrossed,
  Layers,
  Award,
  Star,
  Flame,
  Wifi,
  Battery,
  Signal,
  ShoppingBag,
  Plus,
  Minus,
  Send,
  Trash2,
  Eye,
  Info,
  Terminal,
  ChevronRight,
  Truck,
  DollarSign,
  Briefcase,
  Building,
  HeartPulse,
  Tag,
  ArrowRight,
  CheckCheck,
  Maximize2,
  Filter,
  LogOut,
  FolderOpen,
  Table,
  Zap,
  Cpu,
  Disc,
  Leaf,
  Gamepad2
} from 'lucide-react';
import { ProductArtwork } from './ProductArtwork';
import { formatPrice } from '../utils/formatters';

export type MockupDemoType = 'catalogo' | 'inventario' | 'citas' | 'dashboard' | 'corporativo' | 'restaurante';

export type DesignStyleType =
  | 'boutique'
  | 'saas_clean'
  | 'bold_creative'
  | 'neo_brutalist'
  | 'cyber_tech'
  | 'warm_organic'
  | 'moderno'
  | 'corporativo'
  | 'tech'
  | 'retail';

export interface DesignStyleDetail {
  id: 'boutique' | 'saas_clean' | 'bold_creative' | 'neo_brutalist' | 'cyber_tech' | 'warm_organic';
  name: string;
  badge: string;
  inspiration: string;
  fontTitle: string;
  fontBody: string;
  fontTag: string;
  fontSample: string;
  sampleLetter: string;
  wrapperRounded: string;
  cardRounded: string;
  buttonRounded: string;
  badgeRounded: string;
  borderClass: string;
  shadowClass: string;
  heroTag: string;
  light: {
    canvasBg: string;
    cardBg: string;
    cardAltBg: string;
    textTitle: string;
    textSubtitle: string;
    textMuted: string;
    border: string;
    accentHex: string;
    accentText: string;
    accentBg: string;
    accentBorder: string;
    buttonPrimary: string;
    bannerBg: string;
  };
  dark: {
    canvasBg: string;
    cardBg: string;
    cardAltBg: string;
    textTitle: string;
    textSubtitle: string;
    textMuted: string;
    border: string;
    accentHex: string;
    accentText: string;
    accentBg: string;
    accentBorder: string;
    buttonPrimary: string;
    bannerBg: string;
  };
}

export const normalizeDesignStyle = (
  style?: DesignStyleType
): 'boutique' | 'saas_clean' | 'bold_creative' | 'neo_brutalist' | 'cyber_tech' | 'warm_organic' => {
  if (style === 'boutique') return 'boutique';
  if (style === 'saas_clean' || style === 'corporativo') return 'saas_clean';
  if (style === 'cyber_tech' || style === 'tech') return 'cyber_tech';
  if (style === 'warm_organic') return 'warm_organic';
  if (style === 'neo_brutalist') return 'neo_brutalist';
  if (style === 'bold_creative' || style === 'moderno' || style === 'retail') return 'bold_creative';
  return 'saas_clean';
};

export const DESIGN_STYLES_MAP: Record<
  'boutique' | 'saas_clean' | 'bold_creative' | 'neo_brutalist' | 'cyber_tech' | 'warm_organic',
  DesignStyleDetail
> = {
  boutique: {
    id: 'boutique',
    name: 'Boutique & Lujo Editorial',
    badge: 'Squarespace / Vogue',
    inspiration: 'Alta Gama, Hoteles Boutique, Joyería, Fotografía & Gastronomía',
    fontTitle: 'font-serif',
    fontBody: 'font-sans font-light tracking-wide',
    fontTag: 'Playfair Display',
    fontSample: 'Elegance is an attitude',
    sampleLetter: 'Aa',
    wrapperRounded: 'rounded-2xl',
    cardRounded: 'rounded-lg',
    buttonRounded: 'rounded-none',
    badgeRounded: 'rounded-full',
    borderClass: 'border-[0.5px]',
    shadowClass: 'shadow-sm hover:shadow-md',
    heroTag: '✨ COLECCIÓN PRIVADA & ATELIER DE AUTOR',
    light: {
      canvasBg: 'bg-[#FAF7F2]',
      cardBg: 'bg-[#FFFFFF]',
      cardAltBg: 'bg-[#F4ECE1]',
      textTitle: 'text-[#231F1C] font-serif font-normal tracking-wide',
      textSubtitle: 'text-[#5C554E] font-serif italic',
      textMuted: 'text-[#8C8379]',
      border: 'border-[#E2D9CC]',
      accentHex: '#BFA181',
      accentText: 'text-[#8C6D46]',
      accentBg: 'bg-[#BFA181]/15',
      accentBorder: 'border-[#BFA181]/40',
      buttonPrimary: 'bg-[#231F1C] hover:bg-black text-[#FAF7F2] tracking-[0.2em] uppercase text-[11px] font-medium shadow-sm',
      bannerBg: 'bg-[#F4ECE1] border border-[#E2D9CC] text-[#231F1C]'
    },
    dark: {
      canvasBg: 'bg-[#141210]',
      cardBg: 'bg-[#1C1917]',
      cardAltBg: 'bg-[#26221F]',
      textTitle: 'text-[#F5F0EB] font-serif font-normal tracking-wide',
      textSubtitle: 'text-[#D1C7BD] font-serif italic',
      textMuted: 'text-[#9C9287]',
      border: 'border-[#332D27]',
      accentHex: '#D4AF37',
      accentText: 'text-[#D4AF37]',
      accentBg: 'bg-[#D4AF37]/15',
      accentBorder: 'border-[#D4AF37]/40',
      buttonPrimary: 'bg-[#C5A880] hover:bg-[#D4AF37] text-[#141210] tracking-[0.2em] uppercase text-[11px] font-bold shadow-sm',
      bannerBg: 'bg-[#1E1B18] border border-[#3A332C] text-[#F5F0EB]'
    }
  },

  saas_clean: {
    id: 'saas_clean',
    name: 'SaaS Enterprise & Minimal',
    badge: 'Stripe / Linear',
    inspiration: 'ERPs, Plataformas B2B, Logística, Finanzas & Startups Tech',
    fontTitle: 'font-sans font-bold tracking-tight',
    fontBody: 'font-sans',
    fontTag: 'Plus Jakarta Sans',
    fontSample: 'High-performance cloud',
    sampleLetter: 'Aa',
    wrapperRounded: 'rounded-xl',
    cardRounded: 'rounded-xl',
    buttonRounded: 'rounded-lg',
    badgeRounded: 'rounded-full',
    borderClass: 'border',
    shadowClass: 'shadow-xs hover:shadow-md',
    heroTag: '🏛️ ARQUITECTURA ENTERPRISE & ALTA CONCURRENCIA',
    light: {
      canvasBg: 'bg-[#F8FAFC]',
      cardBg: 'bg-white',
      cardAltBg: 'bg-slate-100',
      textTitle: 'text-slate-900 font-bold',
      textSubtitle: 'text-slate-600',
      textMuted: 'text-slate-500',
      border: 'border-slate-200',
      accentHex: '#2563EB',
      accentText: 'text-blue-600',
      accentBg: 'bg-blue-500/10',
      accentBorder: 'border-blue-500/30',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs',
      bannerBg: 'bg-slate-900 text-white border border-slate-800'
    },
    dark: {
      canvasBg: 'bg-[#0B1120]',
      cardBg: 'bg-[#111C33]',
      cardAltBg: 'bg-[#1A2847]',
      textTitle: 'text-white font-bold',
      textSubtitle: 'text-slate-300',
      textMuted: 'text-slate-400',
      border: 'border-slate-800',
      accentHex: '#38BDF8',
      accentText: 'text-sky-400',
      accentBg: 'bg-sky-500/15',
      accentBorder: 'border-sky-500/30',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md',
      bannerBg: 'bg-[#13203B] text-white border border-blue-900/60'
    }
  },

  bold_creative: {
    id: 'bold_creative',
    name: 'Bold Creative & Startup',
    badge: 'Tubik / Dribbble',
    inspiration: 'Streetwear, Sneakers, Agencias, Eventos, Creadores & Apps',
    fontTitle: 'font-syne font-black tracking-tight',
    fontBody: 'font-sans',
    fontTag: 'Syne 800 Ultra',
    fontSample: 'BREAK ALL RULES',
    sampleLetter: 'Aa',
    wrapperRounded: 'rounded-3xl',
    cardRounded: 'rounded-2xl',
    buttonRounded: 'rounded-full',
    badgeRounded: 'rounded-2xl',
    borderClass: 'border-2',
    shadowClass: 'shadow-lg hover:shadow-xl',
    heroTag: '🔥 DROP EXCLUSIVO & EXPERIENCIA VIBRANTE',
    light: {
      canvasBg: 'bg-[#FFFBF7]',
      cardBg: 'bg-white',
      cardAltBg: 'bg-orange-50',
      textTitle: 'text-slate-950 font-syne font-black',
      textSubtitle: 'text-slate-700 font-medium',
      textMuted: 'text-slate-500',
      border: 'border-orange-200/80',
      accentHex: '#FF5722',
      accentText: 'text-[#FF5722]',
      accentBg: 'bg-[#FF5722]/15',
      accentBorder: 'border-[#FF5722]/40',
      buttonPrimary: 'bg-[#FF5722] hover:bg-[#E64A19] text-white font-syne font-black text-xs shadow-lg shadow-orange-500/25 px-5',
      bannerBg: 'bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFA726] text-white border-0 shadow-lg'
    },
    dark: {
      canvasBg: 'bg-[#121019]',
      cardBg: 'bg-[#1C1827]',
      cardAltBg: 'bg-[#282238]',
      textTitle: 'text-white font-syne font-black',
      textSubtitle: 'text-purple-200',
      textMuted: 'text-purple-300/70',
      border: 'border-purple-900/50',
      accentHex: '#FF6B00',
      accentText: 'text-[#FF7A00]',
      accentBg: 'bg-[#FF6B00]/20',
      accentBorder: 'border-[#FF6B00]/40',
      buttonPrimary: 'bg-[#FF6B00] hover:bg-[#FF8500] text-black font-syne font-black text-xs shadow-lg px-5',
      bannerBg: 'bg-gradient-to-r from-[#2B1B47] to-[#1F1333] border border-purple-500/30 text-white'
    }
  },

  neo_brutalist: {
    id: 'neo_brutalist',
    name: 'Neo-Brutalismo Pop',
    badge: 'Gumroad / Figma',
    inspiration: 'Indie Hackers, Merch, Creadores, Apps Gen-Z & Cultura Pop',
    fontTitle: 'font-grotesk font-black tracking-tight',
    fontBody: 'font-grotesk',
    fontTag: 'Space Grotesk',
    fontSample: 'RAW POP RETRO ★',
    sampleLetter: '★!',
    wrapperRounded: 'rounded-2xl',
    cardRounded: 'rounded-xl',
    buttonRounded: 'rounded-xl',
    badgeRounded: 'rounded-lg',
    borderClass: 'border-2 border-black dark:border-white',
    shadowClass: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all',
    heroTag: '👾 NEO-BRUTALISM: HARD SHADOWS & PURE POP',
    light: {
      canvasBg: 'bg-[#FFFBEB]',
      cardBg: 'bg-[#FFFFFF]',
      cardAltBg: 'bg-[#FEF08A]',
      textTitle: 'text-black font-grotesk font-black',
      textSubtitle: 'text-slate-800 font-bold',
      textMuted: 'text-slate-700',
      border: 'border-2 border-black',
      accentHex: '#FFE600',
      accentText: 'text-black',
      accentBg: 'bg-[#FFE600]',
      accentBorder: 'border-2 border-black',
      buttonPrimary: 'bg-[#FFE600] hover:bg-[#FACC15] text-black font-grotesk font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
      bannerBg: 'bg-[#A3E635] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000]'
    },
    dark: {
      canvasBg: 'bg-[#0F172A]',
      cardBg: 'bg-[#1E293B]',
      cardAltBg: 'bg-[#334155]',
      textTitle: 'text-white font-grotesk font-black',
      textSubtitle: 'text-amber-200 font-bold',
      textMuted: 'text-slate-300',
      border: 'border-2 border-white/90',
      accentHex: '#FACC15',
      accentText: 'text-amber-300',
      accentBg: 'bg-amber-400/20',
      accentBorder: 'border-2 border-white',
      buttonPrimary: 'bg-[#FACC15] hover:bg-[#EAB308] text-black font-grotesk font-black text-xs border-2 border-white shadow-[3px_3px_0px_0px_#fff]',
      bannerBg: 'bg-[#6366F1] text-white border-2 border-white shadow-[4px_4px_0px_0px_#fff]'
    }
  },

  cyber_tech: {
    id: 'cyber_tech',
    name: 'Cyber Tech & Terminal',
    badge: 'QClay / Web3',
    inspiration: 'Infraestructura TI, Hardware, Ciberseguridad, Hosting & Consolas',
    fontTitle: 'font-mono font-bold tracking-normal',
    fontBody: 'font-mono',
    fontTag: 'JetBrains Mono',
    fontSample: '> SYS_ONLINE [100%]',
    sampleLetter: '01',
    wrapperRounded: 'rounded-lg',
    cardRounded: 'rounded-md',
    buttonRounded: 'rounded-xs',
    badgeRounded: 'rounded-none',
    borderClass: 'border',
    shadowClass: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
    heroTag: '⚡ FULLSTACK ENGINE: PHP 8.3 + MYSQL 8',
    light: {
      canvasBg: 'bg-[#EDF2F7]',
      cardBg: 'bg-[#F8FAFC]',
      cardAltBg: 'bg-[#E2E8F0]',
      textTitle: 'text-slate-950 font-mono font-bold',
      textSubtitle: 'text-slate-700 font-mono',
      textMuted: 'text-slate-500 font-mono',
      border: 'border-cyan-600/30',
      accentHex: '#0891B2',
      accentText: 'text-cyan-700',
      accentBg: 'bg-cyan-500/15',
      accentBorder: 'border-cyan-500/40',
      buttonPrimary: 'bg-cyan-700 hover:bg-cyan-600 text-white font-mono font-bold text-xs shadow-sm',
      bannerBg: 'bg-slate-900 border border-cyan-500/60 text-cyan-300 font-mono'
    },
    dark: {
      canvasBg: 'bg-[#04060A]',
      cardBg: 'bg-[#090E17]',
      cardAltBg: 'bg-[#101929]',
      textTitle: 'text-cyan-300 font-mono font-bold',
      textSubtitle: 'text-slate-300 font-mono',
      textMuted: 'text-slate-400 font-mono',
      border: 'border-cyan-500/40',
      accentHex: '#00F5D4',
      accentText: 'text-[#00F5D4]',
      accentBg: 'bg-[#00F5D4]/15',
      accentBorder: 'border-[#00F5D4]/40',
      buttonPrimary: 'bg-[#00F5D4] hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,245,212,0.4)]',
      bannerBg: 'bg-black border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.2)] text-white font-mono'
    }
  },

  warm_organic: {
    id: 'warm_organic',
    name: 'Bienestar & Orgánico Cálido',
    badge: 'Calm / Notion',
    inspiration: 'Nutrición, Psicología, Spas, Cafeterías Artesanales, Productos Orgánicos',
    fontTitle: 'font-outfit font-bold tracking-normal',
    fontBody: 'font-sans',
    fontTag: 'Outfit Humanist',
    fontSample: 'Equilibrio & Armonía',
    sampleLetter: 'Aa',
    wrapperRounded: 'rounded-3xl',
    cardRounded: 'rounded-2xl',
    buttonRounded: 'rounded-2xl',
    badgeRounded: 'rounded-full',
    borderClass: 'border',
    shadowClass: 'shadow-xs hover:shadow-md',
    heroTag: '🌿 VIDA SANA & EQUILIBRIO CONSCIENTE',
    light: {
      canvasBg: 'bg-[#F5F2EB]',
      cardBg: 'bg-[#FAF8F5]',
      cardAltBg: 'bg-[#EAE5DA]',
      textTitle: 'text-[#2B3A2C] font-outfit font-bold',
      textSubtitle: 'text-[#4A5D4C]',
      textMuted: 'text-[#7A8A7C]',
      border: 'border-[#DDD7CC]',
      accentHex: '#3A6351',
      accentText: 'text-[#2D5442]',
      accentBg: 'bg-[#3A6351]/15',
      accentBorder: 'border-[#3A6351]/40',
      buttonPrimary: 'bg-[#3A6351] hover:bg-[#2A4B39] text-white font-outfit font-bold text-xs shadow-sm',
      bannerBg: 'bg-[#EAE5DA] border border-[#DDD7CC] text-[#2B3A2C]'
    },
    dark: {
      canvasBg: 'bg-[#171614]',
      cardBg: 'bg-[#22211E]',
      cardAltBg: 'bg-[#2D2B27]',
      textTitle: 'text-[#EDE8DF] font-outfit font-bold',
      textSubtitle: 'text-[#C9C2B7]',
      textMuted: 'text-[#968F83]',
      border: 'border-[#373530]',
      accentHex: '#689F84',
      accentText: 'text-[#81B89E]',
      accentBg: 'bg-[#689F84]/15',
      accentBorder: 'border-[#689F84]/40',
      buttonPrimary: 'bg-[#3A6351] hover:bg-[#4E7E68] text-white font-outfit font-bold text-xs',
      bannerBg: 'bg-[#22201D] border border-[#3C3933] text-[#EDE8DF]'
    }
  }
};

export interface WebsiteMockupPreviewProps {
  projectName?: string;
  selectedDemo: MockupDemoType;
  onSelectDemo?: (demo: MockupDemoType) => void;
  designStyle?: DesignStyleType;
  onSelectDesignStyle?: (style: DesignStyleType) => void;
  services: Record<string, boolean>;
  themeColor: 'cyan' | 'emerald' | 'violet' | 'amber' | 'blue' | 'rose';
  onChangeThemeColor: (color: 'cyan' | 'emerald' | 'violet' | 'amber' | 'blue' | 'rose') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const THEME_COLOR_MAP: Record<
  'cyan' | 'emerald' | 'violet' | 'amber' | 'blue' | 'rose',
  {
    name: string;
    primaryHex: string;
    bgAccent: string;
    borderAccent: string;
    textAccent: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    ringColor: string;
    glowShadow: string;
  }
> = {
  cyan: {
    name: 'Cyan Tecnológico',
    primaryHex: '#06b6d4',
    bgAccent: 'bg-cyan-500/15',
    borderAccent: 'border-cyan-500/40',
    textAccent: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/80',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    buttonBg: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold',
    ringColor: 'ring-cyan-500',
    glowShadow: 'shadow-[0_0_20px_rgba(6,182,212,0.35)]'
  },
  emerald: {
    name: 'Esmeralda Neón',
    primaryHex: '#10b981',
    bgAccent: 'bg-emerald-500/15',
    borderAccent: 'border-emerald-500/40',
    textAccent: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    buttonBg: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold',
    ringColor: 'ring-emerald-500',
    glowShadow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]'
  },
  violet: {
    name: 'Violeta Cyber',
    primaryHex: '#8b5cf6',
    bgAccent: 'bg-violet-500/15',
    borderAccent: 'border-violet-500/40',
    textAccent: 'text-violet-600 dark:text-violet-400',
    badgeBg: 'bg-violet-100 dark:bg-violet-950/80',
    badgeText: 'text-violet-800 dark:text-violet-300',
    buttonBg: 'bg-violet-500 hover:bg-violet-400 text-white font-bold',
    ringColor: 'ring-violet-500',
    glowShadow: 'shadow-[0_0_20px_rgba(139,92,246,0.35)]'
  },
  amber: {
    name: 'Ámbar Gold',
    primaryHex: '#f59e0b',
    bgAccent: 'bg-amber-500/15',
    borderAccent: 'border-amber-500/40',
    textAccent: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/80',
    badgeText: 'text-amber-800 dark:text-amber-300',
    buttonBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
    ringColor: 'ring-amber-500',
    glowShadow: 'shadow-[0_0_20px_rgba(245,158,11,0.35)]'
  },
  blue: {
    name: 'Azul Corporativo',
    primaryHex: '#3b82f6',
    bgAccent: 'bg-blue-500/15',
    borderAccent: 'border-blue-500/40',
    textAccent: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/80',
    badgeText: 'text-blue-800 dark:text-blue-300',
    buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white font-bold',
    ringColor: 'ring-blue-500',
    glowShadow: 'shadow-[0_0_20px_rgba(59,130,246,0.35)]'
  },
  rose: {
    name: 'Rosa Carmín',
    primaryHex: '#f43f5e',
    bgAccent: 'bg-rose-500/15',
    borderAccent: 'border-rose-500/40',
    textAccent: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/80',
    badgeText: 'text-rose-800 dark:text-rose-300',
    buttonBg: 'bg-rose-500 hover:bg-rose-400 text-white font-bold',
    ringColor: 'ring-rose-500',
    glowShadow: 'shadow-[0_0_20px_rgba(244,63,94,0.35)]'
  }
};

interface CartProductItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  sku: string;
}

export const WebsiteMockupPreview: React.FC<WebsiteMockupPreviewProps> = ({
  projectName,
  selectedDemo,
  onSelectDemo,
  designStyle = 'moderno',
  onSelectDesignStyle,
  services,
  themeColor,
  onChangeThemeColor,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  
  // Estados de interactividad real en la maqueta
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState<string | null>(null);
  const [showAlertToast, setShowAlertToast] = useState(true);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(14);
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  
  // Ordenamiento interactivo de columnas en DataTables
  const [sortField, setSortField] = useState<'sku' | 'name' | 'stock'>('stock');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Navegación interna dentro del SaaS / ERP (Sidebar)
  const [saasActiveNav, setSaasActiveNav] = useState<'dashboard' | 'stock' | 'movimientos' | 'reportes'>('dashboard');

  // Carrito interactivo real (Drawer)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponInput, setCouponInput] = useState<string>('');

  const [cartItems, setCartItems] = useState<CartProductItem[]>([
    { id: 1, name: 'Laptop Workstation i7 32GB', price: 24890, quantity: 1, sku: 'LPT-2024' },
    { id: 2, name: 'Monitor Gamer 27" 165Hz IPS', price: 4950, quantity: 1, sku: 'MON-165' }
  ]);

  // Modal de Detalle de Producto
  const [viewProductModal, setViewProductModal] = useState<any | null>(null);

  // Flujo de citas paso a paso (Wizard)
  const [appointmentStep, setAppointmentStep] = useState<1 | 2 | 3>(1);
  const [appointmentService, setAppointmentService] = useState('Consulta Especialista');
  const [appointmentTime, setAppointmentTime] = useState('11:30 AM');
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  // Contador de cuenta regresiva para estilo Retail
  const [countdown, setCountdown] = useState({ hours: 3, minutes: 28, seconds: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentTheme = THEME_COLOR_MAP[themeColor] || THEME_COLOR_MAP.cyan;

  const urlSlug = useMemo(() => {
    const raw = projectName?.trim() || 'mi-sitio-inversa';
    return raw
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'mi-sitio-web';
  }, [projectName]);

  // Total de artículos en carrito
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Total en MXN con descuento si aplica
  const cartSubtotal = useMemo(() => {
    const base = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return Math.max(0, base - couponDiscount);
  }, [cartItems, couponDiscount]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'INVERSA2024') {
      setAppliedCoupon('INVERSA2024');
      setCouponDiscount(500);
    } else {
      alert('Cupón no válido. Prueba usando: INVERSA2024');
    }
  };

  const handleAddToCart = (product: { id: number; name: string; price: number; sku: string }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartDrawerOpen(true);
  };

  const handleUpdateCartQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartProductItem[]
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setShowAlertToast(true);
    }, 600);
  };

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(`https://inversa-dev.com/${urlSlug}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleChatOption = (option: string) => {
    if (option === 'horarios') {
      setChatMessage('🕒 Horario de atención: Lunes a Viernes de 9:00 AM a 7:00 PM y Sábados de 10:00 AM a 2:00 PM.');
    } else if (option === 'servicios') {
      setChatMessage('🛠️ Desarrollamos sistemas con PHP 8.3, MySQL, Bootstrap, catálogos en línea y módulos a la medida.');
    } else if (option === 'precios') {
      setChatMessage('💰 Cotizaciones transparentes sin rentas forzosas. Solicita la tuya por WhatsApp.');
    } else if (option === 'asesor') {
      setChatMessage('📱 ¡Con gusto! Un especialista técnico te atenderá directamente por WhatsApp.');
    }
  };

  const normalizedStyle = normalizeDesignStyle(designStyle);
  const styleConfig = DESIGN_STYLES_MAP[normalizedStyle];
  const styleTheme = isDarkMode ? styleConfig.dark : styleConfig.light;

  const styleDecorations = useMemo(() => {
    return {
      wrapperRounded: styleConfig.wrapperRounded,
      cardRounded: styleConfig.cardRounded,
      badgeShape: styleConfig.badgeRounded,
      buttonRounded: styleConfig.buttonRounded,
      fontTitle: styleConfig.fontTitle,
      fontBody: styleConfig.fontBody,
      shadowStyle: styleConfig.shadowClass,
      bannerBg: styleTheme.bannerBg,
      heroTag: styleConfig.heroTag,
      buttonPrimary: styleTheme.buttonPrimary
    };
  }, [styleConfig, styleTheme]);

  // Colores de Modo Día / Noche basados en la identidad visual del estilo seleccionado
  const themeClasses = useMemo(() => {
    return {
      browserFrameBg: isDarkMode ? 'bg-[#0f172a] border-[#1e293b]' : 'bg-slate-200 border-slate-300',
      browserBarBg: isDarkMode ? 'bg-[#080c14] border-[#1e293b] text-slate-200' : 'bg-white border-slate-300 text-slate-800 shadow-xs',
      subBarBg: isDarkMode ? 'bg-[#0b1324] border-[#1e293b]' : 'bg-slate-100 border-slate-300',
      previewContainerBg: isDarkMode ? 'bg-[#050811]' : 'bg-slate-300/60',
      siteBg: `${styleTheme.canvasBg} ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} ${styleTheme.border}`,
      headerBg: `${styleTheme.cardBg} ${styleTheme.border}`,
      cardBg: `${styleTheme.cardBg} ${styleTheme.border}`,
      cardAltBg: `${styleTheme.cardAltBg} ${styleTheme.border}`,
      textTitle: styleTheme.textTitle,
      textSubtitle: styleTheme.textSubtitle,
      textMuted: styleTheme.textMuted,
      tableHeaderBg: isDarkMode ? 'bg-black/30 border-slate-800' : 'bg-black/5 border-slate-300 font-bold',
      tableRowHover: isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5',
      tableBorder: styleTheme.border,
      inputBg: `${styleTheme.cardBg} ${styleTheme.border} ${isDarkMode ? 'text-white' : 'text-slate-900'}`,
      footerBarBg: isDarkMode ? 'bg-black/40 border-t border-slate-800' : 'bg-black/5 border-t border-slate-300'
    };
  }, [isDarkMode, styleTheme]);

  // Datos ordenables para el inventario / almacén adaptados al estilo
  const inventoryData = useMemo(() => {
    let raw: Array<{ sku: string; name: string; loc: string; stock: number; status: string; color: string }>;

    switch (normalizedStyle) {
      case 'boutique':
        raw = [
          { sku: 'CAV-2018', name: 'Vino Tinto Gran Reserva Vega 2018', loc: 'Cava Privada Bóveda A-01', stock: 18, status: 'Reserva Especial', color: 'emerald' },
          { sku: 'CAV-1995', name: 'Champagne Dom Pérignon Vintage 2012', loc: 'Cava Fría B-04', stock: 3, status: 'Stock Crítico', color: 'rose' },
          { sku: 'JOY-7740', name: 'Estuche de Terciopelo para Joyería', loc: 'Atelier Central C-02', stock: 65, status: 'Normal', color: 'emerald' },
          { sku: 'PRF-9021', name: 'Frasco Cristal Francés 100ml Edición Oro', loc: 'Almacén Perfumería D-01', stock: 42, status: 'Normal', color: 'emerald' }
        ];
        break;
      case 'bold_creative':
        raw = [
          { sku: 'SNK-001', name: 'Sneakers Cyber Runner v2 Reflective', loc: 'Bodega Drop Norte A-10', stock: 14, status: 'Últimas Piezas', color: 'rose' },
          { sku: 'HOD-990', name: 'Heavyweight Hoodie Washed Black XL', loc: 'Almacén Textil B-03', stock: 85, status: 'Disponible', color: 'emerald' },
          { sku: 'CAP-440', name: 'Gorra Dad Cap Bordado Neón', loc: 'Estante Accesorios C-08', stock: 120, status: 'Normal', color: 'emerald' },
          { sku: 'GLS-112', name: 'Gafas de Sol Shield Cyberpunk', loc: 'Bodega Drop Central D-02', stock: 32, status: 'Disponible', color: 'emerald' }
        ];
        break;
      case 'cyber_tech':
        raw = [
          { sku: 'SRV-8840', name: 'Blade Server Dell PowerEdge 2x Xeon 128GB', loc: 'Rack Datacenter DC-1 #04', stock: 8, status: 'Node Active', color: 'emerald' },
          { sku: 'NVME-400', name: 'SSD U.2 Enterprise 7.68TB NVMe Gen4', loc: 'Gabinete Repuestos #12', stock: 2, status: 'Low Buffer', color: 'rose' },
          { sku: 'SFP-100G', name: 'Transceiver Óptico SFP28 100Gbps Cisco', loc: 'Caja Fibra Óptica #03', stock: 24, status: 'Normal', color: 'emerald' },
          { sku: 'PDU-30A', name: 'Regleta PDU Monitoreada 30A Zero U', loc: 'Almacén Infraestructura #07', stock: 15, status: 'Normal', color: 'emerald' }
        ];
        break;
      case 'warm_organic':
        raw = [
          { sku: 'BIO-101', name: 'Lote Miel de Abeja Melipona Silvestre 1kg', loc: 'Almacén Huerto Seco A-02', stock: 36, status: 'Cosecha Fresca', color: 'emerald' },
          { sku: 'TEA-880', name: 'Sacos de Matcha Orgánico Ceremonial 25kg', loc: 'Cámara Fresca B-01', stock: 4, status: 'Reabastecer', color: 'rose' },
          { sku: 'OIL-552', name: 'Aceite de Jojoba Prensado en Frío 5L', loc: 'Laboratorio Botánico C-04', stock: 19, status: 'Normal', color: 'emerald' },
          { sku: 'CER-330', name: 'Tazas Artesanales Cerámica Gres Terracota', loc: 'Alfarería Embalaje D-05', stock: 74, status: 'Normal', color: 'emerald' }
        ];
        break;
      case 'neo_brutalist':
        raw = [
          { sku: 'ARC-001', name: 'Consola Retro Pixel 64-Bit Candy Edition', loc: 'Estante Indie Pop A-03', stock: 12, status: 'Top Seller ★', color: 'emerald' },
          { sku: 'VNL-770', name: 'Vinilo Synthwave Neon Sun 180g Gatefold', loc: 'Caja Discos B-01', stock: 5, status: 'Últimas Copias', color: 'rose' },
          { sku: 'KBD-900', name: 'Teclado Mecánico Pop 60% Switches Banana', loc: 'Almacén Periféricos C-05', stock: 28, status: 'Disponible', color: 'emerald' },
          { sku: 'STK-555', name: 'Paquete 50 Stickers Holográficos Indie Dev', loc: 'Gaveta Merch D-02', stock: 140, status: 'Stock Alto', color: 'emerald' }
        ];
        break;
      default: // saas_clean
        raw = [
          { sku: 'INV-1014', name: 'Disco SSD NVMe 1TB Kingston', loc: 'Almacén Central A-04', stock: 42, status: 'Normal', color: 'emerald' },
          { sku: 'INV-2091', name: 'Fuente de Poder 750W Gold', loc: 'Almacén Norte B-12', stock: 4, status: 'Stock Bajo', color: 'rose' },
          { sku: 'INV-3055', name: 'Gabinete Torre ATX Vidrio', loc: 'Almacén Central C-01', stock: 19, status: 'Normal', color: 'emerald' },
          { sku: 'INV-4412', name: 'Pasta Térmica Alta Conductividad', loc: 'Almacén Sur D-08', stock: 85, status: 'Normal', color: 'emerald' }
        ];
        break;
    }

    let filtered = raw.filter((i) =>
      !tableSearchQuery ||
      i.name.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      i.sku.toLowerCase().includes(tableSearchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortField === 'stock') {
        return sortAsc ? a.stock - b.stock : b.stock - a.stock;
      }
      return sortAsc ? a[sortField].localeCompare(b[sortField]) : b[sortField].localeCompare(a[sortField]);
    });

    return filtered;
  }, [normalizedStyle, tableSearchQuery, sortField, sortAsc]);

  // Catálogo de productos adaptado a la personalidad visual
  const catalogProducts = useMemo(() => {
    switch (normalizedStyle) {
      case 'boutique':
        return [
          { id: 1, name: 'Reloj Cronógrafo Oro Rosa 18K', price: 42500, original: 49000, rating: 5.0, reviews: 28, sku: 'RLX-GOLD', tag: 'Pieza Exclusiva', cat: 'Alta Relojería' },
          { id: 2, name: 'Anillo Solitario Diamante Certificado', price: 28900, original: 34000, rating: 4.9, reviews: 41, sku: 'JWL-DIA', tag: 'Colección Privada', cat: 'Joyería Fina' },
          { id: 3, name: 'Bolso Piel Italiana Edición Limitada', price: 14200, original: 16800, rating: 5.0, reviews: 19, sku: 'BAG-ITL', tag: 'Hecho a Mano', cat: 'Accesorios' },
          { id: 4, name: 'Perfume de Autor Esencia Ambarina 100ml', price: 3800, original: 4500, rating: 4.8, reviews: 33, sku: 'PRF-AMB', tag: 'Extracto Puro', cat: 'Fragancias' }
        ];
      case 'bold_creative':
        return [
          { id: 1, name: 'Sneakers Cyber Runner Limited Edition', price: 4890, original: 6200, rating: 4.9, reviews: 88, sku: 'SNK-CYBER', tag: 'DROP FLASH 🔥', cat: 'Footwear' },
          { id: 2, name: 'Hoodie Oversized Acid Wash Heavyweight', price: 1650, original: 2200, rating: 4.8, reviews: 64, sku: 'HOD-ACID', tag: 'TRENDING ⚡', cat: 'Streetwear' },
          { id: 3, name: 'Gafas de Sol Futuristas Polarizadas', price: 1290, original: 1800, rating: 4.7, reviews: 29, sku: 'GLS-FUTR', tag: 'HOT 50% OFF', cat: 'Eyewear' },
          { id: 4, name: 'Mochila Táctica Reflectiva 30L', price: 1850, original: 2400, rating: 4.9, reviews: 45, sku: 'BPK-TACT', tag: 'EDICIÓN 2024', cat: 'Gear' }
        ];
      case 'cyber_tech':
        return [
          { id: 1, name: 'Procesador Intel Core i9 14900K 6.0GHz', price: 12490, original: 14200, rating: 4.9, reviews: 47, sku: 'CPU-14900K', tag: '[OVERCLOCK_OK]', cat: 'Procesadores' },
          { id: 2, name: 'GPU NVIDIA RTX 4080 Super 16GB GDDR6X', price: 24800, original: 28500, rating: 5.0, reviews: 76, sku: 'GPU-4080S', tag: '[RAYTRACING_ON]', cat: 'Gráficas' },
          { id: 3, name: 'Memoria RAM DDR5 64GB 6000MHz RGB', price: 4290, original: 4990, rating: 4.8, reviews: 31, sku: 'RAM-DDR5-64', tag: '[LOW_LATENCY]', cat: 'Memorias' },
          { id: 4, name: 'SSD NVMe PCIe 5.0 2TB 12400MB/s Gen5', price: 5100, original: 5900, rating: 4.9, reviews: 52, sku: 'SSD-GEN5-2T', tag: '[BLAZING_FAST]', cat: 'Almacenamiento' }
        ];
      case 'warm_organic':
        return [
          { id: 1, name: 'Aceite Esencial Lavanda Silvestre Bio 50ml', price: 490, original: 650, rating: 5.0, reviews: 58, sku: 'OIL-LAV-BIO', tag: '100% Orgánico 🌿', cat: 'Aromaterapia' },
          { id: 2, name: 'Set Difusor Cerámica Hecho a Mano', price: 1250, original: 1590, rating: 4.9, reviews: 34, sku: 'DIF-CERAM', tag: 'Artesanal', cat: 'Hogar Confort' },
          { id: 3, name: 'Infusión Té Matcha Grado Ceremonial Uji', price: 680, original: 850, rating: 5.0, reviews: 42, sku: 'TEA-MATCHA', tag: 'Cosecha Primavera', cat: 'Superfoods' },
          { id: 4, name: 'Vela Botánica Cera de Soya & Romero', price: 380, original: 490, rating: 4.8, reviews: 61, sku: 'VEL-SOYA', tag: 'Ecológica', cat: 'Velas Botánicas' }
        ];
      case 'neo_brutalist':
        return [
          { id: 1, name: 'Arcade Portátil Retro 64-Bit Candy Edition', price: 2350, original: 2990, rating: 5.0, reviews: 112, sku: 'ARC-RETRO', tag: '★ RAW POP', cat: 'Gaming' },
          { id: 2, name: 'Vinilo Synthwave Neon Sun 180g Gatefold', price: 950, original: 1200, rating: 4.9, reviews: 78, sku: 'VNL-SYNTH', tag: 'HOT DEAL 🔥', cat: 'Música' },
          { id: 3, name: 'Teclado Mecánico Pop 60% Switches Banana', price: 1890, original: 2450, rating: 4.8, reviews: 45, sku: 'KBD-CUSTOM', tag: '👾 INDIE CODE', cat: 'Hardware' },
          { id: 4, name: 'Pack de Stickers Holográficos 50pcs Indie Dev', price: 280, original: 380, rating: 5.0, reviews: 190, sku: 'STK-PACK', tag: '100% VINIL', cat: 'Merch' }
        ];
      default: // saas_clean
        return [
          { id: 1, name: 'Laptop Workstation i7 32GB RAM SSD 1TB', price: 24890, original: 29990, rating: 4.9, reviews: 34, sku: 'LPT-2024', tag: 'Empresarial', cat: 'Laptops' },
          { id: 2, name: 'Monitor Profesional 27" 165Hz IPS QHD', price: 4950, original: 5800, rating: 4.8, reviews: 52, sku: 'MON-165', tag: 'Más Vendido', cat: 'Monitores' },
          { id: 3, name: 'Teclado Mecánico Ergonómico Red Switch', price: 1390, original: 1800, rating: 5.0, reviews: 18, sku: 'KB-RGB', tag: 'Garantía 2 Años', cat: 'Periféricos' },
          { id: 4, name: 'Mouse Inalámbrico Precisión 8000 DPI', price: 680, original: 890, rating: 4.7, reviews: 29, sku: 'MSE-90', tag: 'B2B Ready', cat: 'Accesorios' }
        ];
    }
  }, [normalizedStyle]);

  // Concepto gastronómico adaptado al estilo
  const restaurantData = useMemo(() => {
    switch (normalizedStyle) {
      case 'boutique':
        return {
          conceptName: 'Bistró de Autor & Cava Privada',
          conceptTag: '✨ MENÚ DEGUSTACIÓN DE TEMPORADA',
          chefNote: 'Chef Ejecutivo: Antoine Laurent • Maridaje sugerido por Sommelier',
          table: 'Mesa 02 (Salón Privado)',
          items: [
            { platillo: 'Risotto de Trufa Negra & Hongos Silvestres', precio: 420, desc: 'Arroz arborio mantecado con queso parmesano reggiano de 24 meses y láminas de trufa fresca.' },
            { platillo: 'Corte Wagyu Japonés A5 350g al Carbón', precio: 1250, desc: 'Sellado al carbón binchotan con sal marina en escamas y puré de chirivía trufada.' },
            { platillo: 'Tartar de Atún Aleta Azul con Emulsión Yuzu', precio: 380, desc: 'Pesca sostenible de ensenada, emulsión cítrica de yuzu, sésamo negro y wonton crujiente.' }
          ]
        };
      case 'bold_creative':
        return {
          conceptName: 'Smash Burgers, Wings & Craft Beer',
          conceptTag: '🔥 COMIDA URBANA GOURMET & VIBRA 100%',
          chefNote: '100% Carne Angus Fresca Smash • Cervezas artesanales de barril',
          table: 'Mesa 04 (Terraza)',
          items: [
            { platillo: 'Monster Double Bacon Smash Burger', precio: 210, desc: 'Doble patty smash de res, doble queso cheddar derretido, tocino crujiente y salsa secreta.' },
            { platillo: 'Loaded Curly Fries con Queso Fundido & Pulled Pork', precio: 140, desc: 'Papas rizadas crujientes bañadas en queso cheddar, pulled pork y jalapeños tatemados.' },
            { platillo: 'Alitas Buffalo Spicy Glaze 12 pzas', precio: 190, desc: 'Alitas extra doradas glaseadas en salsa buffalo casera con aderezo blue cheese.' }
          ]
        };
      case 'cyber_tech':
        return {
          conceptName: 'Cyber Ramen Bar & Synth Lounge',
          conceptTag: '> [NIGHT_CITY_FOOD_STATION_v4]',
          chefNote: '> KITCHEN_ENGINE: TEMPERATURE_98C [BROTH_SIMMERED_18H]',
          table: 'Terminal Node #04',
          items: [
            { platillo: 'Mega Chashu Tonkotsu Ramen [Spicy 3]', precio: 230, desc: 'Caldo de cerdo espeso 18 hrs, fideos frescos artesanales, panceta chashu y huevo nitamago.' },
            { platillo: 'Gyoza Crispy al Vapor con Soja 8 pzas', precio: 130, desc: 'Empanaditas japonesas rellenas de carne y col china con base dorada crujiente.' },
            { platillo: 'Bebida Synthwave Electric Blue Neon', precio: 120, desc: 'Mixología con gin infusionado con flor de guisante, tónica y borde luminiscente.' }
          ]
        };
      case 'warm_organic':
        return {
          conceptName: 'Café de Especialidad & Panadería Madre',
          conceptTag: '🌿 INGREDIENTES LOCALES & HUERTO ORGÁNICO',
          chefNote: 'Café de altura cosechado a mano • Panes fermentados 36 horas',
          table: 'Mesa 03 (Jardín Botánico)',
          items: [
            { platillo: 'Tostada de Aguacate & Huevo Poché Bio', precio: 180, desc: 'Pan campesino de masa madre, aguacate hass macerado, semillas de cáñamo y brotes frescos.' },
            { platillo: 'Bowl Açai Amazónico con Frutos Rojos', precio: 160, desc: 'Base de pulpa de açai orgánico, granola casera de avena y nuez, plátano y miel pura de abeja.' },
            { platillo: 'Sandwich de Queso Brie y Manzana Asada', precio: 195, desc: 'Hogaza tostada con queso brie artesanal, láminas de manzana caramelizada y arúgula fresca.' }
          ]
        };
      case 'neo_brutalist':
        return {
          conceptName: 'Pop Pizza & Soda Arcade Club',
          conceptTag: '👾 PIZZA DE MASA MADRE & BEBIDAS CRAFT',
          chefNote: '★ Harina Italiana Caputo • Queso Fior di Latte • Horno de Leña a 450°C',
          table: 'Mesa Pixel #07',
          items: [
            { platillo: 'Pizza Detroit Style Pepperoni & Miel Picante', precio: 220, desc: 'Masa gruesa y crujiente en molde de acero, orillas caramelizadas con queso cheddar y miel hot honey.' },
            { platillo: 'Mac & Cheese Frito con Trufa & Polvo Dorito', precio: 150, desc: 'Bocados crujientes de macarrones con 4 quesos, emulsión de trufa y empanizado crujiente pop.' },
            { platillo: 'Batido Malteada Cereza & Galleta Lotus Biscoff', precio: 110, desc: 'Helado artesanal de vainilla de Papantla, galleta belga triturada y crema batida.' }
          ]
        };
      default: // saas_clean
        return {
          conceptName: 'Restaurante Central & Salón Ejecutivo',
          conceptTag: '🍽️ COCINA CONTEMPORÁNEA & FACTURACIÓN RÁPIDA',
          chefNote: 'Ideal para comidas de negocios, eventos y servicio rápido con comanda digital',
          table: 'Mesa 04 (Salón Principal)',
          items: [
            { platillo: 'Menú Ejecutivo Gourmet 3 Tiempos', precio: 240, desc: 'Entrada del día, plato fuerte a elegir y postre ligero con bebida incluida.' },
            { platillo: 'Salmón Noruego a la Plancha con Espárragos', precio: 360, desc: 'Filete de salmón fresco con costra de finas hierbas y verduras al vapor.' },
            { platillo: 'Ensalada César Tradicional con Pollo Grill', precio: 180, desc: 'Lechuga romana crujiente, pechuga a la parrilla, crutones de ajo y aderezo césar.' }
          ]
        };
    }
  }, [normalizedStyle]);

  // Datos de portal de citas adaptados al estilo
  const appointmentData = useMemo(() => {
    switch (normalizedStyle) {
      case 'boutique':
        return {
          clinicName: 'Clínica Dermatológica & Atelier Estético',
          specialistName: 'Dra. Elena Valenzuela',
          specialistRole: 'Médico Cirujano • Estética Facial & Anti-Aging • Céd. 928174',
          rating: '5.0 (240 Pacientes Privados)',
          badge: 'Certificación Internacional',
          location: 'Torre Médica Lomas • Piso 14 Suite Privada',
          serviceName: 'Consulta de Valoración Facial de Autor',
          cost: 1500
        };
      case 'bold_creative':
        return {
          clinicName: 'Performance Athletic Club & Coaching',
          specialistName: 'Coach Marcus Vance',
          specialistRole: 'Head Coach • Fuerza, Hipertrofia & Rendimiento Deportivo',
          rating: '4.9 (410 Atletas Entrenados)',
          badge: 'Top Trainer 2024 🔥',
          location: 'Performance Hub • Estudio 01',
          serviceName: 'Evaluación Biomecánica & Plan de Alto Rendimiento',
          cost: 950
        };
      case 'cyber_tech':
        return {
          clinicName: 'Centro de Operaciones TI & DevOps On-Call',
          specialistName: 'Ing. Roberto S. DevOps Lead',
          specialistRole: 'Cloud Architect • MySQL & Infraestructura Linux • Cert. AWS',
          rating: '99.9% SLA (180 Servidores Activos)',
          badge: '[CERTIFIED_AWS_LINUX]',
          location: 'NOC / Centro de Datos Virtual • Sala Privada',
          serviceName: 'Auditoría de Ciberseguridad & Diagnóstico de Base de Datos',
          cost: 2400
        };
      case 'warm_organic':
        return {
          clinicName: 'Espacio Holístico & Nutrición Integral',
          specialistName: 'Lic. Sofía Morales',
          specialistRole: 'Nutrióloga Clínica & Terapeuta Mindfulness • Céd. 774892',
          rating: '5.0 (310 Pacientes Satisfechos)',
          badge: 'Nutrición Consciente 🌿',
          location: 'Casa Raíz • Consultorio Armonía',
          serviceName: 'Consulta Integral de Nutrición & Bienestar Consciente',
          cost: 850
        };
      case 'neo_brutalist':
        return {
          clinicName: 'Estudio de Tatuajes, Piercing & Diseño Pop',
          specialistName: 'Leo "Zero" Kuntz',
          specialistRole: 'Artista Residente • Estilo Blackwork, Neo-Traditional & Lettering',
          rating: '5.0 (380 Sesiones Realizadas)',
          badge: '★ TOP RATED STUDIO',
          location: 'Distrito Creativo • Estudio 04B',
          serviceName: 'Sesión de Tatuaje Personalizado / Diseño Exclusivo',
          cost: 1800
        };
      default: // saas_clean
        return {
          clinicName: 'Centro Médico Especializado & Telemedicina',
          specialistName: 'Dr. Carlos Méndez G.',
          specialistRole: 'Médico Especialista en Medicina Interna • Céd. Prof. 8492010',
          rating: '4.9 (520 Consultas Realizadas)',
          badge: 'Cédula Profesional Verificada',
          location: 'Hospital Ángeles del Valle • Consultorio 402',
          serviceName: 'Consulta Médica Especializada',
          cost: 800
        };
    }
  }, [normalizedStyle]);

  return (
    <div className={`flex flex-col w-full rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 ${isDarkMode ? 'border-[#1e293b] bg-[#0a0f1d]' : 'border-slate-300 bg-white'}`}>
      
      {/* 1. Barra de Herramientas del Navegador (Estilo macOS + URL) */}
      <div className={`px-4 sm:px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 select-none ${themeClasses.browserFrameBg}`}>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-xs" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-xs" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-xs" />
          
          <span className={`hidden sm:inline-block ml-3 text-xs font-mono font-bold uppercase tracking-wider ${themeClasses.textMuted}`}>
            Live Mockup Interactivo
          </span>
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-md mx-auto min-w-[200px]">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono shadow-inner ${themeClasses.browserBarBg}`}>
            <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-slate-500 truncate text-xs">https://inversa-dev.com/</span>
            <span className={`font-bold truncate text-xs ${currentTheme.textAccent}`}>
              {urlSlug}
            </span>
            <button
              onClick={handleRefresh}
              title="Recargar vista previa"
              className={`ml-auto p-1 transition-colors ${
                isRefreshing ? 'animate-spin text-cyan-500' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyUrl}
              title="Copiar enlace"
              className={`p-1 transition-colors text-xs ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black'}`}
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <ExternalLink className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Switcher de Dispositivo */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border ${isDarkMode ? 'bg-[#080c14] border-[#1e293b]' : 'bg-slate-100 border-slate-300'}`}>
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceMode === 'desktop'
                ? isDarkMode ? 'bg-[#1e293b] text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm border border-slate-300'
                : themeClasses.textMuted
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Escritorio</span>
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceMode === 'tablet'
                ? isDarkMode ? 'bg-[#1e293b] text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm border border-slate-300'
                : themeClasses.textMuted
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceMode === 'mobile'
                ? isDarkMode ? 'bg-[#1e293b] text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm border border-slate-300'
                : themeClasses.textMuted
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Móvil (App)</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Barra de Configuración: Demos, Estilos y Colores */}
      <div className={`px-4 sm:px-6 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${themeClasses.subBarBg}`}>
        {onSelectDemo && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
            <span className={`text-[11px] font-mono uppercase tracking-wider font-bold mr-1 ${themeClasses.textMuted}`}>
              Arquitectura:
            </span>
            {[
              { id: 'catalogo', label: '🛍️ E-Commerce' },
              { id: 'inventario', label: '📦 SaaS Almacén' },
              { id: 'citas', label: '📅 Portal Citas' },
              { id: 'dashboard', label: '📊 ERP Admin' },
              { id: 'corporativo', label: '🏢 Corporativo B2B' },
              { id: 'restaurante', label: '🍽️ Restaurante QR' }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => onSelectDemo(d.id as MockupDemoType)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedDemo === d.id
                    ? `${currentTheme.bgAccent} ${currentTheme.textAccent} border ${currentTheme.borderAccent} shadow-xs`
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white bg-white/5'
                    : 'text-slate-700 hover:text-black bg-white border border-slate-300'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}

        {/* Estilos Visuales & Tipografías */}
        {onSelectDesignStyle && (
          <div className="flex items-center gap-1.5 py-1 overflow-x-auto no-scrollbar">
            <span className={`text-[11px] font-mono uppercase tracking-wider font-bold mr-1 ${themeClasses.textMuted}`}>
              Estilo &amp; Fuente:
            </span>
            {[
              { id: 'boutique', label: '🏛️ Boutique Lujo', font: 'Playfair Serif' },
              { id: 'saas_clean', label: '💼 SaaS Enterprise', font: 'Jakarta Sans' },
              { id: 'bold_creative', label: '⚡ Bold Startup', font: 'Syne 800' },
              { id: 'neo_brutalist', label: '👾 Neo-Brutalista', font: 'Space Grotesk' },
              { id: 'cyber_tech', label: '💻 Cyber Tech', font: 'JetBrains Mono' },
              { id: 'warm_organic', label: '🌿 Warm Orgánico', font: 'Outfit' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => onSelectDesignStyle(st.id as DesignStyleType)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  normalizedStyle === st.id
                    ? `${currentTheme.bgAccent} ${currentTheme.textAccent} border ${currentTheme.borderAccent} shadow-xs font-extrabold ring-1 ${currentTheme.ringColor}`
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white bg-white/5 border border-white/5'
                    : 'text-slate-700 hover:text-black bg-white border border-slate-300'
                }`}
                title={`Tipografía: ${st.font}`}
              >
                <span>{st.label}</span>
                <span className="text-[9px] opacity-75 font-mono px-1 py-0.5 rounded bg-black/10 dark:bg-white/10">
                  {st.font}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Color y Noche/Día */}
        <div className="flex items-center gap-3 ml-auto py-1">
          <div className="flex items-center gap-1.5" title="Personalizar color">
            <Palette className={`w-3.5 h-3.5 ${themeClasses.textMuted}`} />
            <div className="flex items-center gap-1">
              {(['cyan', 'emerald', 'violet', 'amber', 'blue', 'rose'] as const).map((colorKey) => (
                <button
                  key={colorKey}
                  onClick={() => onChangeThemeColor(colorKey)}
                  className={`w-4 h-4 rounded-full transition-transform ${
                    themeColor === colorKey ? 'scale-125 ring-2 ring-offset-1 ' + currentTheme.ringColor : 'hover:scale-110 opacity-70'
                  }`}
                  style={{ backgroundColor: THEME_COLOR_MAP[colorKey].primaryHex }}
                  title={THEME_COLOR_MAP[colorKey].name}
                />
              ))}
            </div>
          </div>

          <button
            onClick={onToggleDarkMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
              isDarkMode
                ? 'bg-[#080c14] border-[#1e293b] text-slate-200 hover:text-white'
                : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50'
            }`}
          >
            {isDarkMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Noche</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Día</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Área de Renderizado de la Maqueta */}
      <div className={`flex-1 p-3 sm:p-8 flex justify-center items-start overflow-y-auto min-h-[660px] ${themeClasses.previewContainerBg}`}>
        
        {/* ======================================================== */}
        {/* MODO MÓVIL: SMARTPHONE REAL */}
        {/* ======================================================== */}
        {deviceMode === 'mobile' ? (
          <div className="w-full max-w-[390px] rounded-[48px] p-3.5 bg-slate-950 border-4 border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden">
            <div className={`w-full rounded-[38px] overflow-hidden flex flex-col min-h-[600px] relative ${themeClasses.siteBg}`}>
              
              {/* Barra Superior del Celular */}
              <div className="px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-bold z-20 select-none border-b border-black/5 dark:border-white/5">
                <span>9:41</span>
                <div className="w-24 h-4 rounded-full bg-black flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Header de la App Móvil */}
              <div className={`px-4 py-3 flex items-center justify-between border-b ${themeClasses.headerBg}`}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-xs shadow-xs"
                    style={{ backgroundColor: currentTheme.primaryHex }}
                  >
                    {projectName ? projectName.charAt(0).toUpperCase() : 'I'}
                  </div>
                  <div className="max-w-[170px] truncate">
                    <span className={`text-xs font-black block truncate ${themeClasses.textTitle}`}>
                      {projectName?.trim() || 'Inversa App'}
                    </span>
                    <span className={`text-[9px] block truncate ${themeClasses.textMuted}`}>
                      {selectedDemo === 'inventario' ? 'SaaS Almacén Móvil' : selectedDemo === 'citas' ? 'Agenda de Citas' : 'Plataforma Móvil'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartDrawerOpen(true)}
                  className={`p-2 rounded-xl relative border ${themeClasses.cardAltBg}`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {totalCartCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black text-black flex items-center justify-center"
                      style={{ backgroundColor: currentTheme.primaryHex }}
                    >
                      {totalCartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Contenido Móvil */}
              <div className="p-3.5 flex-1 overflow-y-auto space-y-3 pb-16">
                <div className={`p-3.5 rounded-2xl ${styleDecorations.bannerBg}`}>
                  <span className="text-[9px] font-mono uppercase tracking-wider block font-bold mb-1 opacity-90">
                    {styleDecorations.heroTag}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black leading-tight">
                    {selectedDemo === 'catalogo'
                      ? 'Catálogo Digital Optimizado para Celular'
                      : selectedDemo === 'inventario'
                      ? 'Gestión de Almacén en Tiempo Real'
                      : 'Solución Web Responsiva'}
                  </h4>
                  {designStyle === 'retail' && (
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono bg-black/40 px-2 py-1 rounded-lg w-fit">
                      <Flame className="w-3 h-3 text-amber-300" />
                      <span>Termina en: {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</span>
                    </div>
                  )}
                </div>

                {/* VISTA MÓVIL: CATÁLOGO */}
                {selectedDemo === 'catalogo' && (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 1, name: 'Laptop Workstation i7', price: 24890, sku: 'LPT-2024' },
                        { id: 2, name: 'Monitor Gamer 27" 165Hz', price: 4950, sku: 'MON-165' },
                        { id: 3, name: 'Teclado Mecánico RGB', price: 1390, sku: 'KB-RGB' },
                        { id: 4, name: 'Mouse Inalámbrico Pro', price: 680, sku: 'MSE-90' }
                      ].map((item) => (
                        <div key={item.id} className={`p-2.5 rounded-xl border flex flex-col justify-between ${themeClasses.cardBg}`}>
                          <div>
                            <div className={`w-full h-16 rounded-lg mb-2 flex items-center justify-center ${themeClasses.cardAltBg}`}>
                              <Package className="w-6 h-6 text-slate-500" />
                            </div>
                            <h6 className={`text-[11px] font-bold line-clamp-1 ${themeClasses.textTitle}`}>{item.name}</h6>
                            <span className="text-[11px] font-mono font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">
                              ${formatPrice(item.price)}
                            </span>
                          </div>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className={`w-full mt-2 py-1 rounded-lg text-[10px] font-bold ${currentTheme.buttonBg}`}
                          >
                            + Agregar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VISTA MÓVIL: INVENTARIO */}
                {selectedDemo === 'inventario' && (
                  <div className="space-y-2">
                    {inventoryData.map((row) => (
                      <div key={row.sku} className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${themeClasses.cardBg}`}>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">{row.sku}</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                              row.color === 'rose' ? 'bg-rose-500/20 text-rose-500' : 'bg-emerald-500/20 text-emerald-600'
                            }`}>
                              {row.status}
                            </span>
                          </div>
                          <p className={`text-xs font-bold truncate mt-0.5 ${themeClasses.textTitle}`}>{row.name}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`text-xs font-black font-mono block ${themeClasses.textTitle}`}>{row.stock} pz</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* VISTA MÓVIL: RESTO DE DEMOS */}
                {selectedDemo !== 'catalogo' && selectedDemo !== 'inventario' && (
                  <div className={`p-4 rounded-xl border text-center ${themeClasses.cardBg}`}>
                    <h5 className={`font-bold text-xs ${themeClasses.textTitle}`}>Módulo Optimizado</h5>
                    <p className={`text-[11px] mt-1 ${themeClasses.textSubtitle}`}>
                      Visualización responsiva en pantalla móvil para {selectedDemo.toUpperCase()}.
                    </p>
                  </div>
                )}
              </div>

              {/* Barra Inferior Móvil */}
              <div className={`absolute bottom-0 left-0 right-0 py-2 px-6 border-t flex items-center justify-between text-xs z-20 ${themeClasses.headerBg}`}>
                <button
                  onClick={() => onSelectDemo && onSelectDemo('catalogo')}
                  className={`flex flex-col items-center gap-0.5 ${selectedDemo === 'catalogo' ? currentTheme.textAccent : themeClasses.textMuted}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-[9px] font-bold">Tienda</span>
                </button>
                <button
                  onClick={() => onSelectDemo && onSelectDemo('inventario')}
                  className={`flex flex-col items-center gap-0.5 ${selectedDemo === 'inventario' ? currentTheme.textAccent : themeClasses.textMuted}`}
                >
                  <Package className="w-4 h-4" />
                  <span className="text-[9px] font-bold">Stock</span>
                </button>
                <button
                  onClick={() => setIsCartDrawerOpen(true)}
                  className={`flex flex-col items-center gap-0.5 relative ${themeClasses.textMuted}`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {totalCartCount > 0 && <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-0 right-1" />}
                  <span className="text-[9px] font-bold">Carrito</span>
                </button>
                <button
                  onClick={() => setChatOpen(true)}
                  className={`flex flex-col items-center gap-0.5 ${themeClasses.textMuted}`}
                >
                  <Bot className="w-4 h-4" />
                  <span className="text-[9px] font-bold">Chat</span>
                </button>
              </div>

              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-slate-400 dark:bg-slate-600 z-30" />
            </div>
          </div>
        ) : (
          
          /* ======================================================== */
          /* MODO ESCRITORIO & TABLET: PANTALLA PANORÁMICA REAL */
          /* ======================================================== */
          <div
            className={`w-full transition-all duration-300 overflow-hidden shadow-2xl relative ${styleDecorations.wrapperRounded} ${themeClasses.siteBg} ${
              deviceMode === 'tablet' ? 'max-w-[760px] border-4 border-slate-700' : 'max-w-6xl'
            }`}
          >
            
            {/* ========================================================================= */}
            {/* ARQUITECTURA 1: SAAS DE ALMACÉN / ERP CON SIDEBAR LATERAL IZQUIERDO REAL */}
            {/* ========================================================================= */}
            {selectedDemo === 'inventario' || selectedDemo === 'dashboard' ? (
              <div className="flex flex-col md:flex-row min-h-[580px]">
                
                {/* SIDEBAR LATERAL IZQUIERDO DEL SOFTWARE EMPRESARIAL */}
                <aside className={`w-full md:w-60 border-r p-4 flex flex-col justify-between shrink-0 ${
                  isDarkMode ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-100 border-slate-300'
                }`}>
                  <div>
                    {/* Header del Sidebar */}
                    <div className="flex items-center gap-2.5 pb-4 border-b border-slate-700/20 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-sm">
                        ERP
                      </div>
                      <div className="min-w-0">
                        <span className={`text-xs font-black block truncate ${themeClasses.textTitle}`}>
                          {projectName?.trim() || 'Sistema Cloud'}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-500 font-bold block flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> MySQL 8.3 Conectado
                        </span>
                      </div>
                    </div>

                    {/* Menú de Navegación del SaaS */}
                    <div className="space-y-1 text-xs font-semibold">
                      {[
                        { id: 'dashboard', label: 'Dashboard General', icon: BarChart3 },
                        { id: 'stock', label: 'Almacén & Existencias', icon: Package, badge: '14 bajo' },
                        { id: 'movimientos', label: 'Entradas & Salidas', icon: ArrowUpRight },
                        { id: 'reportes', label: 'Reportes PDF / Excel', icon: FileSpreadsheet }
                      ].map((nav) => {
                        const Icon = nav.icon;
                        const isActive = saasActiveNav === nav.id;

                        return (
                          <button
                            key={nav.id}
                            onClick={() => setSaasActiveNav(nav.id as any)}
                            className={`w-full px-3 py-2 rounded-xl flex items-center justify-between transition-all ${
                              isActive
                                ? `${currentTheme.bgAccent} ${currentTheme.textAccent} font-bold border ${currentTheme.borderAccent}`
                                : `${themeClasses.textMuted} hover:bg-white/5`
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4" />
                              <span>{nav.label}</span>
                            </div>
                            {nav.badge && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-500 font-bold">
                                {nav.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Perfil de Usuario RBAC Abajo del Sidebar */}
                  <div className="pt-3 border-t border-slate-700/20 mt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">
                        A
                      </div>
                      <div>
                        <span className={`text-[11px] font-bold block ${themeClasses.textTitle}`}>Admin General</span>
                        <span className="text-[9px] font-mono text-slate-400">Rol: Superadmin RBAC</span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-white" title="Cerrar sesión">
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </aside>

                {/* CONTENIDO PRINCIPAL DEL SOFTWARE EMPRESARIAL */}
                <main className="flex-1 p-5 sm:p-6 space-y-5 overflow-y-auto">
                  
                  {/* Top Bar del SaaS: Búsqueda Global + Sucursales + Acciones */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/20">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${themeClasses.textMuted}`} />
                      <input
                        type="text"
                        value={tableSearchQuery}
                        onChange={(e) => setTableSearchQuery(e.target.value)}
                        placeholder="Buscar en todo el sistema (Ctrl + K)..."
                        className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border ${themeClasses.inputBg}`}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`px-2.5 py-1 rounded-lg border text-xs font-mono ${themeClasses.cardAltBg}`}>
                        Sucursal Central (Almacén 01)
                      </div>
                      <button className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentTheme.buttonBg}`}>
                        + Nuevo Registro
                      </button>
                    </div>
                  </div>

                  {/* 4 KPIs de Negocio */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className={`p-3.5 rounded-xl border ${themeClasses.cardBg}`}>
                      <span className={`text-[11px] font-mono block ${themeClasses.textMuted}`}>Valor en Almacén</span>
                      <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 block">$348,200</span>
                      <span className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-0.5">
                        <TrendingUp className="w-2.5 h-2.5" /> +12.4% vs mes anterior
                      </span>
                    </div>

                    <div className={`p-3.5 rounded-xl border ${themeClasses.cardBg}`}>
                      <span className={`text-[11px] font-mono block ${themeClasses.textMuted}`}>Stock Crítico</span>
                      <span className="text-lg font-black font-mono text-rose-500 mt-0.5 block">14 pzas</span>
                      <span className="text-[10px] text-rose-500 font-mono font-bold">⚠️ Reordenar en proveedor</span>
                    </div>

                    <div className={`p-3.5 rounded-xl border ${themeClasses.cardBg}`}>
                      <span className={`text-[11px] font-mono block ${themeClasses.textMuted}`}>Total Artículos</span>
                      <span className={`text-lg font-black font-mono mt-0.5 block ${themeClasses.textTitle}`}>1,428 pz</span>
                      <span className="text-[10px] text-cyan-500 font-mono">En 3 bodegas</span>
                    </div>

                    <div className={`p-3.5 rounded-xl border ${themeClasses.cardBg}`}>
                      <span className={`text-[11px] font-mono block ${themeClasses.textMuted}`}>Movimientos Hoy</span>
                      <span className="text-lg font-black font-mono text-violet-500 mt-0.5 block">38</span>
                      <span className={`text-[10px] font-mono ${themeClasses.textMuted}`}>Entradas & Salidas</span>
                    </div>
                  </div>

                  {/* DataTables Avanzada con Ordenamiento Interactivo por Columnas */}
                  <div className={`rounded-xl border overflow-hidden ${themeClasses.cardBg}`}>
                    
                    {/* Header de la Tabla con Exportadores */}
                    <div className="p-3 border-b border-slate-700/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Table className="w-4 h-4 text-cyan-500" />
                        <span className={`font-bold ${themeClasses.textTitle}`}>Tabla de Existencias (MySQL AJAX)</span>
                        <span className={`text-[10px] font-mono ${themeClasses.textMuted}`}>
                          ({inventoryData.length} registros cargados en 0.002s)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {services.export_excel && (
                          <button
                            onClick={() => alert('Simulación: Archivo Excel (.xlsx) generado desde MySQL con PhpSpreadsheet listo para descargar.')}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
                          >
                            <FileSpreadsheet className="w-3 h-3" />
                            <span>Exportar Excel</span>
                          </button>
                        )}
                        {services.export_pdf && (
                          <button
                            onClick={() => alert('Simulación: Reporte PDF formal foliado generado con Dompdf listo.')}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-500/40 text-xs font-bold hover:bg-rose-600/30 transition-colors"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Exportar PDF</span>
                          </button>
                        )}
                        {services.export_word && (
                          <button
                            onClick={() => alert('Simulación: Documento Word (.docx) descargado.')}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/40 text-xs font-bold hover:bg-blue-600/30 transition-colors"
                          >
                            <FileEdit className="w-3 h-3" />
                            <span>Word</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Tabla con Headers Cliqueables para Ordenar */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className={`font-mono text-xs uppercase border-b select-none ${themeClasses.tableHeaderBg}`}>
                          <tr>
                            <th
                              onClick={() => { setSortField('sku'); setSortAsc(!sortAsc); }}
                              className="p-3 cursor-pointer hover:text-cyan-400 transition-colors"
                            >
                              SKU {sortField === 'sku' && (sortAsc ? '▲' : '▼')}
                            </th>
                            <th
                              onClick={() => { setSortField('name'); setSortAsc(!sortAsc); }}
                              className="p-3 cursor-pointer hover:text-cyan-400 transition-colors"
                            >
                              Producto {sortField === 'name' && (sortAsc ? '▲' : '▼')}
                            </th>
                            <th className="p-3">Ubicación</th>
                            <th
                              onClick={() => { setSortField('stock'); setSortAsc(!sortAsc); }}
                              className="p-3 text-right cursor-pointer hover:text-cyan-400 transition-colors"
                            >
                              Stock {sortField === 'stock' && (sortAsc ? '▲' : '▼')}
                            </th>
                            <th className="p-3">Estatus</th>
                            <th className="p-3 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${themeClasses.tableBorder} font-mono text-xs`}>
                          {inventoryData.map((row) => (
                            <tr key={row.sku} className={`transition-colors ${themeClasses.tableRowHover}`}>
                              <td className="p-3 font-bold text-cyan-600 dark:text-cyan-400">{row.sku}</td>
                              <td className={`p-3 font-sans font-bold ${themeClasses.textTitle}`}>{row.name}</td>
                              <td className={`p-3 text-xs ${themeClasses.textMuted}`}>{row.loc}</td>
                              <td className={`p-3 text-right font-black ${themeClasses.textTitle}`}>{row.stock} pzas</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  row.color === 'rose' ? 'bg-rose-500/20 text-rose-500' : 'bg-emerald-500/20 text-emerald-600'
                                }`}>
                                  {row.status}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => alert(`Simulación: Etiqueta QR del producto ${row.sku} generada para impresión térmica.`)}
                                  className={`p-1 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 ${themeClasses.cardAltBg}`}
                                  title="Imprimir QR"
                                >
                                  <QrCode className="w-3 h-3 text-cyan-500" />
                                  <span>QR</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Gráfica de Métricas si está activa */}
                  {services.graficas_metricas && (
                    <div className={`p-4 rounded-xl border ${themeClasses.cardBg}`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-bold text-xs flex items-center gap-2 ${themeClasses.textTitle}`}>
                          <BarChart3 className="w-4 h-4 text-cyan-500" />
                          Histograma de Ventas e Ingresos Mensuales (Chart.js / PHP)
                        </span>
                        <span className={`text-xs font-mono ${themeClasses.textMuted}`}>2024 MXN</span>
                      </div>

                      <div className="h-32 flex items-end gap-2 pt-2 border-b border-slate-700/20 pb-2">
                        {[
                          { mes: 'Ene', val: 40 },
                          { mes: 'Feb', val: 55 },
                          { mes: 'Mar', val: 70 },
                          { mes: 'Abr', val: 62 },
                          { mes: 'May', val: 85 },
                          { mes: 'Jun', val: 95 },
                          { mes: 'Jul', val: 78 },
                          { mes: 'Ago', val: 110 },
                          { mes: 'Sep', val: 125 },
                          { mes: 'Oct', val: 140 }
                        ].map((item, i) => (
                          <div key={item.mes} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                            <div
                              className="w-full rounded-t-lg transition-all group-hover:opacity-85"
                              style={{
                                height: `${(item.val / 140) * 100}%`,
                                backgroundColor: i === 9 ? currentTheme.primaryHex : `${currentTheme.primaryHex}65`
                              }}
                            />
                            <span className={`text-[9px] font-mono ${themeClasses.textMuted}`}>{item.mes}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </main>
              </div>
            ) : null}

            {/* ========================================================================= */}
            {/* ARQUITECTURA 2: TIENDA ONLINE / E-COMMERCE RETAIL COMPLETO */}
            {/* ========================================================================= */}
            {selectedDemo === 'catalogo' && (
              <div>
                {/* 1. Barra de Envíos y Garantías Temática por Estilo */}
                {normalizedStyle === 'boutique' ? (
                  <div className="bg-[#1C1814] text-[#D4AF37] border-b border-[#3A332A] px-4 py-2 text-[11px] font-serif tracking-widest text-center flex items-center justify-center gap-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>✦ ATELIER PRIVÉ &amp; HAUTE HORLOGERIE • ENVÍOS ASEGURADOS POR BRINKS • CERTIFICACIÓN GIA ✦</span>
                  </div>
                ) : normalizedStyle === 'bold_creative' ? (
                  <div className="bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 text-black px-4 py-1.5 text-xs font-syne font-black tracking-wide overflow-hidden flex items-center justify-between">
                    <div className="flex items-center gap-2 animate-pulse">
                      <Flame className="w-4 h-4 fill-black text-black" />
                      <span className="uppercase">🔥 DROP 04: STREETWEAR &amp; TECH // 200 PIEZAS DISPONIBLES // ENVÍO 24H EXPRESS</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] bg-black text-amber-300 px-2 py-0.5 rounded-full font-bold">
                      <span>CIERRA EN: {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</span>
                    </div>
                  </div>
                ) : normalizedStyle === 'neo_brutalist' ? (
                  <div className="bg-[#FFE600] text-black border-b-2 border-black px-4 py-1.5 text-xs font-grotesk font-black flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-black text-[#FFE600] rounded text-[10px] uppercase">👾 INDIE POP</span>
                      <span>★ 100% CÓDIGO LIMPIO • SIN MENSUALIDADES OCULTAS • LISTO PARA VENDER ★</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-lime-400 border border-black rounded shadow-[2px_2px_0px_#000]">
                      ENVÍO GRATIS HOY
                    </span>
                  </div>
                ) : normalizedStyle === 'cyber_tech' ? (
                  <div className="bg-black text-cyan-400 border-b border-cyan-500/40 px-4 py-1.5 text-[10px] font-mono flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>[SYS_STATUS: OPTIMAL 99.98%]</span>
                      <span className="hidden md:inline">[PING: 14ms]</span>
                      <span className="hidden md:inline">[PHP 8.3 WORKERS: 16 IDLE]</span>
                      <span className="hidden md:inline">[SSL: TLS 1.3 AES-256]</span>
                    </div>
                    <span className="text-cyan-300 font-bold">[NODE_ID: MEX-CENTRAL-01]</span>
                  </div>
                ) : normalizedStyle === 'warm_organic' ? (
                  <div className="bg-[#EAE5DA] text-[#2B3A2C] border-b border-[#DDD7CC] px-4 py-1.5 text-[11px] font-outfit text-center flex items-center justify-center gap-2">
                    <Leaf className="w-3.5 h-3.5 text-[#3A6351]" />
                    <span>🌿 100% Ingredientes Limpios • Envases de Vidrio Reciclable • Cero Químicos Sintéticos</span>
                  </div>
                ) : (
                  <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-1.5 text-[11px] font-mono text-center flex items-center justify-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-sky-400" />
                    <span>🚚 Envíos seguros a todo México • Soporte Directo • Pagos en MXN</span>
                  </div>
                )}

                {/* Header de la Tienda */}
                <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${themeClasses.headerBg}`}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 ${styleDecorations.cardRounded} flex items-center justify-center font-black text-white text-sm ${styleDecorations.shadowStyle}`}
                      style={{ backgroundColor: currentTheme.primaryHex }}
                    >
                      {projectName ? projectName.charAt(0).toUpperCase() : 'T'}
                    </div>
                    <div>
                      <h4 className={`text-sm font-black ${styleDecorations.fontTitle} ${themeClasses.textTitle}`}>
                        {projectName?.trim() || (normalizedStyle === 'boutique' ? 'Maison & Atelier' : 'Inversa Commerce')}
                      </h4>
                      <span className="text-[10px] text-emerald-500 font-mono font-bold">
                        {normalizedStyle === 'boutique' ? 'Colección Privada 2024' : 'Catálogo Oficial 2024'}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex-1 max-w-sm min-w-[200px]">
                    <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${themeClasses.textMuted}`} />
                    <input
                      type="text"
                      value={tableSearchQuery}
                      onChange={(e) => setTableSearchQuery(e.target.value)}
                      placeholder="Buscar por marca, modelo o categoría..."
                      className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border ${themeClasses.inputBg}`}
                    />
                  </div>

                  <button
                    onClick={() => setIsCartDrawerOpen(true)}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-300'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 text-cyan-500" />
                    <span>Carrito ({totalCartCount})</span>
                    <span className="font-mono text-emerald-500 font-extrabold">${formatPrice(cartSubtotal)} MXN</span>
                  </button>
                </div>

                {/* Contenido de la Tienda */}
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Hero Banner Comercial */}
                  <div className={`p-6 ${styleDecorations.cardRounded} ${styleDecorations.bannerBg} flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden ${styleDecorations.shadowStyle}`}>
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-extrabold px-3 py-1 ${styleDecorations.badgeShape} bg-black/30 text-white inline-block mb-2`}>
                        {styleDecorations.heroTag}
                      </span>
                      <h3 className={`text-xl sm:text-2xl font-black ${styleDecorations.fontTitle} ${themeClasses.textTitle}`}>
                        {normalizedStyle === 'boutique'
                          ? 'Piezas Exclusivas & Diseño de Autor'
                          : normalizedStyle === 'bold_creative'
                          ? 'DROP LIMITADO: STREETWEAR & TECH'
                          : normalizedStyle === 'neo_brutalist'
                          ? 'RAW INDIE MERCH & POP GADGETS ★'
                          : normalizedStyle === 'cyber_tech'
                          ? '> HARDWARE_OVERCLOCK_STATION'
                          : normalizedStyle === 'warm_organic'
                          ? 'Bienestar Natural & Productos Orgánicos'
                          : 'Equipamiento Corporativo con Garantía Directa'}
                      </h3>
                      <p className={`text-xs mt-1.5 max-w-lg ${themeClasses.textSubtitle}`}>
                        {normalizedStyle === 'boutique'
                          ? 'Descubre alta joyería con certificación GIA, relojes de colección y accesorios de piel hechos a mano.'
                          : normalizedStyle === 'bold_creative'
                          ? 'Ediciones limitadas de sneakers y ropa urbana con checkout instantáneo directo a WhatsApp.'
                          : normalizedStyle === 'neo_brutalist'
                          ? 'Consolas retro pixel, sintetizadores, vinilos y teclados mecánicos para creadores auténticos.'
                          : normalizedStyle === 'cyber_tech'
                          ? 'Componentes de alta fidelidad, GPUs de última generación y almacenamiento ultra rápido PCIe 5.0.'
                          : normalizedStyle === 'warm_organic'
                          ? 'Cosmética botánica, aromaterapia pura con difusores artesanales e infusiones de cultivo biológico.'
                          : 'Pide tus productos en línea y recibe confirmación con folio de pedido a WhatsApp.'}
                      </p>
                    </div>

                    {normalizedStyle === 'bold_creative' && (
                      <div className="p-3 rounded-2xl bg-black/60 text-white shrink-0 text-center font-mono border border-white/20 shadow-lg">
                        <span className="text-[10px] text-amber-300 font-bold block">¡OFERTAS TERMINAN EN!</span>
                        <span className="text-xl font-black text-rose-400">{countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s</span>
                      </div>
                    )}

                    {normalizedStyle === 'neo_brutalist' && (
                      <div className="p-3 bg-white text-black border-2 border-black rounded-xl shrink-0 text-center font-grotesk font-black shadow-[3px_3px_0px_#000]">
                        <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded block mb-1">EDICIÓN INDIE</span>
                        <span className="text-sm">★ STOCK LIMITADO ★</span>
                      </div>
                    )}
                  </div>

                  {/* =================================================================== */}
                  {/* PLANTILLA 1: BOUTIQUE - ATELIER EDITORIAL CON SPOTLIGHT ASIMÉTRICO */}
                  {/* =================================================================== */}
                  {normalizedStyle === 'boutique' ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#3A332A] pb-2">
                        <span className="text-xs font-serif italic text-[#C5A880]">✦ Colección de Autor Seleccionada</span>
                        <span className="text-[10px] font-mono text-[#8C8379]">Mostrando {catalogProducts.length} piezas maestras</span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* 1. Pieza Destacada Spotlight (Hero Piece) */}
                        {catalogProducts[0] && (
                          <div className={`lg:col-span-1 p-5 rounded-xl border flex flex-col justify-between ${themeClasses.cardBg} ${styleDecorations.shadowStyle}`}>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-serif tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full">
                                  ✦ PIEZA ESTRELLA
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">SKU: {catalogProducts[0].sku}</span>
                              </div>
                              <div className={`w-full h-48 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden ${themeClasses.cardAltBg}`}>
                                <ProductArtwork sku={catalogProducts[0].sku} name={catalogProducts[0].name} styleKey={normalizedStyle} isDarkMode={isDarkMode} className="h-44 w-full" />
                              </div>
                              <div className="flex items-center gap-1 mb-1 text-amber-500 text-xs">
                                <Star className="w-3.5 h-3.5 fill-amber-500" />
                                <span className="font-bold text-xs">{catalogProducts[0].rating}</span>
                                <span className={`text-[10px] ${themeClasses.textMuted}`}>({catalogProducts[0].reviews} coleccionistas)</span>
                              </div>
                              <h5 className={`font-serif text-base font-normal tracking-wide ${themeClasses.textTitle}`}>{catalogProducts[0].name}</h5>
                              <p className="text-xs text-slate-400 mt-1 italic font-serif leading-relaxed">
                                Pieza de colección numerada y forjada con metales nobles certificados. Incluye estuche de nogal y garantía de autenticidad vitalicia.
                              </p>
                              <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-lg font-serif font-bold text-[#D4AF37]">
                                  ${formatPrice(catalogProducts[0].price)} MXN
                                </span>
                                <span className={`text-xs font-mono line-through ${themeClasses.textMuted}`}>
                                  ${formatPrice(catalogProducts[0].original)}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                              <button
                                onClick={() => setViewProductModal(catalogProducts[0])}
                                className={`p-2.5 rounded-none border text-xs font-medium tracking-wider uppercase ${themeClasses.cardAltBg}`}
                              >
                                Vista Rápida
                              </button>
                              <button
                                onClick={() => handleAddToCart(catalogProducts[0])}
                                className={`flex-1 py-2.5 px-3 rounded-none text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-1.5 transition-all ${styleDecorations.buttonPrimary}`}
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Añadir a Colección</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 2. Galería de las otras 3 piezas */}
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {catalogProducts.slice(1).map((prod) => (
                            <div key={prod.id} className={`p-4 rounded-xl border flex flex-col justify-between transition-all hover:border-[#D4AF37]/50 ${themeClasses.cardBg} ${styleDecorations.shadowStyle}`}>
                              <div>
                                <div className={`w-full h-32 rounded-lg mb-2.5 flex items-center justify-center relative overflow-hidden ${themeClasses.cardAltBg}`}>
                                  <ProductArtwork sku={prod.sku} name={prod.name} styleKey={normalizedStyle} isDarkMode={isDarkMode} className="h-28 w-full" />
                                  <span className="absolute top-2 left-2 text-[9px] font-serif px-2 py-0.5 rounded bg-black/70 text-[#D4AF37] border border-[#D4AF37]/30">
                                    {prod.cat}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 mb-1 text-amber-500 text-xs">
                                  <Star className="w-3 h-3 fill-amber-500" />
                                  <span className="font-bold text-[11px]">{prod.rating}</span>
                                </div>
                                <h6 className={`font-serif text-xs font-normal line-clamp-1 ${themeClasses.textTitle}`}>{prod.name}</h6>
                                <div className="mt-1 flex items-baseline gap-2">
                                  <span className="text-sm font-serif font-bold text-[#D4AF37]">
                                    ${formatPrice(prod.price)}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 flex items-center gap-1.5">
                                <button
                                  onClick={() => setViewProductModal(prod)}
                                  className={`p-1.5 rounded-none border text-[11px] ${themeClasses.cardAltBg}`}
                                >
                                  <Eye className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleAddToCart(prod)}
                                  className={`flex-1 py-1.5 px-2 rounded-none text-[11px] tracking-wider uppercase font-medium flex items-center justify-center gap-1 ${styleDecorations.buttonPrimary}`}
                                >
                                  <ShoppingCart className="w-3 h-3" />
                                  <span>Adquirir</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* =================================================================== */
                    /* PLANTILLA 2: GRID TEMÁTICO ADAPTADO A CADA ESTILO VISUAL */
                    /* =================================================================== */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {catalogProducts
                        .filter((p) => !tableSearchQuery || p.name.toLowerCase().includes(tableSearchQuery.toLowerCase()))
                        .map((prod) => (
                          <div
                            key={prod.id}
                            className={`p-4 ${styleDecorations.cardRounded} border flex flex-col justify-between transition-all hover:scale-[1.01] ${themeClasses.cardBg} ${styleDecorations.shadowStyle}`}
                          >
                            <div>
                              {/* Contenedor del Artwork Vectorial */}
                              <div className={`w-full h-36 ${styleDecorations.cardRounded} mb-3 flex items-center justify-center relative overflow-hidden ${themeClasses.cardAltBg}`}>
                                <ProductArtwork
                                  sku={prod.sku}
                                  name={prod.name}
                                  styleKey={normalizedStyle}
                                  isDarkMode={isDarkMode}
                                  className="h-32 w-full"
                                />
                                <span className={`absolute top-2 left-2 text-[9px] font-mono font-black px-2 py-0.5 ${styleDecorations.badgeShape} ${
                                  normalizedStyle === 'neo_brutalist'
                                    ? 'bg-black text-[#FFE600] border border-black shadow-[2px_2px_0px_#FFE600]'
                                    : normalizedStyle === 'cyber_tech'
                                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                                    : 'bg-rose-600 text-white'
                                }`}>
                                  {prod.tag}
                                </span>
                                <span className={`absolute bottom-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-white`}>
                                  {prod.sku}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 mb-1 text-amber-500 text-xs">
                                <Star className="w-3.5 h-3.5 fill-amber-500" />
                                <span className="font-bold text-xs">{prod.rating}</span>
                                <span className={`text-[10px] ${themeClasses.textMuted}`}>({prod.reviews})</span>
                              </div>

                              <h5 className={`font-bold text-xs line-clamp-1 ${styleDecorations.fontTitle} ${themeClasses.textTitle}`}>{prod.name}</h5>
                              
                              <div className="mt-1 flex items-baseline gap-2">
                                <span className={`text-sm font-mono font-black ${
                                  normalizedStyle === 'cyber_tech'
                                    ? 'text-[#00F5D4]'
                                    : normalizedStyle === 'neo_brutalist'
                                    ? 'text-black dark:text-[#FFE600] font-black'
                                    : 'text-emerald-600 dark:text-emerald-400'
                                }`}>
                                  ${formatPrice(prod.price)}
                                </span>
                                <span className={`text-[10px] font-mono line-through ${themeClasses.textMuted}`}>
                                  ${formatPrice(prod.original)}
                                </span>
                              </div>
                            </div>

                            <div className="mt-3.5 flex items-center gap-2">
                              <button
                                onClick={() => setViewProductModal(prod)}
                                className={`p-2 ${styleDecorations.buttonRounded} border text-xs font-bold ${themeClasses.cardAltBg}`}
                                title="Vista Rápida"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleAddToCart(prod)}
                                className={`flex-1 py-2 px-3 ${styleDecorations.buttonRounded} text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                  normalizedStyle === 'neo_brutalist'
                                    ? 'bg-[#FFE600] hover:bg-[#FACC15] text-black border-2 border-black font-grotesk font-black shadow-[2px_2px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none'
                                    : currentTheme.buttonBg
                                }`}
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Agregar al Carrito</span>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* ARQUITECTURA 3: PORTAL MÉDICO / CITAS PROFESIONALES POR PASOS */}
            {/* ========================================================================= */}
            {selectedDemo === 'citas' && (
              <div className="p-6 space-y-6">
                {/* Header del Portal de Citas */}
                <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${themeClasses.cardBg}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-base font-black ${styleDecorations.fontTitle} ${themeClasses.textTitle}`}>
                        {appointmentData.specialistName}
                      </h4>
                      <p className={`text-xs ${themeClasses.textSubtitle}`}>
                        {appointmentData.specialistRole}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-emerald-500 font-bold">
                        <span>● Turnos Libres</span>
                        <span className="text-slate-400">|</span>
                        <span>{appointmentData.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500 text-xs font-bold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span>{appointmentData.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Wizard de Agendamiento en 3 Pasos */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Calendario y Selección */}
                  <div className={`md:col-span-7 p-5 rounded-2xl border ${themeClasses.cardBg}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-bold text-xs uppercase tracking-wider text-cyan-500`}>
                        Paso 1: Selecciona Fecha de Cita
                      </span>
                      <span className={`text-xs font-mono ${themeClasses.textMuted}`}>Octubre 2024</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-xs mb-4">
                      {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => (
                        <div key={d} className={`p-1 font-bold ${themeClasses.textMuted}`}>
                          {d}
                        </div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                        const isSelected = selectedCalendarDay === day;
                        const hasAppointments = [12, 14, 15, 18, 22].includes(day);

                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedCalendarDay(day)}
                            className={`p-2.5 rounded-xl transition-all relative font-bold ${
                              isSelected
                                ? `${currentTheme.buttonBg} shadow-md`
                                : hasAppointments
                                ? isDarkMode
                                  ? 'bg-slate-800 text-cyan-300 hover:bg-slate-700'
                                  : 'bg-slate-100 text-cyan-800 hover:bg-slate-200 border border-slate-300'
                                : isDarkMode
                                ? 'text-slate-400 hover:bg-slate-800/40'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span>{day}</span>
                            {hasAppointments && !isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 absolute bottom-1 left-1/2 -translate-x-1/2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <span className={`text-[11px] font-mono block ${themeClasses.textMuted}`}>
                      💡 Los días con punto tienen turnos matutinos y vespertinos disponibles.
                    </span>
                  </div>

                  {/* Horario y Confirmación */}
                  <div className={`md:col-span-5 p-5 rounded-2xl border flex flex-col justify-between ${themeClasses.cardBg}`}>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-cyan-500 font-bold block mb-2">
                        Paso 2: Elige Horario Disponible
                      </span>

                      <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-xs">
                        {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((hora) => (
                          <button
                            key={hora}
                            onClick={() => setAppointmentTime(hora)}
                            className={`p-2.5 rounded-xl border text-center transition-all ${
                              appointmentTime === hora
                                ? `${currentTheme.bgAccent} ${currentTheme.borderAccent} ${currentTheme.textAccent} font-bold`
                                : `${themeClasses.cardAltBg} ${themeClasses.textSubtitle}`
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                            <span>{hora}</span>
                          </button>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl border space-y-1.5 text-xs bg-black/10 dark:bg-slate-800/20 mb-4">
                        <div className="flex justify-between">
                          <span className={themeClasses.textMuted}>Servicio:</span>
                          <span className="font-bold">{appointmentData.serviceName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeClasses.textMuted}>Fecha elegida:</span>
                          <span className="font-bold">{selectedCalendarDay} de Octubre, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeClasses.textMuted}>Horario:</span>
                          <span className="font-bold text-cyan-500">{appointmentTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeClasses.textMuted}>Costo de Consulta:</span>
                          <span className="font-bold text-emerald-500 font-mono">${appointmentData.cost} MXN</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setAppointmentSuccess(true);
                        setTimeout(() => setAppointmentSuccess(false), 4000);
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${currentTheme.buttonBg}`}
                    >
                      {appointmentSuccess ? '✓ ¡Cita Notificada vía PHPMailer!' : 'Confirmar Reservación de Cita'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* ARQUITECTURA 4: MENÚ DIGITAL & COMANDAS PARA RESTAURANTES */}
            {/* ========================================================================= */}
            {selectedDemo === 'restaurante' && (
              <div className="p-6 space-y-5">
                <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${themeClasses.cardBg}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center font-black">
                      <UtensilsCrossed className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-base font-black ${styleDecorations.fontTitle} ${themeClasses.textTitle}`}>
                        {restaurantData.conceptName}
                      </h4>
                      <p className={`text-xs ${themeClasses.textSubtitle}`}>
                        {restaurantData.conceptTag} • {restaurantData.chefNote}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-xl border bg-amber-500/10 text-amber-500 text-xs font-mono font-bold">
                      📍 {restaurantData.table}
                    </div>
                    <button
                      onClick={() => setIsCartDrawerOpen(true)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${currentTheme.buttonBg}`}
                    >
                      Ver Comanda ({totalCartCount})
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {restaurantData.items.map((item) => (
                    <div key={item.platillo} className={`p-4 rounded-2xl border flex flex-col justify-between ${themeClasses.cardBg}`}>
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h6 className={`font-bold text-xs ${styleDecorations.fontTitle} ${themeClasses.textTitle}`}>{item.platillo}</h6>
                        </div>
                        <p className={`text-xs mt-1 ${themeClasses.textMuted}`}>{item.desc}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-700/20">
                        <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">${item.precio} MXN</span>
                        <button
                          onClick={() => handleAddToCart({ id: Date.now(), name: item.platillo, price: item.precio, sku: 'REST' })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${currentTheme.buttonBg}`}
                        >
                          + Ordenar a Mesa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* ARQUITECTURA 5: PORTAL CORPORATIVO B2B INSTITUCIONAL */}
            {/* ========================================================================= */}
            {selectedDemo === 'corporativo' && (
              <div>
                {/* Barra Institucional con Menú B2B */}
                <div className={`px-6 py-3 border-b flex items-center justify-between text-xs font-bold ${themeClasses.headerBg}`}>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-black text-cyan-500">GRUPO NEXO CORP</span>
                    <nav className="hidden md:flex items-center gap-4 text-xs text-slate-400">
                      <span className="hover:text-white cursor-pointer">Soluciones</span>
                      <span className="hover:text-white cursor-pointer">Sectores</span>
                      <span className="hover:text-white cursor-pointer">Casos de Éxito</span>
                      <span className="hover:text-white cursor-pointer">Licitaciones</span>
                    </nav>
                  </div>
                  <button className={`px-3 py-1.5 rounded-lg text-xs font-bold ${currentTheme.buttonBg}`}>
                    Portal Clientes
                  </button>
                </div>

                <div className="p-8 space-y-6">
                  <div className={`p-8 rounded-2xl border text-center relative overflow-hidden ${themeClasses.cardBg}`}>
                    <span className="text-xs font-mono uppercase tracking-widest font-extrabold px-3 py-1 rounded-full inline-block mb-3 bg-cyan-500/20 text-cyan-500">
                      CERTIFICACIÓN ISO 9001:2015 • INFRAESTRUCTURA TIER III
                    </span>
                    <h3 className={`text-xl sm:text-3xl font-black tracking-tight max-w-2xl mx-auto ${themeClasses.textTitle}`}>
                      Infraestructura y Software Especializado para la Industria
                    </h3>
                    <p className={`text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed ${themeClasses.textSubtitle}`}>
                      Desarrollamos soluciones perimetrales escalables con PHP 8.3 y MySQL capaces de procesar millones de transacciones.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* TERMINAL INTERACTIVA CYBER TECH (SI ESTÁ EN ESTILO TECH) */}
      {/* ======================================================== */}
      {designStyle === 'tech' && (
        <div className="bg-black border-t border-cyan-500/30 p-4 font-mono text-[11px] text-cyan-400 select-none">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold">INVERSA KERNEL MONITOR [PHP 8.3 & MySQL]</span>
            </div>
            <span className="text-emerald-400 text-[10px]">● Conexión Activa 0ms</span>
          </div>
          <div className="space-y-1 opacity-90 text-[10px]">
            <div>&gt; [MySQL 8.3] Conexión establecida con base de datos. Consultas con índice optimizado.</div>
            <div>&gt; [PHP Engine] Servidor listo. Soporte nativo para Dompdf, PhpSpreadsheet y APIs REST.</div>
            <div>&gt; [AJAX Live] Sincronización asíncrona de inventario sin recargas de página activa.</div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CAJÓN LATERAL DE CARRITO SIMULADO INTERACTIVO (DRAWER) */}
      {/* ======================================================== */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-sm h-full p-6 flex flex-col justify-between shadow-2xl border-l transition-all animate-in slide-in-from-right ${
            isDarkMode ? 'bg-[#0f172a] border-[#1e293b] text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/20 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-cyan-500" />
                  <h4 className="font-bold text-base">Carrito de Compras</h4>
                </div>
                <button onClick={() => setIsCartDrawerOpen(false)} className="p-1 hover:opacity-75">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">El carrito está vacío.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      isDarkMode ? 'bg-[#080c14] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="min-w-0 flex-1">
                        <h6 className="font-bold text-xs truncate">{item.name}</h6>
                        <span className="text-[11px] font-mono text-emerald-600 font-bold block mt-0.5">
                          ${formatPrice(item.price)} MXN
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateCartQty(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-slate-700/30 flex items-center justify-center text-xs font-bold hover:bg-slate-700/50"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateCartQty(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-slate-700/30 flex items-center justify-center text-xs font-bold hover:bg-slate-700/50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Simulación de Cupón de Descuento */}
              <form onSubmit={handleApplyCoupon} className="mt-4 pt-3 border-t border-slate-700/20 flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Cupón: INVERSA2024"
                  className={`flex-1 px-3 py-1.5 rounded-xl text-xs border uppercase font-mono ${themeClasses.inputBg}`}
                />
                <button type="submit" className={`px-3 py-1.5 rounded-xl text-xs font-bold ${currentTheme.buttonBg}`}>
                  Aplicar
                </button>
              </form>
              {appliedCoupon && (
                <span className="text-[10px] text-emerald-500 font-bold block mt-1">
                  ✓ Descuento de $500 MXN aplicado con éxito
                </span>
              )}
            </div>

            <div className="pt-4 border-t border-slate-700/20 space-y-3">
              <div className="flex justify-between items-baseline font-mono">
                <span className="text-xs text-slate-400">Total a Pagar:</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  ${formatPrice(cartSubtotal)} MXN
                </span>
              </div>

              <button
                onClick={() => {
                  alert('¡Simulación completada! Este botón genera el pedido estructurado directamente a tu WhatsApp con el folio generado.');
                  setIsCartDrawerOpen(false);
                }}
                className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 ${currentTheme.buttonBg}`}
              >
                <Send className="w-4 h-4" />
                <span>Enviar Pedido a WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Vista Rápida */}
      {viewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl relative ${
            isDarkMode ? 'bg-[#0f172a] border-cyan-500/40 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <button onClick={() => setViewProductModal(null)} className="absolute top-4 right-4 p-1 hover:opacity-75">
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-44 rounded-2xl mb-4 flex items-center justify-center bg-slate-800/40 relative overflow-hidden">
              <ProductArtwork
                sku={viewProductModal.sku}
                name={viewProductModal.name}
                styleKey={normalizedStyle}
                isDarkMode={isDarkMode}
                className="h-36 w-full"
              />
            </div>

            <span className="text-xs font-mono text-cyan-500 font-bold">SKU: {viewProductModal.sku}</span>
            <h4 className="text-base font-black mt-1">{viewProductModal.name}</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Base de datos MySQL relacional con soporte para variantes, existencias y fotos en alta resolución.
            </p>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-700/20">
              <span className="text-lg font-mono font-black text-emerald-500">${formatPrice(viewProductModal.price)} MXN</span>
              <button
                onClick={() => {
                  handleAddToCart(viewProductModal);
                  setViewProductModal(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${currentTheme.buttonBg}`}
              >
                + Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Guiado */}
      {services.chatbot_reglas && (
        <div className="fixed bottom-6 right-6 z-40">
          {chatOpen && (
            <div className={`mb-2 w-72 sm:w-80 rounded-2xl border shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 ${
              isDarkMode ? 'bg-[#0f172a] border-cyan-500/40 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
            }`}>
              <div className="flex items-center justify-between border-b pb-2 mb-2 border-slate-700/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Asistente Inversa</span>
                    <span className="text-[10px] text-emerald-500 font-mono font-bold">En línea • Cero Costos IA</span>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="p-1 hover:opacity-75">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs mb-3 text-slate-400">
                ¡Hola! ¿En qué podemos ayudarte? Elige una opción guiada:
              </p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <button onClick={() => handleChatOption('horarios')} className={`p-2 rounded-xl text-xs font-semibold text-left border ${themeClasses.cardAltBg}`}>
                  🕒 Horarios
                </button>
                <button onClick={() => handleChatOption('servicios')} className={`p-2 rounded-xl text-xs font-semibold text-left border ${themeClasses.cardAltBg}`}>
                  🛠️ Servicios
                </button>
                <button onClick={() => handleChatOption('precios')} className={`p-2 rounded-xl text-xs font-semibold text-left border ${themeClasses.cardAltBg}`}>
                  💰 Precios
                </button>
                <button onClick={() => handleChatOption('asesor')} className={`p-2 rounded-xl text-xs font-semibold text-left border ${themeClasses.cardAltBg}`}>
                  📱 WhatsApp
                </button>
              </div>

              {chatMessage && (
                <div className="p-2.5 rounded-xl border text-xs bg-cyan-950/40 border-cyan-500/30 text-cyan-200">
                  {chatMessage}
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="p-3.5 rounded-full text-black shadow-2xl flex items-center justify-center transition-transform hover:scale-110 relative"
            style={{ backgroundColor: currentTheme.primaryHex }}
            title="Chatbot"
          >
            <Bot className="w-6 h-6 text-slate-950" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black absolute top-0 right-0 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black absolute top-0 right-0" />
          </button>
        </div>
      )}

      {/* 4. Barra Inferior de Estado Técnico */}
      <div className={`px-5 py-2.5 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${themeClasses.footerBarBg}`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>PHP 8.3 &amp; MySQL Engine</span>
          <span className="opacity-40">|</span>
          <span>Bootstrap 5 / Tailwind CSS</span>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <span>Servicios Activos: {Object.values(services).filter(Boolean).length} / 18</span>
        </div>
      </div>

    </div>
  );
};
