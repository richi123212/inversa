import React, { useState, useMemo } from 'react';
import {
  Code2,
  Server,
  Database,
  Users,
  History,
  Wrench,
  FileText,
  FileSpreadsheet,
  FileEdit,
  Table,
  Bot,
  Mail,
  QrCode,
  Calendar,
  BarChart3,
  Bell,
  Moon,
  Palette,
  CheckCircle2,
  Clock,
  Send,
  Printer,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Package,
  Layers,
  LayoutDashboard,
  Globe,
  Sliders,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Loader2,
  Smartphone,
  Eye,
  Info,
  Check,
  Zap,
  Building,
  Briefcase,
  ArrowDown,
  Monitor,
  UtensilsCrossed,
  Sparkle,
  Target,
  DollarSign,
  CreditCard,
  Percent,
  CheckCheck,
  TrendingDown,
  Lock,
  HeartPulse,
  Truck,
  Scale,
  Factory,
  Car,
  Home
} from 'lucide-react';
import { WebsiteMockupPreview, MockupDemoType, DesignStyleType, normalizeDesignStyle } from './WebsiteMockupPreview';
import { createOrder } from '../services/ordersService';
import { formatPrice } from '../utils/formatters';

export type ServiceImpact = 'ventas' | 'operaciones' | 'seguridad' | 'experiencia';

export interface TechServiceItem {
  id: string;
  name: string;
  badge: string;
  desc: string;
  price: number; // en MXN
  days: number;
  category: 'base_backend' | 'reportes_datos' | 'automatizacion' | 'ui_ux';
  impact: ServiceImpact;
  impactLabel: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export const TECH_CATALOG: TechServiceItem[] = [
  // A. Base del Proyecto & Backend
  {
    id: 'creacion_web',
    name: 'Creación de la Página Base',
    badge: 'Arquitectura Frontend',
    desc: 'Estructura HTML5 limpia, maquetación responsiva con Bootstrap 5 / Tailwind CSS, JavaScript modular y llamadas asíncronas AJAX.',
    price: 3800,
    days: 3,
    category: 'base_backend',
    impact: 'experiencia',
    impactLabel: 'Estructura Base',
    tags: ['HTML5', 'Bootstrap 5', 'JS / AJAX', 'Responsive'],
    icon: Code2
  },
  {
    id: 'backend_php',
    name: 'Funcionalidades y Lógica en PHP',
    badge: 'Motor de Programación',
    desc: 'Programación backend con PHP 8.3 estructurado, manejo de sesiones seguras, validación de datos en servidor y lógica de negocio a la medida.',
    price: 2500,
    days: 2,
    category: 'base_backend',
    impact: 'operaciones',
    impactLabel: 'Lógica Backend',
    tags: ['PHP 8.3', 'APIs REST', 'Seguridad'],
    icon: Server
  },
  {
    id: 'db_mysql',
    name: 'Base de Datos Relacional en MySQL',
    badge: 'Almacenamiento Persistente',
    desc: 'Diseño y optimización de base de datos relacional MySQL 8, relaciones entre tablas, índices para consultas rápidas y respaldos estructurados.',
    price: 2200,
    days: 2,
    category: 'base_backend',
    impact: 'operaciones',
    impactLabel: 'Datos Persistentes',
    tags: ['MySQL 8', 'Diagrama ER', 'Consultas Rápidas'],
    icon: Database
  },
  {
    id: 'sistema_usuarios',
    name: 'Autenticación y Roles de Usuarios (RBAC)',
    badge: 'Control de Accesos',
    desc: 'Inicio de sesión cifrado, recuperación de contraseña, roles jerárquicos (Administrador, Empleado, Cliente) y protección de módulos privados.',
    price: 2900,
    days: 3,
    category: 'base_backend',
    impact: 'seguridad',
    impactLabel: 'Seguridad & Roles',
    tags: ['Login Seguro', 'Roles RBAC', 'Protección'],
    icon: Users
  },
  {
    id: 'bitacoras_usuarios',
    name: 'Bitácoras de Actividad & Auditoría',
    badge: 'Trazabilidad Total',
    desc: 'Módulo de auditoría que registra en MySQL quién creó, editó o eliminó registros, con fecha exacta, hora y dirección IP para máxima seguridad.',
    price: 1600,
    days: 2,
    category: 'base_backend',
    impact: 'seguridad',
    impactLabel: 'Auditoría MySQL',
    tags: ['Logs en MySQL', 'Auditoría', 'Trazabilidad'],
    icon: History
  },
  {
    id: 'mantenimiento_mensual',
    name: 'Póliza de Mantenimiento y Respaldos',
    badge: 'Soporte Continuo',
    desc: 'Monitoreo de disponibilidad, optimización periódica de velocidad, respaldos automáticos de la base de datos MySQL y soporte técnico prioritario.',
    price: 1200,
    days: 0,
    category: 'base_backend',
    impact: 'seguridad',
    impactLabel: 'Soporte Continuo',
    tags: ['Respaldos Diarios', 'Monitoreo 24/7', 'Soporte'],
    icon: Wrench
  },

  // B. Reportes, Documentos & Exportación de Datos
  {
    id: 'export_pdf',
    name: 'Generación Automática de PDFs Personalizados',
    badge: 'Dompdf / FPDF PHP',
    desc: 'Generación de facturas, notas de venta, cotizaciones o reportes en PDF con logotipo institucional, membrete, foliado y tablas automáticas.',
    price: 1400,
    days: 1,
    category: 'reportes_datos',
    impact: 'operaciones',
    impactLabel: 'Facturas & Notas',
    tags: ['PDF Dinámico', 'Membrete', 'Dompdf'],
    icon: FileText
  },
  {
    id: 'export_excel',
    name: 'Exportación de Datos a Excel (.xlsx)',
    badge: 'Consultas a Hoja de Cálculo',
    desc: 'Descarga instantánea de tablas y consultas MySQL en formato Excel profesional con filtros por fecha, sumatorias y columnas ordenadas.',
    price: 1500,
    days: 1,
    category: 'reportes_datos',
    impact: 'operaciones',
    impactLabel: 'Reportes Excel',
    tags: ['MySQL a Excel', 'PhpSpreadsheet', 'Descargas'],
    icon: FileSpreadsheet
  },
  {
    id: 'export_word',
    name: 'Generación de Documentos Word (.docx)',
    badge: 'Contratos Editables',
    desc: 'Creación y descarga de documentos de Word con plantillas personalizadas sustituyendo campos dinámicos de clientes y servicios.',
    price: 1800,
    days: 2,
    category: 'reportes_datos',
    impact: 'operaciones',
    impactLabel: 'Contratos Word',
    tags: ['Word Dinámico', 'Contratos', 'PHPWord'],
    icon: FileEdit
  },
  {
    id: 'datatables',
    name: 'DataTables Dinámicas con Búsqueda en Vivo',
    badge: 'Tablas Interactivas AJAX',
    desc: 'Integración de tablas interactivas con paginación, ordenamiento por columnas, selector de registros y filtrado instantáneo en vivo sin recargas.',
    price: 1200,
    days: 1,
    category: 'reportes_datos',
    impact: 'operaciones',
    impactLabel: 'Búsqueda AJAX',
    tags: ['DataTables JS', 'Búsqueda en Vivo', 'Filtros'],
    icon: Table
  },

  // C. Automatización, Comunicación & Herramientas
  {
    id: 'chatbot_reglas',
    name: 'Chatbot de Atención por Reglas (Sin IA)',
    badge: 'Cero Costos de APIs',
    desc: 'Asistente virtual flotante con botones interactivos y respuestas guiadas (horarios, servicios, precios, WhatsApp) sin depender de APIs de pago.',
    price: 2100,
    days: 2,
    category: 'automatizacion',
    impact: 'ventas',
    impactLabel: 'Atención 24/7',
    tags: ['Sin Pagos Mensuales', 'Botones Rápidos', 'Respuestas Claras'],
    icon: Bot
  },
  {
    id: 'correos_personalizados',
    name: 'Automatización de Correos (PHPMailer)',
    badge: 'Plantillas HTML Corporativas',
    desc: 'Configuración SMTP para envío automático de correos corporativos: confirmación de pedidos, alertas de usuarios y notificaciones del sistema.',
    price: 1400,
    days: 1,
    category: 'automatizacion',
    impact: 'operaciones',
    impactLabel: 'Alertas por Correo',
    tags: ['PHPMailer', 'SMTP Seguro', 'Plantillas HTML'],
    icon: Mail
  },
  {
    id: 'generador_qr',
    name: 'Generador Dinámico de Códigos QR',
    badge: 'Accesos Inmediatos',
    desc: 'Generación de códigos QR en pantalla o para impresión: consulta rápida de catálogo en celular, validación de tickets o folios de pedido.',
    price: 900,
    days: 1,
    category: 'automatizacion',
    impact: 'ventas',
    impactLabel: 'Acceso Móvil',
    tags: ['QR en Pantalla', 'Validación', 'Escaneo Celular'],
    icon: QrCode
  },
  {
    id: 'calendario_interactivo',
    name: 'Calendario Interactivo & Agenda de Citas',
    badge: 'Gestión de Reservas',
    desc: 'Módulo de calendario con selección de días, visualización de horarios libres/ocupados y agendamiento interactivo para clientes o pacientes.',
    price: 1800,
    days: 2,
    category: 'automatizacion',
    impact: 'ventas',
    impactLabel: 'Agenda & Citas',
    tags: ['FullCalendar', 'Citas Online', 'Agenda'],
    icon: Calendar
  },

  // D. Analítica, Interfaz & Experiencia (UI/UX)
  {
    id: 'graficas_metricas',
    name: 'Dashboard con Gráficas Interactivas',
    badge: 'Visualización de Datos',
    desc: 'Paneles analíticos con gráficos interactivos (Chart.js / SVG) para monitorear ventas, ingresos, volumen de inventario y actividad de usuarios.',
    price: 2200,
    days: 2,
    category: 'ui_ux',
    impact: 'operaciones',
    impactLabel: 'Métricas & KPIs',
    tags: ['Chart.js', 'Métricas de Ventas', 'KPIs Visuales'],
    icon: BarChart3
  },
  {
    id: 'alertas_personalizadas',
    name: 'Alertas y Modales Visuales Enriquecidos',
    badge: 'Feedback Estilo SweetAlert',
    desc: 'Notificaciones emergentes (toasts), modales interactivos de confirmación con AJAX y alertas visuales con animaciones fluidas.',
    price: 850,
    days: 1,
    category: 'ui_ux',
    impact: 'experiencia',
    impactLabel: 'Feedback Visual',
    tags: ['SweetAlert2', 'Toasts Flotantes', 'Feedback AJAX'],
    icon: Bell
  },
  {
    id: 'modo_oscuro',
    name: 'Switch de Tema Claro / Oscuro (Dark Mode)',
    badge: 'Experiencia Visual Moderna',
    desc: 'Interruptor visual con guardado de preferencia en el navegador del usuario y paletas diseñadas para alto contraste y ergonomía visual.',
    price: 950,
    days: 1,
    category: 'ui_ux',
    impact: 'experiencia',
    impactLabel: 'Dark / Light Mode',
    tags: ['Dark / Light Mode', 'Persistencia Local', 'CSS Moderno'],
    icon: Moon
  },
  {
    id: 'personalizador_apariencia',
    name: 'Panel de Personalización de Apariencia',
    badge: 'Control Total de Marca',
    desc: 'Apartado de configuración para que el cliente final pueda cambiar los colores principales, logotipo y estilos visuales de su sistema cuando quiera.',
    price: 1600,
    days: 1,
    category: 'ui_ux',
    impact: 'experiencia',
    impactLabel: 'Marca Propia',
    tags: ['Selector de Colores', 'Logo Dinámico', 'Branding'],
    icon: Palette
  }
];

export interface SmartGoalPreset {
  id: MockupDemoType;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  recommendedServices: string[];
  discountBadge: string;
  bestFor: string;
  highlightColor: string;
}

export const SMART_GOALS: SmartGoalPreset[] = [
  {
    id: 'catalogo',
    title: 'Vender Productos & Pedidos por WhatsApp',
    tagline: 'Comercios, tiendas físicas y marcas de retail',
    description: 'Catálogo de artículos con fotos, precios en MXN, carrito interactivo y botón directo para recibir pedidos estructurados en WhatsApp.',
    icon: ShoppingBag,
    recommendedServices: [
      'creacion_web',
      'backend_php',
      'db_mysql',
      'sistema_usuarios',
      'export_pdf',
      'chatbot_reglas',
      'alertas_personalizadas',
      'modo_oscuro'
    ],
    discountBadge: 'Pack E-Commerce: 15% Ahorro',
    bestFor: 'Ropa, tecnología, abarrotes, accesorios, refacciones',
    highlightColor: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/50 text-cyan-400'
  },
  {
    id: 'inventario',
    title: 'SaaS Almacén & Control de Stock (MySQL)',
    tagline: 'Bodegas, ferreterías, refaccionarias y distribuidoras',
    description: 'Software empresarial con barra lateral izquierda (Sidebar), control de entradas/salidas, DataTables con búsqueda AJAX y exportación a Excel.',
    icon: Package,
    recommendedServices: [
      'creacion_web',
      'backend_php',
      'db_mysql',
      'sistema_usuarios',
      'bitacoras_usuarios',
      'export_excel',
      'export_pdf',
      'datatables',
      'generador_qr',
      'alertas_personalizadas'
    ],
    discountBadge: 'Pack Almacén SaaS: Auditoría Incluida',
    bestFor: 'Control de stock, códigos de barra, entradas y salidas',
    highlightColor: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/50 text-emerald-400'
  },
  {
    id: 'citas',
    title: 'Agendar Citas, Consultas & Reservas',
    tagline: 'Consultorios médicos, dentistas, despachos y asesorías',
    description: 'Portal profesional con flujo de citas guiado por pasos, selección de horarios disponibles y confirmación por correo (PHPMailer).',
    icon: Calendar,
    recommendedServices: [
      'creacion_web',
      'backend_php',
      'db_mysql',
      'sistema_usuarios',
      'calendario_interactivo',
      'correos_personalizados',
      'alertas_personalizadas'
    ],
    discountBadge: 'Pack Citas: Agenda Automatizada',
    bestFor: 'Doctores, clínicas, abogados, consultores, talleres',
    highlightColor: 'from-violet-500/20 to-purple-500/20 border-violet-500/50 text-violet-400'
  },
  {
    id: 'dashboard',
    title: 'Gestión Empresarial & ERP / Facturación',
    tagline: 'Corporativos, pymes y empresas consolidadas',
    description: 'Dashboard ejecutivo con gráficas de ingresos en vivo, gestión de clientes, emisión de comprobantes en PDF y exportación completa a Excel.',
    icon: LayoutDashboard,
    recommendedServices: [
      'creacion_web',
      'backend_php',
      'db_mysql',
      'sistema_usuarios',
      'bitacoras_usuarios',
      'export_pdf',
      'export_excel',
      'datatables',
      'graficas_metricas',
      'alertas_personalizadas'
    ],
    discountBadge: 'Pack ERP: Solución Empresarial',
    bestFor: 'Supervisión de finanzas, ventas, pedidos y múltiples roles',
    highlightColor: 'from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-400'
  },
  {
    id: 'corporativo',
    title: 'Presencia de Marca & Portal B2B Ejecutivo',
    tagline: 'Empresas de servicios, constructoras y marcas corporativas',
    description: 'Presentación institucional de alto impacto para licitaciones, catálogo de servicios, portafolio de clientes y chatbot de atención.',
    icon: Globe,
    recommendedServices: [
      'creacion_web',
      'backend_php',
      'db_mysql',
      'chatbot_reglas',
      'correos_personalizados',
      'modo_oscuro',
      'personalizador_apariencia'
    ],
    discountBadge: 'Pack Corporativo: Marca Institucional',
    bestFor: 'Generación de prospectos y autoridad de marca B2B',
    highlightColor: 'from-blue-500/20 to-indigo-500/20 border-blue-500/50 text-blue-400'
  },
  {
    id: 'restaurante',
    title: 'Menú Digital QR & Comandas en Mesa',
    tagline: 'Restaurantes, cafeterías, taquerías y bares',
    description: 'Carta digital con categorías de alimentos, fotos, precios, pedidos por mesa con código QR escaneable y comanda enviada a WhatsApp.',
    icon: UtensilsCrossed,
    recommendedServices: [
      'creacion_web',
      'backend_php',
      'db_mysql',
      'generador_qr',
      'chatbot_reglas',
      'alertas_personalizadas',
      'modo_oscuro'
    ],
    discountBadge: 'Pack Gastronómico: QR en Mesas',
    bestFor: 'Restaurantes, bares, cafeterías y negocios de comida',
    highlightColor: 'from-rose-500/20 to-orange-500/20 border-rose-500/50 text-rose-400'
  }
];

export const WebInteractiveQuoter: React.FC = () => {
  // Demo seleccionado
  const [selectedDemo, setSelectedDemo] = useState<MockupDemoType>('catalogo');
  // Estilo de diseño visual
  const [designStyle, setDesignStyle] = useState<DesignStyleType>('saas_clean');

  // Datos del Cliente / Proyecto
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [giroNegocio, setGiroNegocio] = useState('');

  // Filtro de categorías para las tarjetas de servicios
  const [serviceFilter, setServiceFilter] = useState<'todos' | 'base_backend' | 'reportes_datos' | 'automatizacion' | 'ui_ux'>('todos');

  // Estado de los 18 servicios técnicos (reactivo a selecciones)
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    TECH_CATALOG.forEach((item) => {
      initial[item.id] = SMART_GOALS[0].recommendedServices.includes(item.id);
    });
    return initial;
  });

  // Apariencia de la Maqueta
  const [themeColor, setThemeColor] = useState<'cyan' | 'emerald' | 'violet' | 'amber' | 'blue' | 'rose'>('cyan');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Modalidad de Entrega (Normal vs Express)
  const [urgencia, setUrgencia] = useState<'normal' | 'express'>('normal');

  // Modal de Propuesta Formal
  const [showFormalModal, setShowFormalModal] = useState(false);
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteTelefono, setClienteTelefono] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');
  const [clienteNotas, setClienteNotas] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formalQuoteResult, setFormalQuoteResult] = useState<{
    folio: string;
    total: number;
    subtotal: number;
    iva: number;
    fecha: string;
    dias: number;
    listaServicios: string[];
  } | null>(null);

  // Toggle de un servicio individual
  const toggleService = (id: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Cargar preset de objetivo inteligente
  const handleSelectGoalPreset = (demoId: MockupDemoType) => {
    setSelectedDemo(demoId);
    const goalObj = SMART_GOALS.find((g) => g.id === demoId);
    if (goalObj) {
      setSelectedServices((prev) => {
        const next = { ...prev };
        TECH_CATALOG.forEach((item) => {
          next[item.id] = goalObj.recommendedServices.includes(item.id);
        });
        return next;
      });
    }
  };

  // Función para hacer scroll suave a la demostración abajo
  const scrollToDemo = () => {
    const demoElement = document.getElementById('demo-mockup-section');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Servicios filtrados por categoría
  const displayedServices = useMemo(() => {
    if (serviceFilter === 'todos') return TECH_CATALOG;
    return TECH_CATALOG.filter((s) => s.category === serviceFilter);
  }, [serviceFilter]);

  // Cálculo dinámico de inversión, anticipo y días
  const calculation = useMemo(() => {
    let totalPrice = 0;
    let totalDays = 0;
    const activeItems: TechServiceItem[] = [];

    TECH_CATALOG.forEach((item) => {
      if (selectedServices[item.id]) {
        totalPrice += item.price;
        totalDays += item.days;
        activeItems.push(item);
      }
    });

    if (totalDays === 0 && totalPrice > 0) totalDays = 3;

    if (urgencia === 'express') {
      totalPrice = Math.round(totalPrice * 1.25);
      totalDays = Math.max(3, Math.round(totalDays * 0.65));
    }

    const subtotal = Math.round(totalPrice / 1.16);
    const iva = totalPrice - subtotal;
    const anticipo50 = Math.round(totalPrice / 2);
    const finiquito50 = totalPrice - anticipo50;

    return {
      totalPrice,
      totalDays,
      subtotal,
      iva,
      anticipo50,
      finiquito50,
      activeItems,
      activeCount: activeItems.length
    };
  }, [selectedServices, urgencia]);

  // Handler para Checkout a WhatsApp con formato exacto requerido
  const handleCheckoutWhatsApp = () => {
    const goalObj = SMART_GOALS.find((g) => g.id === selectedDemo);
    const demoNombre = goalObj?.title || 'Sistema Web a Medida';
    const nombreFinal = nombreProyecto.trim() ? `${nombreProyecto.trim()} (${demoNombre})` : demoNombre;
    const apariencia = `${isDarkMode ? 'Modo Oscuro' : 'Modo Claro'} / Estilo ${designStyle.toUpperCase()} / Paleta ${themeColor.toUpperCase()}`;

    const listaServiciosText = calculation.activeItems.length > 0
      ? calculation.activeItems.map((s) => `• ${s.name} (${s.impactLabel})`).join('\n')
      : '• Creación de página base';

    const mensaje = `🚀 *Cotización de Desarrollo Web & Software - Inversa*

📋 *Proyecto:* ${nombreFinal}
🏢 *Giro del Negocio:* ${giroNegocio.trim() || 'N/A'}
🎨 *Tema y Apariencia:* ${apariencia}

🛠️ *Servicios y Módulos seleccionados (${calculation.activeCount}):*
${listaServiciosText}

💰 *Inversión Estimada:* $${formatPrice(calculation.totalPrice)} MXN (IVA incluido)
💵 *Esquema sugerido:* 50% Anticipo ($${formatPrice(calculation.anticipo50)} MXN) / 50% al Entregar ($${formatPrice(calculation.finiquito50)} MXN)
⏱️ *Tiempo sugerido:* ${calculation.totalDays} a ${calculation.totalDays + 3} días hábiles (${urgencia === 'express' ? 'Sprint Prioritario' : 'Estándar'})

¿Podemos agendar una llamada breve para revisar los requerimientos técnicos?`;

    const url = `https://wa.me/525547630737?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Handler para Registrar Propuesta Formal
  const handleSubmitFormalOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteNombre.trim() || !clienteTelefono.trim()) {
      alert('Por favor ingresa tu nombre y teléfono para emitir la propuesta formal.');
      return;
    }

    setIsSubmitting(true);
    try {
      const folio = `COT-INVERSA-${Math.floor(100000 + Math.random() * 900000)}`;
      const activeTitles = calculation.activeItems.map((a) => a.name).join(', ');
      const goalObj = SMART_GOALS.find((g) => g.id === selectedDemo);

      await createOrder({
        clienteNombre: clienteNombre.trim(),
        clienteTelefono: clienteTelefono.trim(),
        clienteEmail: clienteEmail.trim() || undefined,
        items: [
          {
            productoId: `web-${Date.now()}`,
            titulo: `Desarrollo Web: ${nombreProyecto || goalObj?.title} [Folio: ${folio}]`,
            precio: calculation.totalPrice,
            cantidad: 1,
            tipo: 'servicio_web'
          }
        ],
        total: calculation.totalPrice,
        estado: 'pendiente',
        notas: `Folio: ${folio} | Meta: ${goalObj?.title} | Estilo: ${designStyle} | Negocio: ${giroNegocio || 'N/A'} | Modalidad: ${urgencia} | Servicios (${calculation.activeCount}): ${activeTitles}. Notas del cliente: ${clienteNotas}`
      });

      setFormalQuoteResult({
        folio,
        total: calculation.totalPrice,
        subtotal: calculation.subtotal,
        iva: calculation.iva,
        fecha: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
        dias: calculation.totalDays,
        listaServicios: calculation.activeItems.map((a) => a.name)
      });
    } catch (err) {
      console.error('Error al registrar propuesta formal:', err);
      alert('Hubo un inconveniente al registrar la propuesta. Por favor intenta por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-2 sm:px-4 space-y-12">
      
      {/* 1. Header Banner Principal de Alta Conversión */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#090e18] to-[#05070e] border border-cyan-500/25 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Code2 className="w-56 h-56 text-cyan-400" />
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            CONFIGURADOR INTELIGENTE DE SOFTWARE &amp; DESARROLLO WEB
          </div>

          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Arma tu Sistema Web &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
              Visualízalo en Tiempo Real
            </span>
          </h2>

          <p className="text-xs sm:text-base text-slate-300 mt-3.5 leading-relaxed max-w-2xl">
            Desarrollamos cualquier tipo de plataforma: tiendas en línea, sistemas de inventario SaaS, agendas médicas, portales B2B y apps de pedidos basados en: 
            <strong> PHP 8.3, MySQL, Bootstrap 5, AJAX y DataTables sin rentas mensuales forzosas</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToDemo}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-lg shadow-cyan-500/25 active:scale-95 group"
            >
              <Eye className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
              <span>Ver Demostración en Vivo Abajo</span>
              <ArrowDown className="w-4 h-4 text-black animate-bounce" />
            </button>
            <span className="text-xs text-slate-400 font-mono">
              ⚡ Maqueta especializada interactiva en pantalla completa
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 2: DEMOSTRADOR DE GIROS - HACEMOS TODO TIPO DE WEBS */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f172a] border border-[#1e293b] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
              VERSATILIDAD INDUSTRIAL &amp; COMERCIAL
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              ¿Cuál es tu sector? Desarrollamos Soluciones Especializadas para Cada Giro
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Haz clic en tu sector para adaptar el configurador y la maqueta
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'catalogo', label: 'Tiendas & Retail', icon: ShoppingBag, desc: 'E-commerce & WhatsApp' },
            { id: 'inventario', label: 'Bodegas & Almacén', icon: Package, desc: 'SaaS Stock & Excel' },
            { id: 'citas', label: 'Salud & Clínicas', icon: HeartPulse, desc: 'Agenda & Expedientes' },
            { id: 'dashboard', label: 'Pymes & ERP', icon: LayoutDashboard, desc: 'Finanzas & Facturación' },
            { id: 'corporativo', label: 'Corporativos B2B', icon: Building, desc: 'Portales Institucionales' },
            { id: 'restaurante', label: 'Restaurantes & Bares', icon: UtensilsCrossed, desc: 'Menú QR & Comandas' }
          ].map((sector) => {
            const Icon = sector.icon;
            const isSelected = selectedDemo === sector.id;

            return (
              <button
                key={sector.id}
                onClick={() => handleSelectGoalPreset(sector.id as MockupDemoType)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500 ring-1 ring-cyan-500/40 shadow-lg'
                    : 'bg-[#080c14] border-[#1e293b] hover:border-slate-600'
                }`}
              >
                <div className={`p-2 rounded-xl w-fit mb-2 ${isSelected ? 'bg-cyan-500 text-black' : 'bg-white/5 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white leading-tight">{sector.label}</h5>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{sector.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 3: PERSONALIDAD VISUAL & TIPOGRAFÍAS DE VANGUARDIA */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f172a] border border-[#1e293b] shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono tracking-widest uppercase mb-1">
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              IDENTIDAD &amp; TIPOGRAFÍA A LA MEDIDA
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              Cada Negocio Necesita su Propio Lenguaje Visual
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              No hacemos sitios idénticos. Cambia la atmósfera, tipografía real de Google Fonts, paleta de colores y estilo de bordes con un solo clic. Mira cómo la maqueta se transforma en vivo al instante:
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToDemo}
            className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver transformación abajo ↓</span>
          </button>
        </div>

        {/* Grid de las 6 opciones de estilos con muestras tipográficas en vivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {[
            {
              id: 'boutique',
              name: 'Boutique & Lujo Editorial',
              inspiration: 'Estilo Squarespace / Editorial',
              fontTag: 'Playfair Display Serif',
              fontClass: 'font-serif',
              sampleHeadline: 'Elegance & Atelier Privé',
              tagline: 'Líneas finas, tonos arena/marfil y cursivas de alta gama',
              bestFor: 'Joyería, Perfumería, Hoteles Boutique & Alta Cocina',
              accentBadge: 'bg-[#BFA181]/20 text-[#D4AF37] border-[#BFA181]/40',
              previewCard: 'bg-[#1C1917] border-[#38312A]'
            },
            {
              id: 'saas_clean',
              name: 'SaaS Enterprise & Minimal',
              inspiration: 'Estilo Stripe / Linear / Ramotion',
              fontTag: 'Plus Jakarta Sans',
              fontClass: 'font-sans font-bold',
              sampleHeadline: 'Cloud Data Architecture',
              tagline: 'Bordes micro de 1px, alta densidad y cobalto nítido',
              bestFor: 'ERPs, Almacenes, FinTech, B2B & Logística',
              accentBadge: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
              previewCard: 'bg-[#111C33] border-blue-900/60'
            },
            {
              id: 'bold_creative',
              name: 'Bold Creative & Startup',
              inspiration: 'Estilo Tubik / Dribbble Trending',
              fontTag: 'Syne 800 Ultra-Black',
              fontClass: 'font-syne font-black',
              sampleHeadline: 'BREAK THE RULES 🔥',
              tagline: 'Botones pill chunky, curvas 3D y energía naranja',
              bestFor: 'Streetwear, Sneakers, Agencias & Eventos',
              accentBadge: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
              previewCard: 'bg-[#1C1827] border-purple-900/50'
            },
            {
              id: 'neo_brutalist',
              name: 'Neo-Brutalismo Pop',
              inspiration: 'Estilo Gumroad / Figma / Indie',
              fontTag: 'Space Grotesk Black',
              fontClass: 'font-grotesk font-black uppercase',
              sampleHeadline: 'RAW POP RETRO ★ 100%',
              tagline: 'Bordes negros 2px, sombras duras 3D y colores saturados',
              bestFor: 'Creadores, Merch, Gamers & Cursos Digitales',
              accentBadge: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/40',
              previewCard: 'bg-[#1E293B] border-2 border-white/80 shadow-[3px_3px_0px_0px_#fff]'
            },
            {
              id: 'cyber_tech',
              name: 'Cyber Tech & Terminal',
              inspiration: 'Estilo QClay / Web3 Terminal',
              fontTag: 'JetBrains Mono',
              fontClass: 'font-mono font-bold',
              sampleHeadline: '> SYS.STATUS_200 [LIVE]',
              tagline: 'OLED puro, rejilla técnica y resplandor neón cian',
              bestFor: 'Ciberseguridad, Hosting, Hardware & TI',
              accentBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
              previewCard: 'bg-[#090E17] border-cyan-500/40'
            },
            {
              id: 'warm_organic',
              name: 'Bienestar & Orgánico Cálido',
              inspiration: 'Estilo Calm / Notion / Ritual',
              fontTag: 'Outfit Humanist',
              fontClass: 'font-outfit font-bold',
              sampleHeadline: 'Armonía & Salud Natural 🌿',
              tagline: 'Lienzo avena, salvia botánica y curvas suaves',
              bestFor: 'Clínicas, Nutrición, Psicología & Cafés',
              accentBadge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
              previewCard: 'bg-[#22211E] border-[#3E3A33]'
            }
          ].map((styleOpt) => {
            const isSelected = normalizeDesignStyle(designStyle) === styleOpt.id;

            return (
              <button
                key={styleOpt.id}
                type="button"
                onClick={() => setDesignStyle(styleOpt.id as DesignStyleType)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-500/50 shadow-xl shadow-cyan-950/50'
                    : 'bg-[#0a0f1d] border-[#1e293b] hover:border-slate-600'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                )}

                <div>
                  {/* Badge de Inspiración y Fuente */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border font-bold ${styleOpt.accentBadge}`}>
                      {styleOpt.fontTag}
                    </span>
                  </div>

                  {/* Nombre del Estilo */}
                  <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                    {styleOpt.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {styleOpt.inspiration}
                  </span>

                  {/* Muestra Tipográfica en Vivo con su Google Font Real */}
                  <div className={`mt-3 p-2.5 rounded-xl border ${styleOpt.previewCard}`}>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">
                      Muestra tipográfica:
                    </span>
                    <span className={`text-xs block leading-snug text-slate-100 ${styleOpt.fontClass}`}>
                      {styleOpt.sampleHeadline}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/30">
                  <span className="text-[10px] text-slate-400 block line-clamp-2">
                    {styleOpt.tagline}
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-cyan-400/90 font-bold">
                      {isSelected ? '✓ Activo en Maqueta' : 'Clic para previsualizar'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 4: CONFIGURADOR & PANEL DE PRESUPUESTO */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: CONFIGURADOR INTELIGENTE (8 COLS) */}
        <div className="lg:col-span-8 space-y-7">
          
          {/* PASO 1: OBJETIVO INTELIGENTE */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0f172a] border border-[#1e293b] shadow-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                1
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  Objetivo Principal del Sistema Web
                </h3>
                <p className="text-xs text-slate-400">
                  Selecciona la meta de tu proyecto para precargar los módulos recomendados:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {SMART_GOALS.map((goal) => {
                const isSelected = selectedDemo === goal.id;
                const IconComponent = goal.icon;

                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => handleSelectGoalPreset(goal.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                      isSelected
                        ? `bg-gradient-to-br ${goal.highlightColor} ring-1 ring-cyan-500/40 shadow-lg`
                        : 'bg-[#080c14] border-[#1e293b] hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/50 text-slate-200">
                          {goal.discountBadge}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                      </div>

                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-4 h-4 text-cyan-400" />
                        </div>
                        <h4 className="text-xs font-black text-white leading-tight">
                          {goal.title}
                        </h4>
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                        {goal.description}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">{goal.recommendedServices.length} módulos clave</span>
                      <span className="text-cyan-400 font-bold group-hover:underline flex items-center gap-1">
                        Cargar en demo →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASO 2: ESTILO VISUAL & IDENTIDAD */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0f172a] border border-[#1e293b] shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                2
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  Estilo de Diseño &amp; Identidad de Marca
                </h3>
                <p className="text-xs text-slate-400">
                  Selecciona la personalidad visual deseada e ingresa el nombre de tu proyecto:
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                Estilo de Diseño para la Maqueta:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'moderno', label: '✨ Moderno & Minimal', desc: 'Espacios limpios y estética Apple' },
                  { id: 'corporativo', label: '🏛️ Corporativo Sólido', desc: 'Estructura formal e institucional' },
                  { id: 'tech', label: '⚡ Cyber Tech Neón', desc: 'Terminal y resplandores neón' },
                  { id: 'retail', label: '🔥 Comercial Retail', desc: 'Oferta flash y alta conversión' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setDesignStyle(st.id as DesignStyleType)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      designStyle === st.id
                        ? 'bg-cyan-950/40 border-cyan-500 text-white ring-1 ring-cyan-500/30 shadow-md'
                        : 'bg-[#080c14] border-[#1e293b] text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <span className="text-xs font-bold block mb-0.5">{st.label}</span>
                    <span className="text-[10px] text-slate-400 block leading-tight">{st.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1e293b]/60">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nombre de tu Negocio / Empresa *
                </label>
                <input
                  type="text"
                  value={nombreProyecto}
                  onChange={(e) => setNombreProyecto(e.target.value)}
                  placeholder="Ej. Distribuidora Gómez / Clínica Silva / Tienda Pro"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] focus:border-cyan-500 text-white text-xs placeholder:text-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Giro Comercial (Opcional)
                </label>
                <input
                  type="text"
                  value={giroNegocio}
                  onChange={(e) => setGiroNegocio(e.target.value)}
                  placeholder="Ej. Ferretería / Consulta Médica / E-Commerce"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] focus:border-cyan-500 text-white text-xs placeholder:text-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* PASO 3: CATÁLOGO DE LOS 18 SERVICIOS TIPO POWER-UP */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0f172a] border border-[#1e293b] shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                  3
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    Módulos y Capacidades Técnicas (Power-Ups)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Activa o desactiva las funcionalidades que necesitas en tu sistema:
                  </p>
                </div>
              </div>

              <div className="font-mono text-xs text-right">
                <span className="text-slate-400">Módulos Activos: </span>
                <span className="text-cyan-400 font-black">{calculation.activeCount} de 18</span>
              </div>
            </div>

            {/* Pestañas de Filtro de Categorías */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar border-b border-[#1e293b]">
              {[
                { id: 'todos', label: 'Todos (18)' },
                { id: 'base_backend', label: 'Base & Backend' },
                { id: 'reportes_datos', label: 'Reportes & PDFs' },
                { id: 'automatizacion', label: 'Automatizaciones & QR' },
                { id: 'ui_ux', label: 'Diseño & UX' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setServiceFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    serviceFilter === tab.id
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'bg-[#080c14] text-slate-400 hover:text-white border border-[#1e293b]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Grid de Tarjetas con Switch iOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {displayedServices.map((service) => {
                const isChecked = !!selectedServices[service.id];
                const IconComp = service.icon;

                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                      isChecked
                        ? 'bg-[#0b1424] border-cyan-500/60 ring-1 ring-cyan-500/30 shadow-md'
                        : 'bg-[#080c14] border-[#1e293b] hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl transition-colors ${
                            isChecked ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-400'
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                              {service.name}
                            </h5>
                            <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                              {service.badge}
                            </span>
                          </div>
                        </div>

                        {/* Switch iOS */}
                        <div
                          className={`w-10 h-5 rounded-full transition-colors relative shrink-0 mt-0.5 ${
                            isChecked ? 'bg-cyan-500' : 'bg-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                              isChecked ? 'left-5' : 'left-0.5'
                            }`}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {service.desc}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          service.impact === 'ventas'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : service.impact === 'seguridad'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-cyan-500/20 text-cyan-400'
                        }`}>
                          {service.impactLabel}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToDemo();
                          }}
                          className="text-[10px] text-slate-400 hover:text-cyan-300 underline hidden sm:inline"
                        >
                          Ver en demo ↓
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-white block">+${formatPrice(service.price)} MXN</span>
                        <span className="text-[10px] text-slate-400 block">+{service.days} {service.days === 1 ? 'día' : 'días'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: TARJETA FIJA DE PRESUPUESTO & FACILIDADES (4 COLS) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0f172a] border border-[#1e293b] shadow-2xl space-y-5">
            
            <div className="border-b border-[#1e293b] pb-3.5">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  PRESUPUESTO EN TIEMPO REAL
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-bold">
                  {calculation.activeCount} Módulos
                </span>
              </div>
              <h3 className="text-base font-bold text-white truncate">
                {nombreProyecto.trim() ? nombreProyecto.trim() : 'Tu Solución Web'}
              </h3>
              {giroNegocio.trim() && (
                <span className="text-xs text-slate-400 block truncate">{giroNegocio.trim()}</span>
              )}
            </div>

            {/* Total Display con Ajuste Fluido */}
            <div>
              <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-white tracking-tight break-all">
                  ${formatPrice(calculation.totalPrice)}
                </span>
                <span className="text-xs text-cyan-400 font-mono font-bold">MXN</span>
              </div>

              <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-300 font-mono">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Entrega: <strong>{calculation.totalDays} a {calculation.totalDays + 3} días hábiles</strong>
                </span>
              </div>

              {/* Esquema de Pago Comercial */}
              <div className="mt-3.5 p-3 rounded-xl bg-[#080c14] border border-[#1e293b] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>50% Anticipo al iniciar:</span>
                  <span className="font-bold text-white">${formatPrice(calculation.anticipo50)} MXN</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>50% Finiquito contra entrega:</span>
                  <span className="font-bold text-slate-300">${formatPrice(calculation.finiquito50)} MXN</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 flex-wrap text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-slate-700">
                  Arquitectura: <strong className="text-cyan-400 uppercase">{selectedDemo}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-slate-700">
                  Estilo: <strong className="text-cyan-400 uppercase">{designStyle}</strong>
                </span>
              </div>
            </div>

            {/* BOTÓN 1: VER DEMOSTRACIÓN EN VIVO (MANDA ABAJO) */}
            <button
              type="button"
              onClick={scrollToDemo}
              className="w-full py-3.5 px-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 active:scale-95 group"
            >
              <Eye className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
              <span>Ver Demostración en Vivo Abajo</span>
              <ArrowDown className="w-4 h-4 text-black animate-bounce" />
            </button>

            {/* BOTÓN 2: CHECKOUT DIRECTO A WHATSAPP */}
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95"
            >
              <Send className="w-4 h-4 text-black" />
              <span>Solicitar Cotización por WhatsApp</span>
            </button>

            {/* Desglose Fiscal */}
            <div className="pt-3 border-t border-[#1e293b] space-y-2 text-xs font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal Estimado:</span>
                <span className="text-slate-300">${formatPrice(calculation.subtotal)} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>I.V.A. (16%):</span>
                <span className="text-slate-300">${formatPrice(calculation.iva)} MXN</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-1.5 border-t border-white/5 text-sm">
                <span>Inversión Total:</span>
                <span className="text-cyan-400">${formatPrice(calculation.totalPrice)} MXN</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowFormalModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#080c14] hover:bg-[#131b2e] border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>Generar Propuesta Formal PDF / Folio</span>
            </button>

            {/* Garantías de Alto Valor */}
            <div className="pt-3 border-t border-[#1e293b] space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantía de 6 meses contra fallas de código</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Código y base de datos 100% tuya sin rentas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Precios transparentes con IVA desglosado</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 4: CALCULADORA DE AHORRO (INVERSA VS SHOPIFY/WIX/SAAS) */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1628] to-[#080d19] border border-emerald-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <TrendingDown className="w-4 h-4" />
              ANÁLISIS DE RENTABILIDAD &amp; AHORRO A 3 AÑOS
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ¿Por qué Inversa es más Rentable que Rentar en Shopify, Wix o SaaS?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              En plataformas de renta pagas mensualidades de por vida y comisiones por venta. Con Inversa, el software es 100% tuyo desde el primer día.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center shrink-0">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">Ahorro Promedio a 3 Años</span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">$45,000+ MXN</span>
            <span className="text-[10px] text-emerald-300 block mt-0.5">Dinero que se queda en tu negocio</span>
          </div>
        </div>

        {/* Tabla Comparativa Directa */}
        <div className="rounded-2xl border border-[#1e293b] overflow-x-auto bg-[#080c14]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-slate-300 border-b border-slate-800 text-[11px] uppercase">
              <tr>
                <th className="p-3.5">Característica Clave</th>
                <th className="p-3.5 text-cyan-400 font-black">Desarrollo Inversa (PHP + MySQL)</th>
                <th className="p-3.5 text-rose-400">Plataformas de Renta (Shopify / Wix / SaaS)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              <tr>
                <td className="p-3.5 font-bold font-sans text-slate-200">Renta Mensual de por vida</td>
                <td className="p-3.5 font-black text-emerald-400">$0 MXN / mes (Pago único de desarrollo)</td>
                <td className="p-3.5 text-rose-400">$700 a $2,500 MXN / mes ($30,000+ a 3 años)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold font-sans text-slate-200">Comisión por cada venta</td>
                <td className="p-3.5 font-black text-emerald-400">0% de comisión (Todas las ganancias son tuyas)</td>
                <td className="p-3.5 text-rose-400">2% al 5% de comisión adicional por transacción</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold font-sans text-slate-200">Propiedad de la Base de Datos</td>
                <td className="p-3.5 font-black text-emerald-400">100% tuya en MySQL. Respaldos descargables</td>
                <td className="p-3.5 text-rose-400">Atada a la plataforma. Si cancelas, pierdes todo</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold font-sans text-slate-200">Personalización de Código</td>
                <td className="p-3.5 font-black text-emerald-400">Ilimitada: adaptada a la lógica exacta de tu negocio</td>
                <td className="p-3.5 text-rose-400">Limitada a plantillas y plugins con cobro mensual</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 5: ROADMAP DE TRABAJO EN 4 PASOS (CERTIDUMBRE TOTAL) */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f172a] border border-[#1e293b] shadow-xl space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
            MÉTODO DE TRABAJO INVERSA
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Transparencia y Seguridad: Tu Proyecto en 4 Etapas Claras
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Eliminamos la incertidumbre con entregas parciales y validación continua en servidores de prueba antes de lanzar:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { paso: '01', tit: 'Levantamiento & Folio', plazo: 'Día 1', desc: 'Revisión técnica de requerimientos, emisión de folio formal y confirmación de especificaciones.' },
            { paso: '02', tit: 'Maquetación Interactiva', plazo: 'Días 2-3', desc: 'Diseño responsivo de pantallas, validación visual en vivo con el cliente y aprobación de flujos.' },
            { paso: '03', tit: 'Backend PHP & MySQL', plazo: 'Días 4-7', desc: 'Programación de lógica, modelado de base de datos, módulos AJAX, PDFs y pruebas de seguridad.' },
            { paso: '04', tit: 'Despliegue & Entrega', plazo: 'Día 8+', desc: 'Instalación en servidor con certificado SSL, entrega de código fuente + base de datos y capacitación.' }
          ].map((etapa) => (
            <div key={etapa.paso} className="p-5 rounded-2xl bg-[#080c14] border border-[#1e293b] relative overflow-hidden">
              <span className="text-3xl font-black font-mono text-cyan-500/20 absolute top-3 right-3">{etapa.paso}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold inline-block mb-2">
                {etapa.plazo}
              </span>
              <h5 className="text-sm font-bold text-white mb-1">{etapa.tit}</h5>
              <p className="text-xs text-slate-400 leading-relaxed">{etapa.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 6: DEMOSTRACIÓN PANORÁMICA HORIZONTAL EN VIVO */}
      {/* ========================================================= */}
      <section id="demo-mockup-section" className="pt-4">
        
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Monitor className="w-3.5 h-3.5" />
              VISTA PANORÁMICA DE LA DEMOSTRACIÓN (LIVE MOCKUP)
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Así es como Interactuarán tus Clientes con tu Sistema
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Explora la arquitectura especializada: en <strong>Almacén</strong> tienes un SaaS con barra lateral; en <strong>Tienda</strong> cuentas con carrito y cupones; en <strong>Citas</strong> un portal médico; y en <strong>Restaurante</strong> menús QR en mesa.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-slate-300 text-xs font-bold border border-[#1e293b] transition-all flex items-center gap-1.5"
            >
              <span>↑ Subir a Servicios</span>
            </button>
            <button
              onClick={handleCheckoutWhatsApp}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-black transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-black" />
              <span>Cotizar Ahora</span>
            </button>
          </div>
        </div>

        {/* Componente Panorámico */}
        <div className="w-full">
          <WebsiteMockupPreview
            projectName={nombreProyecto}
            selectedDemo={selectedDemo}
            onSelectDemo={handleSelectGoalPreset}
            designStyle={designStyle}
            onSelectDesignStyle={setDesignStyle}
            services={selectedServices}
            themeColor={themeColor}
            onChangeThemeColor={setThemeColor}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        </div>

      </section>

      {/* ========================================================= */}
      {/* MODAL: GENERACIÓN DE PROPUESTA FORMAL CON FOLIO */}
      {/* ========================================================= */}
      {showFormalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0f172a] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 max-h-[90vh] overflow-y-auto">
            
            {!formalQuoteResult ? (
              <form onSubmit={handleSubmitFormalOrder}>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1e293b]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Generar Propuesta Formal</h3>
                      <span className="text-xs text-slate-400">Emisión de Folio Oficial Inversa</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFormalModal(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nombre Completo o Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={clienteNombre}
                      onChange={(e) => setClienteNombre(e.target.value)}
                      placeholder="Lic. Roberto Sánchez"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Teléfono de Contacto (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clienteTelefono}
                      onChange={(e) => setClienteTelefono(e.target.value)}
                      placeholder="+52 55 1234 5678"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={clienteEmail}
                      onChange={(e) => setClienteEmail(e.target.value)}
                      placeholder="contacto@empresa.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Notas del Proyecto
                    </label>
                    <textarea
                      rows={2}
                      value={clienteNotas}
                      onChange={(e) => setClienteNotas(e.target.value)}
                      placeholder="Ej. Integración con mi inventario de ferretería..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#080c14] border border-[#1e293b] text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#080c14] border border-[#1e293b] mb-6 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">Total presupuestado:</span>
                  <span className="text-cyan-400 font-bold text-sm">
                    ${formatPrice(calculation.totalPrice)} MXN
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFormalModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirmar Folio'}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1e293b]">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Cotización Formal Registrada</h3>
                    <span className="text-xs font-mono text-cyan-400">Folio: #{formalQuoteResult.folio}</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs bg-[#080c14] p-4 rounded-xl border border-[#1e293b] mb-5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cliente:</span>
                    <span className="font-bold text-white font-sans">{clienteNombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Proyecto:</span>
                    <span className="font-bold text-cyan-300 font-sans">
                      {nombreProyecto || 'Sistema a la Medida'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fecha:</span>
                    <span className="text-slate-300">{formalQuoteResult.fecha}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Plazo:</span>
                    <span className="text-slate-300">{formalQuoteResult.dias} días hábiles</span>
                  </div>
                  <div className="border-t border-[#1e293b] pt-2 flex justify-between">
                    <span className="text-slate-400">Subtotal:</span>
                    <span className="text-slate-300">${formatPrice(formalQuoteResult.subtotal)} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">I.V.A.:</span>
                    <span className="text-slate-300">${formatPrice(formalQuoteResult.iva)} MXN</span>
                  </div>
                  <div className="flex justify-between font-bold text-cyan-400 text-sm pt-1 border-t border-white/5">
                    <span>Total:</span>
                    <span>${formatPrice(formalQuoteResult.total)} MXN</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 mb-5">
                  <span className="font-bold text-cyan-400 block mb-1">Módulos ({formalQuoteResult.listaServicios.length}):</span>
                  <p className="line-clamp-3 text-slate-400 text-[11px]">
                    {formalQuoteResult.listaServicios.join(' • ')}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#080c14] hover:bg-[#151d2f] border border-[#1e293b] text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-slate-400" />
                    Imprimir Comprobante
                  </button>
                  <button
                    onClick={() => {
                      setShowFormalModal(false);
                      setFormalQuoteResult(null);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
