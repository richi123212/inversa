import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const rawApiKey = (import.meta.env.VITE_FIREBASE_API_KEY || '').trim();
// Autocorrección de clave de consola si venía con typo de mayúsculas (BFFApZ vs BFFaPZ)
const validApiKey = rawApiKey === 'AIzaSyBFFApZAI8kKJM1Ut8qJzx1wpdtSzHBsW8'
  ? 'AIzaSyBFFaPZAI8kKJM1Ut8qJzx1wpdtSzHBsW8'
  : (rawApiKey || 'AIzaSyBFFaPZAI8kKJM1Ut8qJzx1wpdtSzHBsW8');

const firebaseConfig = {
  apiKey: validApiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'inversa-fe40f.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'inversa-fe40f',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'inversa-fe40f.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '216146538356',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:216146538356:web:e1af78e81991263125c621'
};

const INVALID_API_KEYS = [
  'tu_api_key_aqui',
  'dummy-key-for-development'
];

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  !INVALID_API_KEYS.includes(firebaseConfig.apiKey) &&
  firebaseConfig.apiKey.length > 20 &&
  firebaseConfig.projectId !== 'inversa-tech-demo' &&
  firebaseConfig.projectId !== 'tu-proyecto' &&
  firebaseConfig.projectId !== 'demo-project'
);

let app: FirebaseApp | undefined = undefined;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

try {
  if (isFirebaseConfigured) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  }
} catch (error) {
  console.warn("Firebase no está totalmente inicializado:", error);
}

export { app, db, auth, storage };
export default app;
