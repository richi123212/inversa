import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../lib/firebase';
import { InversaLogo } from '../components/InversaLogo';

export const LoginPage: React.FC = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/admin');
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      setError(
        err.message || 'Credenciales no autorizadas. Verifique sus accesos administrativos.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@inversa.com');
    setPassword('admin1234');
  };

  return (
    <div className="min-h-screen bg-[#080C14] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-12">
      {/* Back to Home Button */}
      <div className="absolute top-8 left-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retornar al Catálogo Principal
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Official Logo Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <InversaLogo size="lg" showText={true} animated={true} />
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mt-4">
            PORTAL DE ACCESO ADMINISTRATIVO
          </span>
        </div>

        {/* Login Box */}
        <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl">
          
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Correo Electrónico Autorizado
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@inversa.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080C14] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Contraseña de Seguridad
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080C14] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Autenticando en Sistema...
                </>
              ) : (
                'Ingresar al Panel de Control'
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-5 border-t border-[#1E293B]">
            <div className="p-3 rounded-xl bg-[#080C14] border border-white/5 text-[11px] text-slate-400">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  Sesión de Demostración Local
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-cyan-400 hover:underline font-mono text-[10px]"
                >
                  Autocompletar
                </button>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                {isFirebaseConfigured
                  ? 'Conectado a Firebase Auth. Ingrese con sus credenciales de consola.'
                  : 'Para pruebas locales sin Firebase activo, use admin@inversa.com / admin1234.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
