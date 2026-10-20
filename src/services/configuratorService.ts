import { db, isFirebaseConfigured } from '../lib/firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { ConfigState, QuoteCalculation, SavedSoftwareQuote } from '../types/configurator';

const FIRESTORE_COLLECTION = 'cotizaciones_software';
const LOCAL_STORAGE_KEY = 'inversa_saved_software_quotes';

function generateQuoteId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INV-WEB-${random}`;
}

export async function saveSoftwareQuote(
  clientInfo: {
    name: string;
    company?: string;
    email?: string;
    phone: string;
    notes?: string;
  },
  config: ConfigState,
  calculation: QuoteCalculation
): Promise<{ quote: SavedSoftwareQuote; shareUrl: string; whatsappUrl: string }> {
  const id = generateQuoteId();
  const createdAt = new Date().toISOString();

  const newQuote: SavedSoftwareQuote = {
    id,
    clientName: clientInfo.name.trim(),
    clientCompany: clientInfo.company?.trim(),
    clientEmail: clientInfo.email?.trim(),
    clientPhone: clientInfo.phone.trim(),
    clientNotes: clientInfo.notes?.trim(),
    config: {
      ...config,
      clientInfo: {
        name: clientInfo.name,
        company: clientInfo.company || '',
        email: clientInfo.email || '',
        phone: clientInfo.phone,
        notes: clientInfo.notes || ''
      }
    },
    calculation,
    createdAt,
    status: 'pendiente'
  };

  // 1. Guardar en localStorage como persistencia offline garantizada
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
    const localQuotes: SavedSoftwareQuote[] = rawLocal ? JSON.parse(rawLocal) : [];
    localQuotes.unshift(newQuote);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localQuotes.slice(0, 50)));
  } catch (e) {
    console.warn('No se pudo guardar la cotización en almacenamiento local:', e);
  }

  // 2. Persistir en Firestore de Firebase si está configurado
  if (isFirebaseConfigured && db) {
    try {
      const quoteDocRef = doc(collection(db, FIRESTORE_COLLECTION), id);
      await setDoc(quoteDocRef, newQuote);
      console.log(`[Firebase] Cotización ${id} guardada exitosamente en Firestore.`);
    } catch (firebaseErr) {
      console.warn('[Firebase] Falló el guardado remoto en Firestore, la cotización se conservará localmente:', firebaseErr);
    }
  }

  // 3. Generar enlace de compartir y WhatsApp comercial
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://inversati.com';
  const shareUrl = `${origin}/?tab=crea_tu_web&folio=${id}`;

  const cleanPhone = (import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '5215555555555').replace(/[^0-9]/g, '');
  const activeModulesNames = calculation.includedFeatures.slice(0, 4).join(', ');
  
  const whatsappMsg = `¡Hola Inversa! Acabo de generar mi propuesta en el Configurador Web con Folio *#${id}*.
  
*Cliente:* ${newQuote.clientName}${newQuote.clientCompany ? ` (${newQuote.clientCompany})` : ''}
*Estilo:* ${config.theme}
*Módulos:* ${activeModulesNames}
*Páginas:* ${config.pagesCount} página(s)
*Inversión Estimada:* $${calculation.total.toLocaleString('es-MX')} MXN (IVA incluido)
*Tiempo estimado:* ~${calculation.estimatedDays} días hábiles

Deseo coordinar la validación técnica y arranque de mi proyecto.`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  return {
    quote: newQuote,
    shareUrl,
    whatsappUrl
  };
}

export async function getSoftwareQuoteById(id: string): Promise<SavedSoftwareQuote | null> {
  // Intentar Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data() as SavedSoftwareQuote;
      }
    } catch (e) {
      console.warn('[Firebase] Error al buscar cotización en Firestore:', e);
    }
  }

  // Fallback LocalStorage
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (rawLocal) {
      const localQuotes: SavedSoftwareQuote[] = JSON.parse(rawLocal);
      const found = localQuotes.find((q) => q.id === id);
      if (found) return found;
    }
  } catch (e) {
    console.error('Error al recuperar cotización local:', e);
  }

  return null;
}
