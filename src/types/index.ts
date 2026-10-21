export type TipoProducto = 'hardware' | 'servicio_web';

export interface Categoria {
  id: string;
  nombre: string;
  tipo: TipoProducto;
  slug: string;
  descripcion?: string;
  icono?: string;
}

export interface Producto {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  categoriaId: string;
  categoriaNombre: string;
  tipo: TipoProducto;
  precio: number;
  precioOferta?: number;
  imagenes: string[];
  stock: number;
  specs: Record<string, string>;
  demoUrl?: string;
  destacado: boolean;
  activo: boolean;
  createdAt?: string | number | { seconds: number; nanoseconds: number };
}

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

export type EstadoPedido = 'pendiente' | 'contactado' | 'en_proceso' | 'completado' | 'cancelado';

export interface PedidoItem {
  productoId: string;
  titulo: string;
  precio: number;
  cantidad: number;
  tipo: TipoProducto;
}

export interface DireccionDetallada {
  calleNumero: string;
  numeroInterior?: string;
  colonia: string;
  codigoPostal: string;
  ciudad: string;
  estado: string;
  referencias?: string;
}

export interface Pedido {
  id: string;
  clienteNombre: string;
  clienteTelefono: string;
  clienteEmail?: string;
  direccionEntrega?: string;
  direccionDetallada?: DireccionDetallada;
  metodoPago?: string;
  transaccionId?: string;
  estadoPago?: 'pendiente_verificacion' | 'aprobado_mercadopago' | 'pendiente_transferencia';
  items: PedidoItem[];
  total: number;
  estado: EstadoPedido;
  notas?: string;
  createdAt?: string | number | { seconds: number; nanoseconds: number };
}

export type BackendStack = 'php_mysql' | 'python_fastapi' | 'java_spring' | 'modern_node';

export interface WebAddons {
  // A. Base del Proyecto & Backend
  creacion_web?: boolean;
  backend_php?: boolean;
  db_mysql?: boolean;
  sistema_usuarios?: boolean;
  bitacoras_usuarios?: boolean;
  mantenimiento_mensual?: boolean;

  // B. Reportes, Documentos & Exportación de Datos
  export_pdf?: boolean;
  export_excel?: boolean;
  export_word?: boolean;
  datatables?: boolean;

  // C. Automatización, Comunicación & Herramientas
  chatbot_reglas?: boolean;
  correos_personalizados?: boolean;
  generador_qr?: boolean;
  calendario_interactivo?: boolean;

  // D. Analítica, Interfaz & Experiencia (UI/UX)
  graficas_metricas?: boolean;
  alertas_personalizadas?: boolean;
  modo_oscuro?: boolean;
  personalizador_apariencia?: boolean;

  // Compatibilidad anterior
  pdfPersonalizados?: boolean;
  excelBaseDatos?: boolean;
  wordPersonalizados?: boolean;
  modoOscuro?: boolean;
  personalizacionColores?: boolean;
  datatableAvanzada?: boolean;
  calendarioAgenda?: boolean;
  generadorQr?: boolean;
  chatbotPredictivo?: boolean;
  whatsappNotificaciones?: boolean;
  correosPersonalizados?: boolean;
  alertasPersonalizadas?: boolean;
  sistemaUsuarios?: boolean;
  bitacorasUsuarios?: boolean;
  panelAdmin?: boolean;
  mantenimientoMensual?: boolean;
  pasarelaPagos?: boolean;
  hostingDominio?: boolean;
  whatsappApi?: boolean;
  seoAvanzado?: boolean;
  [key: string]: boolean | undefined;
}

export interface CotizacionWeb {
  tipoProyecto: 'landing' | 'catalogo' | 'ecommerce' | 'dashboard' | 'custom';
  tipoNombre: string;
  stackSeleccionado?: BackendStack;
  stackNombre?: string;
  paginasAprox: number;
  addons: WebAddons;
  urgencia: 'normal' | 'express';
  totalEstimado: number;
  tiempoEntregaDias: number;
  serviciosSeleccionados?: string[];
}
