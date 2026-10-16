import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../lib/firebase';
import { Producto, Categoria } from '../types';

export const INITIAL_CATEGORIAS: Categoria[] = [
  { id: 'cat-laptops', nombre: 'Workstations & Cómputo Móvil', tipo: 'hardware', slug: 'workstations' },
  { id: 'cat-audio', nombre: 'Acústica & Cancelación Activa', tipo: 'hardware', slug: 'audio' },
  { id: 'cat-perifericos', nombre: 'Periféricos de Precisión', tipo: 'hardware', slug: 'perifericos' },
  { id: 'cat-componentes', nombre: 'Unidades de Procesamiento Gráfico', tipo: 'hardware', slug: 'componentes' },
  { id: 'cat-monitores', nombre: 'Displays de Grado Profesional', tipo: 'hardware', slug: 'monitores' },
  { id: 'cat-landing', nombre: 'Arquitectura Web & Conversión', tipo: 'servicio_web', slug: 'landing-pages' },
  { id: 'cat-ecommerce', nombre: 'Plataformas Transaccionales E-Commerce', tipo: 'servicio_web', slug: 'ecommerce' },
  { id: 'cat-saas', nombre: 'SaaS Empresarial & Dashboards', tipo: 'servicio_web', slug: 'saas' },
  { id: 'cat-corporativo', nombre: 'Portales Corporativos', tipo: 'servicio_web', slug: 'corporativo' }
];

export const INITIAL_PRODUCTOS: Producto[] = [
  {
    id: 'prod-macbook-m3',
    titulo: 'MacBook Pro 16" Apple M3 Max',
    slug: 'macbook-pro-16-m3-max',
    descripcion: 'Estación de trabajo de grado profesional para desarrollo intensivo, arquitectura de software y renderizado de alta fidelidad.',
    categoriaId: 'cat-laptops',
    categoriaNombre: 'Workstations & Cómputo Móvil',
    tipo: 'hardware',
    precio: 59999,
    precioOferta: 54999,
    imagenes: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 4,
    specs: {
      'Procesador': 'Apple M3 Max (16 núcleos CPU, 40 núcleos GPU)',
      'Memoria Unificada': '36 GB RAM de alta velocidad',
      'Almacenamiento': '1 TB SSD Ultrarrápido PCIe',
      'Display': '16.2" Liquid Retina XDR 120Hz ProMotion',
      'Póliza de Garantía': '1 Año Apple Care Oficial'
    },
    destacado: true,
    activo: true
  },
  {
    id: 'prod-sony-xm5',
    titulo: 'Sony WH-1000XM5 Noise Cancelling',
    slug: 'sony-wh1000xm5-noise-cancelling',
    descripcion: 'Aislamiento acústico de referencia industrial con procesadores duales para entornos de ingeniería y análisis concentrado.',
    categoriaId: 'cat-audio',
    categoriaNombre: 'Acústica & Cancelación Activa',
    tipo: 'hardware',
    precio: 7899,
    precioOferta: 6799,
    imagenes: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 8,
    specs: {
      'Procesamiento': 'Procesador QN1 y Coprocesador V1 dedicados',
      'Autonomía': 'Hasta 30 horas continuas',
      'Carga Rápida': '3 minutos de carga equivalen a 3 horas de uso',
      'Formatos de Audio': 'LDAC, AAC, SBC (Hi-Res Audio Wireless)',
      'Póliza de Garantía': '12 Meses con Centro de Servicio'
    },
    destacado: true,
    activo: true
  },
  {
    id: 'prod-keychron-q1',
    titulo: 'Keychron Q1 Pro Custom QMK/VIA',
    slug: 'keychron-q1-pro-custom-qmk-via',
    descripcion: 'Teclado mecánico para programadores con chasis de aluminio CNC grado aeronáutico, montura de doble junta y firmware de código abierto.',
    categoriaId: 'cat-perifericos',
    categoriaNombre: 'Periféricos de Precisión',
    tipo: 'hardware',
    precio: 4499,
    imagenes: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 2,
    specs: {
      'Interruptores': 'Keychron K Pro Red Lubricados en Fábrica',
      'Construcción': 'Aluminio 6063 Mecanizado CNC con Double Gasket',
      'Conectividad': 'Bluetooth 5.1 & USB Tipo C Trenzado',
      'Programación': 'Mapeo completo en tiempo real vía QMK / VIA',
      'Keycaps': 'PBT Doble Inyección Perfil KSA'
    },
    destacado: false,
    activo: true
  },
  {
    id: 'prod-rtx-4080',
    titulo: 'ASUS ROG Strix GeForce RTX 4080 Super OC',
    slug: 'asus-rog-strix-rtx-4080-super-oc',
    descripcion: 'Potencia de cálculo paralelo con microarquitectura Ada Lovelace para procesamiento de inteligencia artificial, computación gráfica y renderizado.',
    categoriaId: 'cat-componentes',
    categoriaNombre: 'Unidades de Procesamiento Gráfico',
    tipo: 'hardware',
    precio: 24999,
    precioOferta: 22899,
    imagenes: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 0,
    specs: {
      'Memoria de Video': '16 GB GDDR6X (Bus de 256 bits)',
      'Núcleos de IA': 'Tensor Cores de 4ª Generación & DLSS 3.5',
      'Frecuencia Boost': '2670 MHz (Modo Rendimiento)',
      'Disipación Térmica': 'Cámara de vapor patentada y ventiladores axiales',
      'Póliza de Garantía': '3 Años Oficial ASUS'
    },
    destacado: true,
    activo: true
  },
  {
    id: 'prod-mon-lg-34',
    titulo: 'LG 34" UltraWide QHD IPS Ergo Curved',
    slug: 'lg-34-ultrawide-qhd-ips-ergo-curved',
    descripcion: 'Espacio de trabajo panorámico formato 21:9 para multipantalla sin bordes, puerto USB-C con suministro de energía de 60W y brazo ergonómico.',
    categoriaId: 'cat-monitores',
    categoriaNombre: 'Displays de Grado Profesional',
    tipo: 'hardware',
    precio: 11899,
    precioOferta: 10499,
    imagenes: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 5,
    specs: {
      'Resolución': '3440 x 1440 UltraWide Quad HD',
      'Panel': 'IPS con 99% sRGB y calibración de color de fábrica',
      'Conectividad': 'USB-C (Power Delivery 60W), DisplayPort, HDMI x2',
      'Soporte': 'Brazo Ergo de fijación C-Clamp con rotación 360°',
      'Póliza de Garantía': '2 Años con Fabricante'
    },
    destacado: false,
    activo: true
  },
  // SERVICIOS WEB & SOFTWARE
  {
    id: 'serv-landing-page',
    titulo: 'Arquitectura Web: Landing Page Corporativa',
    slug: 'arquitectura-web-landing-page-corporativa',
    descripcion: 'Plataforma web de alto rendimiento optimizada para indexación SEO y captura ejecutiva de prospectos. Carga menor a 800 milisegundos.',
    categoriaId: 'cat-landing',
    categoriaNombre: 'Arquitectura Web & Conversión',
    tipo: 'servicio_web',
    precio: 6900,
    precioOferta: 5800,
    imagenes: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 999,
    specs: {
      'Plazo de Entrega': '4 a 6 días hábiles',
      'Tecnologías': 'React 18 / Next.js + TypeScript + Tailwind CSS',
      'Infraestructura': 'Despliegue perimetral con certificado SSL empresarial',
      'Analítica': 'Integración de eventos con Google Tag Manager y GA4',
      'Soporte Técnico': '30 días de acompañamiento post-lanzamiento'
    },
    demoUrl: 'https://example.com/demo-landing',
    destacado: true,
    activo: true
  },
  {
    id: 'serv-ecommerce-pro',
    titulo: 'E-Commerce Pro: Plataforma Transaccional B2B/B2C',
    slug: 'ecommerce-pro-plataforma-transaccional',
    descripcion: 'Sistema de comercio digital con panel de administración, control de inventario en tiempo real, catálogo sincronizado y gestión de órdenes.',
    categoriaId: 'cat-ecommerce',
    categoriaNombre: 'Plataformas Transaccionales E-Commerce',
    tipo: 'servicio_web',
    precio: 17500,
    precioOferta: 15200,
    imagenes: [
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 999,
    specs: {
      'Plazo de Entrega': '12 a 16 días hábiles',
      'Panel Administrativo': 'Gestión de catálogo, variantes, precios y pedidos',
      'Transacciones': 'Integración bancaria (Stripe, Mercado Pago o SPEI)',
      'Seguridad': 'Cumplimiento de estándares de cifrado TLS 1.3',
      'Capacitación': 'Sesión técnica y manuales de administración operativa'
    },
    demoUrl: 'https://example.com/demo-store',
    destacado: true,
    activo: true
  },
  {
    id: 'serv-saas-custom',
    titulo: 'Desarrollo a la Medida: Plataforma SaaS & Dashboard',
    slug: 'desarrollo-a-la-medida-saas-dashboard',
    descripcion: 'Diseño e implementación de software empresarial en la nube con arquitectura de microservicios, autenticación granular y reportes en vivo.',
    categoriaId: 'cat-saas',
    categoriaNombre: 'SaaS Empresarial & Dashboards',
    tipo: 'servicio_web',
    precio: 35000,
    imagenes: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 999,
    specs: {
      'Plazo de Entrega': '25 a 35 días hábiles',
      'Base de Datos': 'Cloud Firestore NoSQL / PostgreSQL de alta disponibilidad',
      'Control de Acceso': 'Roles y permisos empresariales (RBAC)',
      'APIs': 'Arquitectura RESTful con documentación técnica',
      'SLA de Soporte': 'Garantía de respuesta técnica y mantenimiento preventivo'
    },
    demoUrl: 'https://example.com/demo-saas',
    destacado: true,
    activo: true
  },
  {
    id: 'serv-web-corporativa',
    titulo: 'Portal Institucional & Catálogo de Servicios',
    slug: 'portal-institucional-catalogo-servicios',
    descripcion: 'Solución web representativa para organizaciones corporativas que requieren comunicar solvencia, propuesta de valor y captar clientes corporativos.',
    categoriaId: 'cat-corporativo',
    categoriaNombre: 'Portales Corporativos',
    tipo: 'servicio_web',
    precio: 10500,
    precioOferta: 9200,
    imagenes: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 999,
    specs: {
      'Plazo de Entrega': '8 a 12 días hábiles',
      'Secciones': 'Corporativo, Soluciones, Casos de Estudio, Mesa de Contacto',
      'Optimización': 'SEO semántico y diseño adaptativo multidispositivo',
      'Formularios': 'Enrutamiento seguro de solicitudes hacia correos institucionales'
    },
    demoUrl: 'https://example.com/demo-corp',
    destacado: false,
    activo: true
  }
];

const LOCAL_STORAGE_PRODUCTS_KEY = 'inversa_catalog_products_v3';

const getLocalProducts = (): Producto[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error al leer productos locales:', e);
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTOS));
  } catch {}
  return INITIAL_PRODUCTOS;
};

const saveLocalProducts = (products: Producto[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error al guardar productos locales:', e);
  }
};

export const getProductos = async (): Promise<Producto[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'productos'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        } as Producto));
      }
    } catch (e) {
      console.warn('Consulta a Firestore no disponible, usando base local:', e);
    }
  }

  return getLocalProducts();
};

const LOCAL_STORAGE_CATEGORIES_KEY = 'inversa_custom_categories_v2';

const getLocalCategories = (): Categoria[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error al leer categorías locales:', e);
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIAS));
  } catch {}
  return INITIAL_CATEGORIAS;
};

const saveLocalCategories = (categories: Categoria[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error('Error al guardar categorías locales:', e);
  }
};

export const getCategorias = async (): Promise<Categoria[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'categorias'));
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Categoria));
      }
    } catch (e) {
      console.warn('Categorias desde Firestore no disponibles, usando base local:', e);
    }
  }
  return getLocalCategories();
};

export const createCategoria = async (categoriaData: Omit<Categoria, 'id'>): Promise<Categoria> => {
  const slug = categoriaData.slug?.trim() || categoriaData.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newCatData = { ...categoriaData, slug };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'categorias'), {
        ...newCatData,
        createdAt: serverTimestamp()
      });
      const created: Categoria = { id: docRef.id, ...newCatData };
      const current = getLocalCategories();
      saveLocalCategories([...current, created]);
      return created;
    } catch (e) {
      console.error('Error al crear categoría en Firestore:', e);
    }
  }

  const newCategoria: Categoria = {
    ...newCatData,
    id: `cat-${Date.now()}`
  };
  const current = getLocalCategories();
  const updated = [...current, newCategoria];
  saveLocalCategories(updated);
  return newCategoria;
};

export const updateCategoria = async (id: string, updates: Partial<Categoria>): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'categorias', id);
      await updateDoc(docRef, updates);
    } catch (e) {
      console.warn('Error al actualizar categoría en Firestore:', e);
    }
  }

  const current = getLocalCategories();
  const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
  saveLocalCategories(updated);

  // Si se modificó el nombre de la categoría, sincronizar productos locales
  if (updates.nombre) {
    const localProds = getLocalProducts();
    const prodsUpdated = localProds.map((p) => 
      p.categoriaId === id ? { ...p, categoriaNombre: updates.nombre! } : p
    );
    saveLocalProducts(prodsUpdated);
  }
};

export const deleteCategoria = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'categorias', id);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn('Error al eliminar categoría en Firestore:', e);
    }
  }

  const current = getLocalCategories();
  const updated = current.filter((c) => c.id !== id);
  saveLocalCategories(updated);
};

export const resetCategoriasToDefault = async (): Promise<Categoria[]> => {
  saveLocalCategories(INITIAL_CATEGORIAS);
  return INITIAL_CATEGORIAS;
};

export const resetProductsToDefault = async (): Promise<Producto[]> => {
  saveLocalProducts(INITIAL_PRODUCTOS);
  return INITIAL_PRODUCTOS;
};

export const createProducto = async (productoData: Omit<Producto, 'id'>): Promise<Producto> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'productos'), {
        ...productoData,
        createdAt: serverTimestamp()
      });
      const created: Producto = {
        id: docRef.id,
        ...productoData
      };
      const current = getLocalProducts();
      saveLocalProducts([created, ...current]);
      return created;
    } catch (e) {
      console.error('Error al crear producto en Firestore:', e);
    }
  }

  const newProduct: Producto = {
    ...productoData,
    id: `prod-${Date.now()}`
  };
  const current = getLocalProducts();
  saveLocalProducts([newProduct, ...current]);
  return newProduct;
};

export const updateProducto = async (id: string, updates: Partial<Producto>): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'productos', id);
      await updateDoc(docRef, updates);
    } catch (e) {
      console.warn('Error al actualizar en Firestore, actualizando local:', e);
    }
  }

  const current = getLocalProducts();
  const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveLocalProducts(updated);
};

export const deleteProducto = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'productos', id);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn('Error al eliminar en Firestore, eliminando local:', e);
    }
  }

  const current = getLocalProducts();
  saveLocalProducts(current.filter((p) => p.id !== id));
};

export const uploadProductImage = async (file: File): Promise<string> => {
  if (isFirebaseConfigured && storage) {
    try {
      const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageReference = ref(storage, `productos/${filename}`);
      const snapshot = await uploadBytes(storageReference, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (e) {
      console.error('Error al subir a Firebase Storage:', e);
      throw e;
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
