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
  { id: 'cat-laptops', nombre: 'Laptops & Workstations', tipo: 'hardware', slug: 'laptops-workstations' },
  { id: 'cat-componentes', nombre: 'Tarjetas Gráficas (GPUs)', tipo: 'hardware', slug: 'tarjetas-graficas' },
  { id: 'cat-audio', nombre: 'Audio Profesional', tipo: 'hardware', slug: 'audio-profesional' },
  { id: 'cat-monitores', nombre: 'Monitores & Pantallas', tipo: 'hardware', slug: 'monitores-pantallas' },
  { id: 'cat-perifericos', nombre: 'Periféricos & Teclados', tipo: 'hardware', slug: 'perifericos-teclados' },
  { id: 'cat-landing', nombre: 'Landing Pages Corporativas', tipo: 'servicio_web', slug: 'landing-pages' },
  { id: 'cat-ecommerce', nombre: 'Comercio Electrónico (E-Commerce)', tipo: 'servicio_web', slug: 'ecommerce' },
  { id: 'cat-saas', nombre: 'SaaS & Dashboards Empresariales', tipo: 'servicio_web', slug: 'saas' },
  { id: 'cat-corporativo', nombre: 'Portales Web Institucionales', tipo: 'servicio_web', slug: 'corporativo' }
];

export const INITIAL_PRODUCTOS: Producto[] = [
  {
    id: 'prod-macbook-m3',
    titulo: 'MacBook Pro 16" Apple M3 Max',
    slug: 'macbook-pro-16-m3-max',
    descripcion: 'Laptop para desarrollo de software intensivo, modelado 3D, análisis de datos y edición de video en alta resolución.',
    categoriaId: 'cat-laptops',
    categoriaNombre: 'Laptops & Workstations',
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
      'Chipset': 'Apple M3 Max (CPU 16 núcleos, GPU 40 núcleos)',
      'RAM': '36 GB memoria unificada LPDDR5',
      'Almacenamiento': '1 TB SSD PCIe de alta velocidad',
      'Pantalla': '16.2" Liquid Retina XDR (3456 x 2234) a 120Hz',
      'Garantía Oficial': '1 año con Apple México (factura con IVA)'
    },
    destacado: true,
    activo: true
  },
  {
    id: 'prod-rtx-4080',
    titulo: 'ASUS ROG Strix GeForce RTX 4080 Super OC',
    slug: 'asus-rog-strix-rtx-4080-super-oc',
    descripcion: 'Tarjeta gráfica de alto desempeño para estaciones de trabajo, inferencia de inteligencia artificial y renderizado por GPU.',
    categoriaId: 'cat-componentes',
    categoriaNombre: 'Tarjetas Gráficas (GPUs)',
    tipo: 'hardware',
    precio: 24999,
    precioOferta: 22899,
    imagenes: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 0,
    specs: {
      'VRAM': '16 GB GDDR6X (Bus de 256 bits a 23 Gbps)',
      'Núcleos CUDA': '10,240 núcleos y Tensor Cores 4ª Gen',
      'Frecuencia': '2670 MHz Boost en Modo OC',
      'Puertos': '2x HDMI 2.1a, 3x DisplayPort 1.4a',
      'Garantía Oficial': '3 años de garantía directa con ASUS México'
    },
    destacado: true,
    activo: true
  },
  {
    id: 'prod-sony-xm5',
    titulo: 'Sony WH-1000XM5 Cancelación de Ruido',
    slug: 'sony-wh1000xm5-cancelacion-ruido',
    descripcion: 'Audífonos inalámbricos profesionales con cancelación activa de ruido adaptativa, 8 micrófonos para llamadas nítidas y batería de larga duración.',
    categoriaId: 'cat-audio',
    categoriaNombre: 'Audio Profesional',
    tipo: 'hardware',
    precio: 7899,
    precioOferta: 6799,
    imagenes: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 8,
    specs: {
      'Chipset de Audio': 'Procesador integrado V1 + procesador HD QN1',
      'Batería': 'Hasta 30 horas con carga rápida (3 min = 3 h)',
      'Conectividad': 'Bluetooth 5.2 multipunto y conector 3.5mm',
      'Códecs': 'LDAC, AAC y SBC compatibles con Hi-Res Audio',
      'Garantía Oficial': '1 año con centros autorizados Sony México'
    },
    destacado: true,
    activo: true
  },
  {
    id: 'prod-mon-lg-34',
    titulo: 'LG UltraWide 34" QHD IPS con Brazo Ergonómico',
    slug: 'lg-ultrawide-34-qhd-ips-brazo-ergo',
    descripcion: 'Monitor panorámico de 34 pulgadas formato 21:9 para productividad multidispositivo, con concentrador USB-C de 60W y brazo articulado incluido.',
    categoriaId: 'cat-monitores',
    categoriaNombre: 'Monitores & Pantallas',
    tipo: 'hardware',
    precio: 11899,
    precioOferta: 10499,
    imagenes: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 5,
    specs: {
      'Resolución': '3440 x 1440 UltraWide QHD (Relación 21:9)',
      'Panel': 'IPS con cobertura sRGB 99% y calibración de fábrica',
      'Puertos': 'USB-C con Power Delivery 60W, 2x HDMI, DisplayPort',
      'Soporte': 'Brazo Ergo articulado con sujeción C-Clamp de escritorio',
      'Garantía Oficial': '2 años de respaldo oficial LG México'
    },
    destacado: false,
    activo: true
  },
  {
    id: 'prod-keychron-q1',
    titulo: 'Keychron Q1 Pro Mecánico Custom QMK/VIA',
    slug: 'keychron-q1-pro-mecanico-custom',
    descripcion: 'Teclado mecánico inalámbrico en formato 75% con chasis de aluminio CNC, montura gasket amortiguada y reasignación de teclas en tiempo real.',
    categoriaId: 'cat-perifericos',
    categoriaNombre: 'Periféricos & Teclados',
    tipo: 'hardware',
    precio: 4499,
    imagenes: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 2,
    specs: {
      'Interruptores': 'Switches Keychron K Pro Red pre-lubricados (Hot-swap)',
      'Chasis': 'Aluminio 6063 mecanizado por CNC con doble junta',
      'Conectividad': 'Bluetooth 5.1 y cable USB-C trenzado de baja latencia',
      'Compatibilidad': 'Soporte nativo para macOS, Windows y Linux',
      'Garantía Oficial': '1 año de garantía directa con distribuidor'
    },
    destacado: false,
    activo: true
  },
  // SERVICIOS WEB & SOFTWARE
  {
    id: 'serv-landing-page',
    titulo: 'Landing Page Corporativa de Alta Conversión',
    slug: 'landing-page-corporativa-alta-conversion',
    descripcion: 'Desarrollo web enfocado en captación de prospectos B2B, con diseño responsivo, carga en menos de 1 segundo y analítica integrada.',
    categoriaId: 'cat-landing',
    categoriaNombre: 'Landing Pages Corporativas',
    tipo: 'servicio_web',
    precio: 6900,
    precioOferta: 5800,
    imagenes: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 999,
    specs: {
      'Tiempo de Entrega': '4 a 6 días hábiles con revisiones incluidas',
      'Tecnologías': 'React, Next.js, TypeScript y Tailwind CSS',
      'Rendimiento': 'Puntaje de 90+ en Google PageSpeed Insights',
      'Seguridad': 'Certificado SSL TLS 1.3 y hosting perimetral CDN',
      'Soporte Técnico': '30 días de garantía y ajustes posteriores al lanzamiento'
    },
    demoUrl: 'https://example.com/demo-landing',
    destacado: true,
    activo: true
  },
  {
    id: 'serv-ecommerce-pro',
    titulo: 'Plataforma E-Commerce B2B / B2C',
    slug: 'plataforma-ecommerce-b2b-b2c',
    descripcion: 'Tienda en línea completa con catálogo autoadministrable, pasarelas de pago nacionales e internacionales, control de inventario y pedidos.',
    categoriaId: 'cat-ecommerce',
    categoriaNombre: 'Comercio Electrónico (E-Commerce)',
    tipo: 'servicio_web',
    precio: 17500,
    precioOferta: 15200,
    imagenes: [
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 999,
    specs: {
      'Tiempo de Entrega': '12 a 16 días hábiles',
      'Pagos Soportados': 'Stripe, Mercado Pago, PayPal y SPEI automatizado',
      'Panel Administrativo': 'Gestión de productos, variantes, stock y clientes',
      'Seguridad': 'Cumplimiento de estándares PCI-DSS y cifrado de transacciones',
      'Capacitación': 'Sesión de entrega en vivo y manual operativo para su equipo'
    },
    demoUrl: 'https://example.com/demo-store',
    destacado: true,
    activo: true
  },
  {
    id: 'serv-saas-custom',
    titulo: 'Desarrollo de Software a la Medida & SaaS',
    slug: 'desarrollo-software-medida-saas',
    descripcion: 'Diseño y programación de aplicaciones web empresariales, portales de gestión de clientes, paneles de control (dashboards) y APIs seguras.',
    categoriaId: 'cat-saas',
    categoriaNombre: 'SaaS & Dashboards Empresariales',
    tipo: 'servicio_web',
    precio: 35000,
    imagenes: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 999,
    specs: {
      'Tiempo de Entrega': '25 a 35 días hábiles según alcance acordado',
      'Base de Datos': 'PostgreSQL / Cloud Firestore de alta disponibilidad',
      'Permisos y Roles': 'Autenticación corporativa y control de accesos granular',
      'Arquitectura': 'Código modular en TypeScript con documentación técnica',
      'Soporte Técnico': 'Póliza de mantenimiento y soporte de ingeniería disponible'
    },
    demoUrl: 'https://example.com/demo-saas',
    destacado: true,
    activo: true
  },
  {
    id: 'serv-web-corporativa',
    titulo: 'Portal Web Institucional y Corporativo',
    slug: 'portal-web-institucional-corporativo',
    descripcion: 'Sitio web profesional para empresas consolidadas y firmas de consultoría, con secciones de servicios, casos de éxito, blog y contacto formal.',
    categoriaId: 'cat-corporativo',
    categoriaNombre: 'Portales Web Institucionales',
    tipo: 'servicio_web',
    precio: 10500,
    precioOferta: 9200,
    imagenes: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 999,
    specs: {
      'Tiempo de Entrega': '8 a 12 días hábiles',
      'Estructura': 'Inicio, Servicios, Nosotros, Casos de Estudio y Contacto',
      'Optimización': 'Indexación SEO técnica y compatibilidad móvil total',
      'Formularios': 'Validación en tiempo real y reenvío a correos corporativos'
    },
    demoUrl: 'https://example.com/demo-corp',
    destacado: false,
    activo: true
  }
];

const LOCAL_STORAGE_PRODUCTS_KEY = 'inversa_catalog_products_v4';

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

const CATEGORY_NAME_MAP: Record<string, string> = {
  'Workstations & Cómputo Móvil': 'Laptops & Workstations',
  'Unidades de Procesamiento Gráfico': 'Tarjetas Gráficas (GPUs)',
  'Acústica & Cancelación Activa': 'Audio Profesional',
  'Displays de Grado Profesional': 'Monitores & Pantallas',
  'Periféricos de Precisión': 'Periféricos & Teclados',
  'Arquitectura Web & Conversión': 'Landing Pages Corporativas',
  'Plataformas Transaccionales E-Commerce': 'Comercio Electrónico (E-Commerce)',
  'SaaS Empresarial & Dashboards': 'SaaS & Dashboards Empresariales',
  'Portales Corporativos': 'Portales Web Institucionales'
};

const normalizeProduct = (p: Producto): Producto => ({
  ...p,
  categoriaNombre: CATEGORY_NAME_MAP[p.categoriaNombre] || p.categoriaNombre
});

const normalizeCategory = (c: Categoria): Categoria => ({
  ...c,
  nombre: CATEGORY_NAME_MAP[c.nombre] || c.nombre
});

export const getProductos = async (): Promise<Producto[]> => {
  if (isFirebaseConfigured && db) {
    try {
      let snapshot;
      try {
        const q = query(collection(db, 'productos'), orderBy('createdAt', 'desc'));
        snapshot = await getDocs(q);
      } catch {
        snapshot = await getDocs(collection(db, 'productos'));
      }
      if (snapshot && !snapshot.empty) {
        const prods = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        } as Producto)).map(normalizeProduct);
        saveLocalProducts(prods);
        return prods;
      }
    } catch (e) {
      console.warn('Consulta a Firestore no disponible, usando base local:', e);
    }
  }

  return getLocalProducts().map(normalizeProduct);
};

const LOCAL_STORAGE_CATEGORIES_KEY = 'inversa_custom_categories_v4';

const getLocalCategories = (): Categoria[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeCategory);
      }
    }
  } catch (e) {
    console.warn('Error al leer categorías locales:', e);
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIAS));
  } catch {}
  return INITIAL_CATEGORIAS.map(normalizeCategory);
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
        const cats = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Categoria)).map(normalizeCategory);
        saveLocalCategories(cats);
        return cats;
      }
    } catch (e) {
      console.warn('Categorias desde Firestore no disponibles, usando base local:', e);
    }
  }
  return getLocalCategories().map(normalizeCategory);
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
