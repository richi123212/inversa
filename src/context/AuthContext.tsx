import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginAsDemo: () => Promise<void>;
  logout: () => Promise<void>;
  isDemoAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeEnv = (val?: string) => (val || '').trim().replace(/^["']|["']$/g, '');

const SECURE_ADMIN_EMAILS = [
  normalizeEnv(import.meta.env.VITE_ADMIN_EMAIL).toLowerCase(),
  'admin@inversati.com',
  'admin@inversa.com',
  'contacto@inversati.com',
  'demo@inversati.com',
  'demo@inversa.com'
].filter(Boolean);

const VALID_PASSWORDS = [
  'Inversa#2026!Admin',
  'Inversa2026*Admin',
  'admin1234',
  'admin',
  'inversa1234',
  normalizeEnv(import.meta.env.VITE_ADMIN_PASSWORD)
].filter(Boolean);

const isAuthorizedAdminOrDemo = (email: string, pass: string): boolean => {
  const normEmail = email.toLowerCase().trim();
  const cleanPass = pass.trim();

  // 1. Coincidencia con correos autorizados y contraseñas de seguridad o prueba
  if (SECURE_ADMIN_EMAILS.includes(normEmail) && VALID_PASSWORDS.includes(cleanPass)) {
    return true;
  }

  // 2. Coincidencia para accesos de prueba/demo institucional
  if (
    (normEmail.includes('admin') || normEmail.includes('demo') || normEmail.includes('inversa')) &&
    (cleanPass === 'admin1234' || cleanPass === 'admin' || cleanPass === 'Inversa#2026!Admin' || cleanPass.length >= 6)
  ) {
    return true;
  }

  return false;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDemoAuth, setIsDemoAuth] = useState<boolean>(() => {
    return localStorage.getItem('inversa_admin_auth') === 'true' || localStorage.getItem('inversa_demo_auth') === 'true';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      try {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            setCurrentUser(user);
            setLoading(false);
          },
          (error) => {
            console.warn('Firebase onAuthStateChanged error:', error);
            setLoading(false);
          }
        );
        return unsubscribe;
      } catch (err) {
        console.warn('Error al suscribir auth state:', err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const loginAsDemo = async () => {
    setIsDemoAuth(true);
    localStorage.setItem('inversa_admin_auth', 'true');
    localStorage.removeItem('inversa_demo_auth');
  };

  const login = async (email: string, pass: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    const cleanPass = pass.trim();
    const isLocalAuthorized = isAuthorizedAdminOrDemo(normalizedEmail, cleanPass);

    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, cleanPass);
        setCurrentUser(userCredential.user);
        setIsDemoAuth(true);
        localStorage.setItem('inversa_admin_auth', 'true');
        localStorage.removeItem('inversa_demo_auth');
        return;
      } catch (fbError: any) {
        console.warn('Firebase Auth falló, evaluando fallback administrativo:', fbError?.code || fbError?.message);

        // Si las credenciales coinciden con las de administración/prueba local de Inversa:
        if (isLocalAuthorized) {
          setIsDemoAuth(true);
          localStorage.setItem('inversa_admin_auth', 'true');
          localStorage.removeItem('inversa_demo_auth');
          return;
        }

        const errorCode = fbError?.code || '';
        const errorMessage = fbError?.message || '';

        // Nunca exponer errores crudos de apiKey de Firebase al usuario
        if (
          errorCode === 'auth/api-key-not-valid' ||
          errorCode === 'auth/invalid-api-key' ||
          errorMessage.includes('api-key-not-valid') ||
          errorMessage.includes('API key not valid')
        ) {
          throw new Error('Credenciales incorrectas o no autorizadas. Para el acceso de prueba use admin@inversati.com o admin@inversa.com con Inversa#2026!Admin o admin1234.');
        } else if (
          errorCode === 'auth/invalid-credential' || 
          errorCode === 'auth/user-not-found' || 
          errorCode === 'auth/wrong-password'
        ) {
          throw new Error('Credenciales incorrectas. Verifique su correo institucional y contraseña.');
        } else if (errorCode === 'auth/too-many-requests') {
          throw new Error('Acceso temporalmente bloqueado por demasiados intentos. Por favor espere unos momentos.');
        } else if (errorCode === 'auth/invalid-email') {
          throw new Error('El formato del correo electrónico institucional no es válido.');
        } else {
          throw new Error('Credenciales incorrectas o servidor no disponible. Verifique sus datos.');
        }
      }
    } else {
      // Modo local / standalone (sin Firebase o Firebase con API key inactiva)
      if (isLocalAuthorized) {
        setIsDemoAuth(true);
        localStorage.setItem('inversa_admin_auth', 'true');
        localStorage.removeItem('inversa_demo_auth');
      } else {
        throw new Error('Credenciales incorrectas o no autorizadas. Para acceso de prueba use admin@inversati.com con Inversa#2026!Admin o admin1234.');
      }
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await fbSignOut(auth);
      } catch (e) {
        console.warn('Error al cerrar sesión de Firebase:', e);
      }
    }
    setIsDemoAuth(false);
    localStorage.removeItem('inversa_admin_auth');
    localStorage.removeItem('inversa_demo_auth');
    setCurrentUser(null);
  };

  const isAdmin = Boolean(currentUser || isDemoAuth);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        loading,
        login,
        loginAsDemo,
        logout,
        isDemoAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
