import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Claves de API inactivas, placeholders o de ejemplo que generan auth/api-key-not-valid
const INVALID_API_KEYS = [
  'tu_api_key_aqui',
  'dummy-key-for-development',
  'AIzaSyBFFApZAI8kKJM1Ut8qJzx1wpdtSzHBsW8'
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
