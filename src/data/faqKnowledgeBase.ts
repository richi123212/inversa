export interface FaqItem {
  id: string;
  categoria: 'hardware' | 'envios' | 'facturacion' | 'desarrollo_web' | 'pagos' | 'soporte';
  categoriaLabel: string;
  pregunta: string;
  sinonimos?: string[];
  keywords: string[];
  respuesta: string;
  destacada: boolean;
  actionType?: 'ir_hardware' | 'ir_cotizador' | 'whatsapp';
  actionLabel?: string;
  actionPayload?: string;
}

export const FAQ_TOPICS = [
  { id: 'todos', label: 'Todos los Temas' },
  { id: 'hardware', label: 'Hardware & Equipos' },
  { id: 'envios', label: 'Envíos & Logística' },
  { id: 'facturacion', label: 'Facturación' },
  { id: 'desarrollo_web', label: 'Sitios Web & Software' },
  { id: 'pagos', label: 'Métodos de Pago' },
  { id: 'soporte', label: 'Asesor Humano' }
] as const;

export const FAQ_KNOWLEDGE_BASE: FaqItem[] = [
  // 1. HARDWARE & EQUIPOS
  {
    id: 'faq-hw-garantia',
    categoria: 'hardware',
    categoriaLabel: 'Hardware & Equipos',
    pregunta: '¿Los productos de hardware cuentan con garantía oficial?',
    sinonimos: [
      'que garantia tienen los productos',
      'tienen garantia las laptops y monitores',
      'cuanto tiempo dura la garantia',
      'politica de devolucion'
    ],
    keywords: ['garantia', 'garantias', 'poliza', 'defecto', 'devolucion', 'soporte', 'oficial', 'falla', 'marca', 'apple', 'asus', 'sony'],
    respuesta: `Todos los componentes y dispositivos de Inversa son **100% nuevos, sellados de fábrica y cuentan con garantía oficial** respaldada tanto por el fabricante de la marca (de 1 a 3 años según el modelo) como por nuestra póliza de satisfacción Inversa.

• **Laptops & Workstations:** 1 a 2 años de cobertura oficial directa.
• **Componentes y GPU:** Hasta 3 años de garantía con fabricante.
• **Periféricos & Audio:** 12 meses de sustitución por defectos técnicos.

Si tu equipo presenta alguna eventualidad, gestionamos la revisión y reemplazo inmediato sin trabas burocráticas.`,
    destacada: true,
    actionType: 'ir_hardware',
    actionLabel: 'Explorar Catálogo de Hardware'
  },
  {
    id: 'faq-hw-autenticidad',
    categoria: 'hardware',
    categoriaLabel: 'Hardware & Equipos',
    pregunta: '¿El hardware es nuevo o reconstruido / refurbished?',
    sinonimos: [
      'son nuevos los productos',
      'venden cosas usadas o reacondicionadas',
      'equipos refurbished o nuevos'
    ],
    keywords: ['nuevo', 'sellado', 'refurbished', 'usado', 'reconstruido', 'original', 'autentico', 'caja'],
    respuesta: `En Inversa **únicamente comercializamos hardware 100% nuevo de grado profesional**, en caja sellada con sellos holográficos de importación legal y pedimento aduanal en regla.

No comercializamos productos reconstruidos, open-box ni reacondicionados. Cada unidad conserva sus números de serie auditables.`,
    destacada: false,
    actionType: 'ir_hardware',
    actionLabel: 'Ver Dispositivos Disponibles'
  },
  {
    id: 'faq-hw-custom-pc',
    categoria: 'hardware',
    categoriaLabel: 'Hardware & Equipos',
    pregunta: '¿Pueden armar una workstation o PC a la medida de mis requerimientos?',
    sinonimos: [
      'arman computadoras a la medida',
      'puedo pedir una pc personalizada',
      'ensamblan workstations para render o ia'
    ],
    keywords: ['armar', 'ensamble', 'custom', 'medida', 'workstation', 'personalizada', 'render', 'ia', 'especificaciones'],
    respuesta: `¡Por supuesto! Diseñamos y ensamblamos configuraciones personalizadas para renderizado 3D, ciencia de datos, arquitectura y desarrollo de software de alta exigencia.

Puedes indicarnos tus requisitos de CPU, GPU, memoria RAM y almacenamiento con nuestro equipo de ingeniería por WhatsApp para recibir una cotización a la medida.`,
    destacada: true,
    actionType: 'whatsapp',
    actionLabel: 'Solicitar Configuración a la Medida',
    actionPayload: 'Hola Inversa, deseo cotizar una configuración de Workstation / PC personalizada con especificaciones técnicas a la medida.'
  },

  // 2. ENVÍOS & LOGÍSTICA
  {
    id: 'faq-env-cobertura',
    categoria: 'envios',
    categoriaLabel: 'Envíos & Logística',
    pregunta: '¿Hacen envíos a todo México y cuánto tardan en llegar?',
    sinonimos: [
      'cuanto tarda el envio',
      'hacen envios a toda la republica',
      'que paqueteria usan',
      'costo de envio a mi ciudad'
    ],
    keywords: ['envio', 'envios', 'mexico', 'republica', 'dhl', 'fedex', 'paqueteria', 'tiempo', 'tardan', 'llegar', 'flete', 'costo'],
    respuesta: `Realizamos **envíos asegurados a las 32 entidades federativas de la República Mexicana** a través de convenios prioritarios con DHL Express, FedEx y Estafeta.

• **Tiempos de entrega:** De 2 a 4 días hábiles en zonas metropolitanas y de 3 a 5 días en zonas extendidas.
• **Rastreo continuo:** En cuanto tu pedido se despacha, recibes tu número de guía y enlace de seguimiento en tiempo real.
• **Seguro total:** Todos los paquetes viajan con seguro contra extravío o daño físico en tránsito.`,
    destacada: true,
    actionType: 'ir_hardware',
    actionLabel: 'Ver Productos con Envío'
  },
  {
    id: 'faq-env-empaque',
    categoria: 'envios',
    categoriaLabel: 'Envíos & Logística',
    pregunta: '¿Cómo protegen el hardware durante el transporte?',
    sinonimos: [
      'viene bien protegido el paquete',
      'empaque de seguridad para componentes delicados'
    ],
    keywords: ['empaque', 'proteccion', 'caja', 'antietatica', 'burbuja', 'delicado', 'seguridad'],
    respuesta: `Todo el hardware viaja con empaque industrial reforzado de alta densidad, cajas exteriores de doble corrugado, protección antiestática y sellos de inviolabilidad. Garantizamos que tu equipo llegue en perfectas condiciones estéticas y operativas.`,
    destacada: false
  },

  // 3. FACTURACIÓN CFDI 4.0
  {
    id: 'faq-fac-cfdi',
    categoria: 'facturacion',
    categoriaLabel: 'Facturación CFDI',
    pregunta: '¿Emiten factura fiscal válida ante el SAT (CFDI 4.0)?',
    sinonimos: [
      'facturan con iva',
      'dan factura sat',
      'puedo deducir la compra',
      'como pido mi factura cfdi 4'
    ],
    keywords: ['factura', 'facturacion', 'cfdi', 'sat', 'iva', 'fiscal', 'deducir', 'rfc', 'constancia', 'regimen'],
    respuesta: `**Sí, el 100% de nuestras operaciones pueden ser facturadas bajo el estándar CFDI 4.0 del SAT**, tanto para personas físicas como para personas morales (empresas).

• Todos los precios mostrados incluyen IVA o desglosan el impuesto correspondiente.
• Puedes ingresar tu RFC, Razón Social, Régimen Fiscal y Uso de CFDI al realizar tu pedido o enviárnoslo por WhatsApp / correo.
• Tu factura digital (archivos XML y PDF) se emite dentro de las 24 a 48 horas posteriores a la confirmación de pago.`,
    destacada: true,
    actionType: 'whatsapp',
    actionLabel: 'Consultar con Facturación',
    actionPayload: 'Hola, tengo una consulta sobre emisión de factura fiscal CFDI 4.0 para mi compra.'
  },
  {
    id: 'faq-fac-publico',
    categoria: 'facturacion',
    categoriaLabel: 'Facturación CFDI',
    pregunta: '¿Puedo comprar si soy persona particular y no necesito factura?',
    sinonimos: [
      'necesito rfc para comprar',
      'es obligatorio tener empresa para comprar',
      'soy estudiante o particular puedo comprar'
    ],
    keywords: ['particular', 'publico', 'general', 'persona', 'estudiante', 'sin rfc', 'abierto'],
    respuesta: `**¡Por supuesto! Inversa está abierta para todo el público general.** Puedes comprar como persona particular, creador independiente, estudiante o profesionista. Si no requieres factura fiscal individual, tu compra se registra automáticamente con nota de venta simplificada con plena cobertura de garantía.`,
    destacada: true
  },

  // 4. DESARROLLO WEB & SOFTWARE
  {
    id: 'faq-web-cotizador',
    categoria: 'desarrollo_web',
    categoriaLabel: 'Sitios Web & Software',
    pregunta: '¿Cómo funciona el cotizador en línea de páginas web y software?',
    sinonimos: [
      'como calculo el precio de mi pagina web',
      'donde cotizo mi software o landing page',
      'como funciona crea tu pagina web'
    ],
    keywords: ['cotizador', 'precio', 'costo', 'calcular', 'pagina', 'web', 'software', 'crea tu pagina web', 'presupuesto'],
    respuesta: `En la sección **"Crea tu Página Web & Software"** puedes simular y calcular el costo de tu proyecto digital en tiempo real:

1. **Eliges tu perfil:** Negocio independiente, empresa o profesionista.
2. **Seleccionas el tipo:** Landing Page, Catálogo Digital, E-commerce, Plataforma SaaS o Solución a Medida.
3. **Personalizas módulos:** Pasarela de pagos, roles de usuario, panel de administración, integración de WhatsApp y optimización SEO.
4. **Exportas tu cotización:** Obtienes desglose exacto, tiempo de entrega estimado y botón directo para enviarlo a nuestros ingenieros para iniciar el desarrollo.`,
    destacada: true,
    actionType: 'ir_cotizador',
    actionLabel: 'Ir al Cotizador de Páginas Web'
  },
  {
    id: 'faq-web-tiempos',
    categoria: 'desarrollo_web',
    categoriaLabel: 'Sitios Web & Software',
    pregunta: '¿Cuánto tiempo tarda el desarrollo y entrega de una página web o software?',
    sinonimos: [
      'cuantos dias tardan en hacer mi pagina',
      'plazos de entrega de desarrollo web',
      'cuando me entregan mi sitio web'
    ],
    keywords: ['tiempo', 'plazo', 'dias', 'tarda', 'entrega', 'desarrollo', 'cronograma', 'etapas'],
    respuesta: `Los plazos de entrega dependen del tipo de arquitectura y alcance técnico del proyecto:

• **Landing Page / One-Page Corporativa:** 5 a 8 días hábiles.
• **Catálogo Interactivo de Productos:** 8 a 14 días hábiles.
• **E-Commerce Completo (Tienda con Pagos y Carrito):** 14 a 22 días hábiles.
• **Plataforma SaaS / Dashboard con Base de Datos:** 25 a 35 días hábiles.

Incluye etapas formales de diseño UX/UI, maquetación, programación de backend, pruebas de seguridad y puesta en marcha en servidores de producción.`,
    destacada: true,
    actionType: 'ir_cotizador',
    actionLabel: 'Cotizar con Tiempo Estimado'
  },
  {
    id: 'faq-web-php-mysql',
    categoria: 'desarrollo_web',
    categoriaLabel: 'Sitios Web & Software',
    pregunta: '¿Desarrollan sistemas en PHP, MySQL, Bootstrap, HTML, JS y AJAX?',
    sinonimos: [
      'programan en php y mysql',
      'hacen paginas con bootstrap y ajax',
      'desarrollo en php para cpanel o vps',
      'usan php para backend'
    ],
    keywords: ['php', 'mysql', 'bootstrap', 'ajax', 'javascript', 'html', 'cpanel', 'php8', 'servidor', 'lamp'],
    respuesta: `¡Sí, por supuesto! Contamos con amplia experiencia desarrollando sistemas robustos y ligeros utilizando **PHP 8.3 moderno, base de datos relacional MySQL, maquetación con Bootstrap 5 y peticiones asíncronas en tiempo real con AJAX**:

• **Ventajas del Stack PHP & MySQL:** Compatible con cualquier hosting o servidor económico (cPanel, Apache, Nginx o VPS), sin costos excesivos de infraestructura en la nube.
• **Interactividad fluida:** Con AJAX y JavaScript, las páginas y tablas se actualizan al instante sin tener que recargar la pantalla completa.
• **Fácil mantenimiento:** Código limpio y modular, estructurado para perdurar y escalar con tu negocio.`,
    destacada: true,
    actionType: 'ir_cotizador',
    actionLabel: 'Cotizar Proyecto con PHP & MySQL'
  },
  {
    id: 'faq-web-python-java',
    categoria: 'desarrollo_web',
    categoriaLabel: 'Sitios Web & Software',
    pregunta: '¿Qué otros lenguajes manejan además de PHP (Python, Java)?',
    sinonimos: [
      'hacen software en python',
      'programan en java spring boot',
      'que otros lenguajes de backend usan'
    ],
    keywords: ['python', 'java', 'django', 'fastapi', 'spring', 'spring boot', 'postgresql', 'backend', 'enterprise'],
    respuesta: `Además de PHP, desarrollamos soluciones en:

• **Python (FastAPI / Django):** Excelente para procesamiento masivo de datos, algoritmos de cálculo, dashboards analíticos e integraciones de machine learning.
• **Java (Spring Boot 3 / LTS):** Arquitectura corporativa de grado empresarial con alta concurrencia, microservicios y máxima robustez transaccional.
• **React 19 & Node.js / TypeScript:** Aplicaciones web progresivas de última generación con diseño ultra reactivo.`,
    destacada: true,
    actionType: 'ir_cotizador',
    actionLabel: 'Ver Stacks en el Cotizador'
  },
  {
    id: 'faq-web-pdf-excel-word',
    categoria: 'desarrollo_web',
    categoriaLabel: 'Sitios Web & Software',
    pregunta: '¿El sistema puede generar reportes en PDF, Excel (.xlsx) y Word (.docx) personalizados?',
    sinonimos: [
      'puedo descargar pdfs con mi logo',
      'exporta datos a excel desde mysql',
      'crea documentos word automaticos',
      'como se generan las cotizaciones y reportes'
    ],
    keywords: ['pdf', 'excel', 'word', 'docx', 'xlsx', 'reporte', 'reportes', 'exportar', 'descargar', 'plantillas', 'membrete'],
    respuesta: `**Sí, desarrollamos generadores automáticos de documentos a la medida:**

• **PDFs Personalizados:** Comprobantes, notas de venta, recibos, remisiones y reportes formales con tu logotipo, membrete corporativo, tablas de conceptos y folio único.
• **Exportación a Excel (.xlsx):** Descarga directa de datos desde la base de datos MySQL con filtros aplicados, encabezados estilizados y sumatorias automáticas.
• **Documentos Word (.docx):** Generación de cartas, contratos y convenios editables sustituyendo dinámicamente los datos del cliente desde el sistema.`,
    destacada: true,
    actionType: 'ir_cotizador',
    actionLabel: 'Agregar Módulos de Documentos'
  },
  {
    id: 'faq-web-interactividad-ux',
    categoria: 'desarrollo_web',
    categoriaLabel: 'Sitios Web & Software',
    pregunta: '¿Incluyen DataTables, gráficas, calendarios y códigos QR?',
    sinonimos: [
      'tienen tablas con busqueda rapida datatable',
      'hacen graficas de ventas',
      'incluyen calendario para citas',
      'generan codigos qr para pedidos o productos'
    ],
    keywords: ['datatable', 'graficas', 'metricas', 'calendario', 'agenda', 'qr', 'codigo qr', 'dashboard', 'filtros'],
    respuesta: `Todos estos módulos interactivos están disponibles para agregar en tu cotización:

• **DataTables Dinámicas:** Tablas con búsqueda en vivo al teclear, paginación veloz y ordenamiento instantáneo por columnas.
• **Gráficas & Métricas:** Paneles analíticos interactivos (barras, líneas, donas) para consultar ventas, stock o rendimiento.
• **Calendario & Agenda:** Módulo visual para agendamiento de citas, fechas de entrega o reservaciones.
• **Generador de QR Dinámico:** Creación instantánea de códigos QR para validación de tickets, pedidos o enlaces directos.`,
    destacada: true,
    actionType: 'ir_cotizador',
    actionLabel: 'Configurar Módulos en Línea'
  },
  {
    id: 'faq-web-whatsapp-notif',
    categoria: 'desarrollo_web',
    categoriaLabel: 'Sitios Web & Software',
    pregunta: '¿Cómo funcionan las notificaciones a WhatsApp, correos y alertas?',
    sinonimos: [
      'llegan alertas a whatsapp cuando compran',
      'manda correos el sistema',
      'notificaciones en tiempo real en la pantalla'
    ],
    keywords: ['notificaciones', 'whatsapp', 'correos', 'email', 'alertas', 'mensajes', 'avisos', 'smtp'],
    respuesta: `Configuramos canales integrales de comunicación multicanal:

• **Notificaciones a WhatsApp:** Alertas automáticas enviadas al celular del cliente o del administrador al registrarse una nueva orden o cambio de estatus.
• **Correos Electrónicos con Plantillas HTML:** Mensajes corporativos con servidor SMTP para bienvenidas, confirmaciones y recuperación de contraseñas.
• **Alertas en Pantalla:** Notificaciones emergentes tipo toast y modales con confirmación auditada.`,
    destacada: true,
    actionType: 'whatsapp',
    actionLabel: 'Consultar Notificaciones WhatsApp',
    actionPayload: 'Hola Inversa, me interesa conocer los detalles de la integración de notificaciones a WhatsApp en mi sistema web.'
  },
  {
    id: 'faq-web-usuarios-seguridad',
    categoria: 'desarrollo_web',
    categoriaLabel: 'Sitios Web & Software',
    pregunta: '¿El sistema incluye usuarios, bitácoras de auditoría y personalización de apariencia?',
    sinonimos: [
      'roles de usuarios y permisos',
      'bitacoras de quien edito que',
      'modo oscuro y cambio de colores de la pagina',
      'puedo cambiar los colores de la web'
    ],
    keywords: ['usuarios', 'roles', 'bitacoras', 'logs', 'auditoria', 'modo oscuro', 'dark mode', 'colores', 'apariencia', 'mantenimiento'],
    respuesta: `Sí, diseñamos arquitecturas completas con control y personalización total:

• **Usuarios & Roles (RBAC):** Perfiles diferenciados (Administrador, Operador, Vendedor, Cliente) con contraseñas encriptadas.
• **Bitácoras de Auditoría:** Historial detallado de qué usuario modificó o eliminó información, con fecha, hora y dirección IP.
• **Modo Oscuro & Personalización de Colores:** Selector de tema claro/oscuro e interfaz donde el usuario puede personalizar los colores y apariencia a su gusto.
• **Mantenimiento Mensual:** Póliza de respaldos periódicos de base de datos MySQL, optimización y soporte técnico continuo.`,
    destacada: true,
    actionType: 'ir_cotizador',
    actionLabel: 'Cotizar con Seguridad y Personalización'
  },

  // 5. MÉTODOS DE PAGO & SEGURIDAD
  {
    id: 'faq-pag-metodos',
    categoria: 'pagos',
    categoriaLabel: 'Métodos de Pago',
    pregunta: '¿Cuáles son los métodos de pago disponibles?',
    sinonimos: [
      'como puedo pagar',
      'aceptan tarjeta de credito',
      'se puede pagar con transferencia spei',
      'meses sin intereses'
    ],
    keywords: ['pago', 'pagos', 'metodos', 'tarjeta', 'credito', 'debito', 'transferencia', 'spei', 'banco', 'oxxo', 'msi'],
    respuesta: `Ofrecemos opciones seguras y transparentes para liquidar tu pedido:

1. **Transferencia Interbancaria SPEI:** Acreditación inmediata directa sin comisiones ocultas.
2. **Tarjetas de Débito y Crédito:** Visa, Mastercard y American Express con procesamiento encriptado SSL de 256 bits.
3. **Pagos Mixtos y Anticipos (para Desarrollo Web):** 50% de anticipo al firmar contrato y 50% contra entrega y satisfacción final.
4. **Convenios Corporativos:** Opciones de crédito a 15 o 30 días para compras empresariales recurrentes previa aprobación.`,
    destacada: true
  },
  {
    id: 'faq-pag-seguridad',
    categoria: 'pagos',
    categoriaLabel: 'Métodos de Pago',
    pregunta: '¿Es seguro comprar en la plataforma Inversa?',
    sinonimos: [
      'es confiable comprar aqui',
      'que seguridad tienen mis datos bancarios'
    ],
    keywords: ['seguro', 'seguridad', 'confiable', 'estafa', 'garantizado', 'cifrado', 'ssl'],
    respuesta: `Nuestra plataforma opera con protocolos de seguridad HTTPS/TLS de última generación, y nunca almacenamos datos sensibles de tarjetas en nuestros servidores. Además, cada compra genera un identificador de orden único con trazabilidad verificable en nuestra base de datos.`,
    destacada: false
  },

  // 6. ASESOR HUMANO & ATENCIÓN
  {
    id: 'faq-sop-whatsapp',
    categoria: 'soporte',
    categoriaLabel: 'Asesor Humano',
    pregunta: '¿Puedo hablar directamente con un ingeniero o asesor por WhatsApp?',
    sinonimos: [
      'quiero hablar con un asesor',
      'numero de telefono o whatsapp de soporte',
      'atencion personalizada por whatsapp',
      'atencion a clientes'
    ],
    keywords: ['asesor', 'humano', 'whatsapp', 'telefono', 'contacto', 'hablar', 'persona', 'ingeniero', 'atencion'],
    respuesta: `¡Desde luego! Nuestro equipo de ingenieros y especialistas de producto está disponible para resolver dudas técnicas, orientarte en compatibilidad de hardware o estructurar la propuesta de tu sitio web.

• **Horario de atención:** Lunes a Sábado de 9:00 AM a 8:00 PM (Hora del Centro de México).
• **Atención inmediata:** Haz clic en el botón inferior para abrir un chat directo en WhatsApp.`,
    destacada: true,
    actionType: 'whatsapp',
    actionLabel: 'Hablar con Asesor en WhatsApp',
    actionPayload: 'Hola equipo Inversa, me gustaría comunicarme con un asesor para recibir orientación personalizada.'
  },
  {
    id: 'faq-sop-mayoreo',
    categoria: 'soporte',
    categoriaLabel: 'Asesor Humano',
    pregunta: '¿Ofrecen descuentos por mayoreo o paquetes corporativos?',
    sinonimos: [
      'tienen precio de mayoreo',
      'descuento por comprar varios equipos',
      'precio para empresas o startups'
    ],
    keywords: ['mayoreo', 'descuento', 'volumen', 'paquete', 'oficinas', 'corporativo', 'empresa', 'lotes'],
    respuesta: `Sí, contamos con **tabuladores de precios preferenciales para compras de hardware a partir de 3 unidades** o proyectos de desarrollo web multisede.

Contáctanos directamente con la lista de requerimientos para que un ejecutivo de cuenta te aplique el porcentaje de descuento por volumen aplicable.`,
    destacada: true,
    actionType: 'whatsapp',
    actionLabel: 'Cotizar con Descuento por Volumen',
    actionPayload: 'Hola Inversa, solicito una cotización con precio de mayoreo / volumen corporativo.'
  }
];

// Función predictiva: Busca y puntúa preguntas coincidentes a partir del texto que el usuario está escribiendo
export interface PredictionResult {
  faq: FaqItem;
  score: number;
  highlightIndices?: [number, number];
}

const normalize = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const predictQuestions = (input: string, maxResults = 4): FaqItem[] => {
  const cleanInput = normalize(input);
  if (!cleanInput || cleanInput.length < 2) return [];

  const tokens = cleanInput.split(/\s+/).filter(t => t.length >= 2);

  const scored = FAQ_KNOWLEDGE_BASE.map(item => {
    let score = 0;
    const normPregunta = normalize(item.pregunta);
    const normCategory = normalize(item.categoriaLabel);
    const normRespuesta = normalize(item.respuesta);

    // Coincidencia exacta o contenida en la pregunta
    if (normPregunta.includes(cleanInput)) {
      score += 50;
    }

    // Coincidencia con tokens
    for (const token of tokens) {
      if (normPregunta.includes(token)) score += 20;
      if (normCategory.includes(token)) score += 10;
      
      // Keywords
      for (const kw of item.keywords) {
        const normKw = normalize(kw);
        if (normKw === token) score += 25;
        else if (normKw.includes(token)) score += 12;
      }

      // Sinónimos
      for (const sin of item.sinonimos || []) {
        const normSin = normalize(sin);
        if (normSin.includes(token)) score += 15;
      }

      // Respuesta
      if (normRespuesta.includes(token)) score += 5;
    }

    return { item, score };
  });

  return scored
    .filter(s => s.score > 8)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(s => s.item);
};

export const findBestAnswer = (userMessage: string): FaqItem | null => {
  const matches = predictQuestions(userMessage, 1);
  return matches.length > 0 ? matches[0] : null;
};
