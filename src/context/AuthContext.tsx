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
  logout: () => Promise<void>;
  isDemoAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDemoAuth, setIsDemoAuth] = useState<boolean>(() => {
    return localStorage.getItem('inversa_demo_auth') === 'true';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Si no hay Firebase activo pero se inició sesión en demo
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    if (isFirebaseConfigured && auth) {
      await signInWithEmailAndPassword(auth, email, pass);
      setIsDemoAuth(false);
      localStorage.removeItem('inversa_demo_auth');
    } else {
      // Modo Demo/Offline para pruebas locales
      if ((email === 'admin@inversa.com' || email.includes('admin')) && pass.length >= 6) {
        setIsDemoAuth(true);
        localStorage.setItem('inversa_demo_auth', 'true');
      } else {
        throw new Error('Credenciales inválidas en modo demostración. Usa admin@inversa.com y clave de 6+ caracteres.');
      }
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    }
    setIsDemoAuth(false);
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
