import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { Pedido, EstadoPedido } from '../types';
import { formatPrice } from '../utils/formatters';

const INITIAL_DEMO_ORDERS: Pedido[] = [
  {
    id: 'ORD-MX-849201',
    clienteNombre: 'Ing. Carlos Mendoza (Grupo Nexo)',
    clienteTelefono: '+52 55 4123 4567',
    clienteEmail: 'carlos.mendoza@gruponexo.mx',
    items: [
      {
        productoId: 'prod-macbook-m3',
        titulo: 'MacBook Pro 16" Apple M3 Max',
        precio: 54999,
        cantidad: 1,
        tipo: 'hardware'
      },
      {
        productoId: 'prod-keychron-q1',
        titulo: 'Keychron Q1 Pro Custom QMK/VIA',
        precio: 4499,
        cantidad: 1,
        tipo: 'hardware'
      }
    ],
    total: 59498,
    estado: 'pendiente',
    notas: 'Requerimiento con factura fiscal CFDI. Horario de entrega en corporativo de 9:00 a 18:00 hrs.',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'ORD-MX-718293',
    clienteNombre: 'Lic. Mariana Silva (Soluciones Alpha)',
    clienteTelefono: '+52 55 9876 5432',
    clienteEmail: 'mariana.silva@alphastudio.com.mx',
    items: [
      {
        productoId: 'serv-ecommerce-pro',
        titulo: 'E-Commerce Pro: Plataforma Transaccional B2B/B2C',
        precio: 15200,
        cantidad: 1,
        tipo: 'servicio_web'
      }
    ],
    total: 15200,
    estado: 'contactado',
    notas: 'Proyecto web corporativo con integración de pasarela bancaria y catálogo de 500 productos.',
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  }
];

const ORDERS_STORAGE_KEY = 'inversa_orders_corporate_v2';

const getLocalOrders = (): Pedido[] => {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
  } catch {
    return INITIAL_DEMO_ORDERS;
  }
};

const saveLocalOrders = (orders: Pedido[]) => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error al guardar pedidos locales:', e);
  }
};

export const createOrder = async (orderData: Omit<Pedido, 'id' | 'createdAt'>): Promise<Pedido> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'pedidos'), {
        ...orderData,
        createdAt: serverTimestamp()
      });
      return {
        ...orderData,
        id: docRef.id,
        createdAt: new Date().toISOString()
      };
    } catch (e) {
      console.warn('Error al registrar pedido en Firestore, usando persistencia local:', e);
    }
  }

  const newOrder: Pedido = {
    ...orderData,
    id: `ORD-MX-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString()
  };
  const current = getLocalOrders();
  saveLocalOrders([newOrder, ...current]);
  return newOrder;
};

export const getOrders = async (): Promise<Pedido[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'pedidos'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        } as Pedido));
      }
    } catch (e) {
      console.warn('Consulta a Firestore no disponible, usando base local:', e);
    }
  }

  return getLocalOrders();
};

export const updateOrderStatus = async (orderId: string, nuevoEstado: EstadoPedido): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'pedidos', orderId);
      await updateDoc(docRef, { estado: nuevoEstado });
      return;
    } catch (e) {
      console.warn('Error al actualizar estado en Firestore, guardando local:', e);
    }
  }

  const current = getLocalOrders();
  const updated = current.map((ord) => (ord.id === orderId ? { ...ord, estado: nuevoEstado } : ord));
  saveLocalOrders(updated);
};

export const generateWhatsAppCheckoutUrl = (pedido: Pedido): string => {
  const rawPhone = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '5215555555555';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

  let message = `[ORDEN DE COMPRA - INVERSA TECNOLOGÍA EN MOVIMIENTO]\n\n`;
  message += `Folio de Registro: #${pedido.id}\n`;
  message += `Cliente: ${pedido.clienteNombre}\n`;
  message += `Contacto: ${pedido.clienteTelefono}\n`;
  if (pedido.clienteEmail) {
    message += `Correo Corporativo: ${pedido.clienteEmail}\n`;
  }
  message += `\nDETALLE DE LA ORDEN:\n`;

  pedido.items.forEach((item, index) => {
    message += `${index + 1}. [${item.tipo === 'hardware' ? 'HARDWARE' : 'DESARROLLO'}] ${item.titulo}\n`;
    message += `   Cantidad: ${item.cantidad} | P. Unitario: $${formatPrice(item.precio)} MXN\n`;
    message += `   Importe: $${formatPrice(item.precio * item.cantidad)} MXN\n`;
  });

  message += `\nTOTAL DE LA ORDEN: $${formatPrice(pedido.total)} MXN\n`;

  if (pedido.notas && pedido.notas.trim() !== '') {
    message += `\nNotas y Requerimientos Adicionales:\n${pedido.notas.trim()}\n`;
  }

  message += `\nSolicito confirmación de disponibilidad para procesamiento institucional de la orden.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
