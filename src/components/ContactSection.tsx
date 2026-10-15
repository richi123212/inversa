import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle, 
  ArrowLeft,
  Building2,
  FileText
} from 'lucide-react';

interface ContactSectionProps {
  onGoToStore: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onGoToStore }) => {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState<'hardware' | 'web' | 'corporativo'>('hardware');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [folio, setFolio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) return;

    const generatedFolio = `INV-ATN-${Math.floor(100000 + Math.random() * 900000)}`;
    setFolio(generatedFolio);
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-[#080C14] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back to store navigation */}
        <button
          onClick={onGoToStore}
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-8 bg-[#0F172A] px-3.5 py-2 rounded-xl border border-[#1E293B]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la Tienda</span>
        </button>

        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0F172A] border border-cyan-500/30 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            MESA DE ATENCIÓN &amp; SOPORTE DIRECTO
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contacto &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              Atención a Clientes
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Canal de atención abierto para personas, profesionistas independientes y empresas. Resolvemos dudas sobre productos de hardware, compras y desarrollo de páginas web.
          </p>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Corporate Information */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Canales de Correo Oficial</h3>
                  <span className="text-xs text-slate-400 font-mono">Respuesta en &lt; 24 horas</span>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#080C14] border border-white/5">
                  <span className="text-slate-400">Ventas &amp; Hardware:</span>
                  <span className="text-cyan-300 font-semibold">ventas@inversa.mx</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#080C14] border border-white/5">
                  <span className="text-slate-400">Desarrollo Web:</span>
                  <span className="text-blue-300 font-semibold">proyectos@inversa.tech</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#080C14] border border-white/5">
                  <span className="text-slate-400">Facturación &amp; CFDI:</span>
                  <span className="text-slate-300 font-semibold">fiscal@inversa.mx</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Horario de Operaciones</h3>
                  <span className="text-xs text-slate-400 font-mono">Tiempo del Centro de México (CDMX)</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lunes a Viernes: <strong>09:00 - 18:00 hrs</strong><br />
                Sábados: <strong>10:00 - 14:00 hrs</strong> (Guardia técnica de despacho)
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Cobertura Nacional</h3>
                  <span className="text-xs text-slate-400 font-mono">Toda la República Mexicana</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Centro de distribución en Ciudad de México con envíos asegurados mediante paquetería institucional de alta seguridad a los 32 estados de la República.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#0F172A] border border-[#1E293B] shadow-xl">
              
              {enviado ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Solicitud Recibida con Éxito</h3>
                  <div className="mt-3 px-4 py-2 rounded-xl bg-[#080C14] border border-[#1E293B] font-mono text-cyan-400 text-xs">
                    Folio de Atención: #{folio}
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                    Hemos registrado su mensaje. Un asesor especializado de Inversa revisará sus requerimientos y se comunicará a la brevedad vía correo electrónico.
                  </p>
                  <button
                    onClick={() => { setEnviado(false); setNombre(''); setEmail(''); setMensaje(''); }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-[#1E293B] hover:bg-slate-700 text-white text-xs font-semibold transition-all"
                  >
                    Enviar Otra Consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B]">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Formulario de Contacto Directo
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full px-4 py-2.5 bg-[#080C14] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Empresa o Negocio (Opcional)
                      </label>
                      <input
                        type="text"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Ej. Mi Negocio / Particular"
                        className="w-full px-4 py-2.5 bg-[#080C14] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Correo Electrónico de Contacto *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full px-4 py-2.5 bg-[#080C14] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Línea de Interés
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTipoConsulta('hardware')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          tipoConsulta === 'hardware'
                            ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                            : 'bg-[#080C14] border-[#1E293B] text-slate-400 hover:text-white'
                        }`}
                      >
                        Hardware
                      </button>
                      <button
                        type="button"
                        onClick={() => setTipoConsulta('web')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          tipoConsulta === 'web'
                            ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                            : 'bg-[#080C14] border-[#1E293B] text-slate-400 hover:text-white'
                        }`}
                      >
                        Páginas Web
                      </button>
                      <button
                        type="button"
                        onClick={() => setTipoConsulta('corporativo')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          tipoConsulta === 'corporativo'
                            ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                            : 'bg-[#080C14] border-[#1E293B] text-slate-400 hover:text-white'
                        }`}
                      >
                        Corporativo
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mensaje o Descripción de Requerimientos *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      placeholder="Describa el equipo, volumen o solución web que requiere su empresa..."
                      className="w-full px-4 py-2.5 bg-[#080C14] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje de Atención</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
