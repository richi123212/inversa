import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  HelpCircle,
  CheckCircle2,
  X,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { InversaLogo } from '../components/InversaLogo';

export const LoginPage: React.FC = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => {
    return localStorage.getItem('inversa_remembered_email') || '';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    return Boolean(localStorage.getItem('inversa_remembered_email'));
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const whatsAppPhone = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '5215555555555';

  // Redirigir al panel si ya está autenticado
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  // Manejador del temporizador de bloqueo por fuerza bruta
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setError('');
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError('Por favor ingrese su correo electrónico institucional.');
      return;
    }

    if (!password) {
      setError('Por favor ingrese su contraseña de seguridad.');
      return;
    }

    setLoading(true);

    try {
      await login(cleanEmail, password);

      // Guardar o eliminar el correo recordado
      if (rememberMe) {
        localStorage.setItem('inversa_remembered_email', cleanEmail);
      } else {
        localStorage.removeItem('inversa_remembered_email');
      }

      setFailedAttempts(0);
      navigate('/admin');
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (nextAttempts >= 5) {
        setLockoutSeconds(30);
        setError('Demasiados intentos fallidos. Acceso temporalmente bloqueado por 30 segundos por seguridad.');
      } else {
        setError(
          err.message || 'Credenciales incorrectas o no autorizadas. Verifique sus datos.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-12">
      {/* Luces y resplandores ambientales de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Botón Superior: Retornar al Sitio Público */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0F172A]/80 border border-[#1E293B] text-xs font-mono text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Catálogo</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Cabecera Oficial de Marca */}
        <div className="flex flex-col items-center mb-6 text-center">
          <InversaLogo size="lg" showText={true} animated={false} />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-mono tracking-widest uppercase mt-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ACCESO ADMINISTRATIVO
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-2.5">
            Panel de Control Inversa
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs">
            Gestión de catálogo, inventario en tiempo real y pedidos de clientes.
          </p>
        </div>

        {/* Tarjeta Principal de Login */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md relative overflow-hidden">
          
          {/* Alerta de Error */}
          {error && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <div className="flex-1">
                <span className="font-semibold block mb-0.5">Acceso no autorizado</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Formulario de Acceso */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center justify-between">
                <span>Correo Electrónico Autorizado</span>
                <span className="text-[10px] font-mono text-zinc-500">Panel Inversa</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@inversati.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center justify-between">
                <span>Contraseña de Seguridad</span>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="text-[10px] text-zinc-400 hover:text-zinc-200 font-mono transition-colors"
                >
                  ¿Olvidó su contraseña?
                </button>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                  title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox: Recordar Usuario */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-zinc-100 cursor-pointer accent-zinc-200"
                />
                <span className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
                  Recordar usuario en este equipo
                </span>
              </label>
            </div>

            {/* Botón de Envío */}
            <button
              type="submit"
              disabled={loading || lockoutSeconds > 0}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-800" />
                  <span>Verificando Credenciales...</span>
                </>
              ) : lockoutSeconds > 0 ? (
                <span>Bloqueado ({lockoutSeconds}s)</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-zinc-800" />
                  <span>Ingresar al Panel de Control</span>
                </>
              )}
            </button>
          </form>

          {/* Sello de Seguridad Corporativo */}
          <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-400 font-mono text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Cifrado Seguro SSL 256-Bit
            </span>
            <span className="font-mono text-[10px] text-zinc-500">
              Inversa Access Control
            </span>
          </div>

        </div>

        {/* Nota Legal & Ciberseguridad */}
        <p className="mt-6 text-center text-[10px] text-zinc-500 leading-relaxed px-4 font-mono">
          Acceso reservado exclusivamente para operadores autorizados de Inversa. Todo intento de acceso no autorizado es registrado bajo estándares de auditoría informática.
        </p>

      </div>

      {/* Modal de Asistencia / Restablecimiento */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl relative text-left">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>

            <h3 className="text-sm font-semibold text-white mb-1.5">
              Soporte de Acceso Administrativo
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Por políticas de ciberseguridad, las contraseñas del panel administrativo no pueden restablecerse públicamente. Contacte directamente a la Dirección de TI para validar su identidad y asignar credenciales seguras.
            </p>

            <div className="space-y-2">
              <a
                href={`https://wa.me/${whatsAppPhone}?text=${encodeURIComponent('Hola Inversa TI, solicito asistencia para restablecimiento o alta de credenciales administrativas.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Contactar a Soporte por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="w-full py-2 px-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
