import { 
  ConfigState, 
  QuoteCalculation, 
  SoftwareModuleDef, 
  SoftwareModuleId,
  AddonDef,
  LookFeel
} from '../types/configurator';

export const SOFTWARE_MODULES_CATALOG: SoftwareModuleDef[] = [
  {
    id: 'base_landing',
    name: 'Landing Page & Sitio Base',
    badge: 'Arquitectura Base',
    shortDesc: 'Estructura HTML5/React, navegación fluida, diseño responsivo y optimización móvil.',
    fullDesc: 'Maquetación de alto rendimiento con Tailwind CSS, SEO semántico, animaciones suaves y soporte multi-pantalla.',
    basePrice: 3800,
    days: 3,
    required: true,
    category: 'core',
    tags: ['React 18', 'Tailwind CSS', 'Responsive', 'SEO Base']
  },
  {
    id: 'ecommerce_cart',
    name: 'E-Commerce & Pasarelas de Pago',
    badge: 'Transaccional B2B/B2C',
    shortDesc: 'Catálogo de productos, carrito persistente, checkout y cobros con SPEI, Stripe y Mercado Pago.',
    fullDesc: 'Flujo completo de compra: cálculo automático de impuestos, generación de comprobantes y validación de cobro.',
    basePrice: 4500,
    days: 4,
    category: 'transaccional',
    tags: ['Stripe', 'Mercado Pago', 'SPEI Bancario', 'Carrito']
  },
  {
    id: 'interactive_quoter',
    name: 'Configurador / Cotizador Web',
    badge: 'Herramienta de Ventas',
    shortDesc: 'Calculadora interactiva en vivo que cotiza servicios o productos con previsualización dinámica.',
    fullDesc: 'Permite a tus clientes personalizar su pedido en tiempo real, aumentando la conversión de leads calificados.',
    basePrice: 3900,
    days: 3,
    category: 'interactivo',
    tags: ['Cálculo Reactivo', 'Live Preview', 'Generador PDF']
  },
  {
    id: 'auth_dashboard',
    name: 'Dashboard & Autenticación RBAC',
    badge: 'Panel Privado',
    shortDesc: 'Login seguro cifrado, roles (Admin, Empleado, Cliente) y panel de analíticas privadas.',
    fullDesc: 'Control de accesos con sesiones seguras, tablas de datos paginadas, métricas clave y métricas de desempeño.',
    basePrice: 4800,
    days: 4,
    category: 'seguridad',
    tags: ['Auth JWT/Firebase', 'Roles RBAC', 'Analíticas', 'Métricas']
  },
  {
    id: 'api_automation',
    name: 'Integración de APIs & Webhooks',
    badge: 'Conectividad Nube',
    shortDesc: 'Conexión con CRMs (HubSpot/Zoho), ERPs, Webhooks de WhatsApp y automatizaciones cloud.',
    fullDesc: 'Disparo de eventos automáticos, sincronización bidireccional y alertas inmediatas al equipo de operaciones.',
    basePrice: 3200,
    days: 3,
    category: 'backend',
    tags: ['REST APIs', 'Webhooks', 'WhatsApp Cloud', 'Sincronización']
  }
];

export const ADDONS_CATALOG: AddonDef[] = [
  {
    id: 'seo_speed',
    name: 'Optimización Core Web Vitals (95+ score)',
    desc: 'Compresión de assets, carga diferida y metatags OpenGraph.',
    price: 1200,
    days: 1,
    category: 'infra'
  },
  {
    id: 'database_mysql',
    name: 'Base de Datos Relacional (PostgreSQL / MySQL)',
    desc: 'Diseño de esquemas, índices para alta concurrencia y backups.',
    price: 1800,
    days: 2,
    category: 'infra'
  },
  {
    id: 'cms_admin',
    name: 'Módulo CMS de Gestión de Contenido',
    desc: 'Panel intuitivo para crear blogs, banners o avisos sin tocar código.',
    price: 2400,
    days: 2,
    category: 'marketing'
  },
  {
    id: 'ai_chatbot',
    name: 'Asistente IA Predictivo para Clientes',
    desc: 'Chatbot contextual entrenado con las preguntas frecuentes de tu empresa.',
    price: 2600,
    days: 2,
    category: 'ia'
  },
  {
    id: 'multilanguage',
    name: 'Soporte Bilingüe Español / Inglés',
    desc: 'Selector de idioma con traducciones optimizadas para SEO internacional.',
    price: 1500,
    days: 1,
    category: 'marketing'
  }
];

export const THEME_OPTIONS: Array<{
  id: LookFeel;
  name: string;
  tagline: string;
  paletteColors: [string, string, string];
  desc: string;
}> = [
  {
    id: 'minimalista-corporativo',
    name: 'Minimalista Corporativo',
    tagline: 'Estilo Vercel / Linear',
    paletteColors: ['#09090b', '#27272a', '#10b981'],
    desc: 'Bordes finos, tipografía nítida, contrastes monocromáticos y acentos sutiles de alta ingeniería.'
  },
  {
    id: 'high-tech-dark',
    name: 'High-Tech Dark Terminal',
    tagline: 'Estilo Cyber & Fintech',
    paletteColors: ['#040812', '#1e293b', '#06b6d4'],
    desc: 'Gradients futuristas, indicadores reactivos, micro-brillos cian y sensación de software de misión crítica.'
  },
  {
    id: 'ecommerce-comercial',
    name: 'E-Commerce Comercial',
    tagline: 'Conversión & Retail',
    paletteColors: ['#0a0a0f', '#3b82f6', '#f59e0b'],
    desc: 'Tarjetas de producto llamativas, botones de acción inmediata y banners diseñados para maximizar ventas.'
  }
];

export function calculateQuote(state: ConfigState): QuoteCalculation {
  let modulesPrice = 0;
  let totalDays = 0;
  const includedFeatures: string[] = [];
  let activeCount = 0;

  // 1. Modules pricing and days
  SOFTWARE_MODULES_CATALOG.forEach((mod) => {
    if (state.activeModules[mod.id]) {
      modulesPrice += mod.basePrice;
      totalDays += mod.days;
      includedFeatures.push(mod.name);
      activeCount++;
    }
  });

  // 2. Extra pages beyond landing (first page included in base)
  const extraPages = Math.max(0, state.pagesCount - 1);
  const pagesPrice = extraPages * 450;
  totalDays += Math.ceil(extraPages * 0.4);
  if (extraPages > 0) {
    includedFeatures.push(`${extraPages} página(s) adicional(es) estructuradas`);
  }

  // 3. Addons
  let addonsPrice = 0;
  ADDONS_CATALOG.forEach((addon) => {
    if (state.addons[addon.id]) {
      addonsPrice += addon.price;
      totalDays += addon.days;
      includedFeatures.push(addon.name);
    }
  });

  // 4. Subtotal before SLA
  let rawSubtotal = modulesPrice + pagesPrice + addonsPrice;

  // 5. SLA adjustments
  let slaPrice = 0;
  if (state.sla === 'express') {
    slaPrice = Math.round(rawSubtotal * 0.20);
    totalDays = Math.max(2, Math.round(totalDays * 0.65));
  } else if (state.sla === 'enterprise') {
    slaPrice = Math.round(rawSubtotal * 0.35);
    totalDays = Math.max(2, Math.round(totalDays * 0.50));
  }

  const subtotal = rawSubtotal + slaPrice;
  const iva = Math.round(subtotal * 0.16);
  const total = subtotal + iva;

  return {
    basePrice: 3800,
    modulesPrice,
    addonsPrice,
    pagesPrice,
    slaPrice,
    subtotal,
    iva,
    total,
    estimatedDays: Math.max(3, totalDays),
    includedFeatures,
    activeModulesCount: activeCount
  };
}

export const INITIAL_CONFIG_STATE: ConfigState = {
  theme: 'minimalista-corporativo',
  activeModules: {
    base_landing: true,
    ecommerce_cart: false,
    interactive_quoter: true,
    auth_dashboard: false,
    api_automation: false
  },
  addons: {
    seo_speed: true,
    database_mysql: false,
    cms_admin: false,
    ai_chatbot: false,
    multilanguage: false
  },
  pagesCount: 3,
  sla: 'standard'
};
