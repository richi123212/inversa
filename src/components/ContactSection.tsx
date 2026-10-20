import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ArrowLeft,
  Building2,
  FileText,
  Phone,
  MessageSquare
} from 'lucide-react';

interface ContactSectionProps {
  onGoToStore: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onGoToStore }) => {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [rfc, setRfc] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState<'hardware' | 'web' | 'volumen'>('hardware');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [folio, setFolio] = useState('');

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '5215555555555';
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) return;

    const generatedFolio = `INV-B2B-${Math.floor(100000 + Math.random() * 900000)}`;
    setFolio(generatedFolio);
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back navigation */}
        <button
          onClick={onGoToStore}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8 bg-zinc-900 px-3.5 py-2 rounded-lg border border-zinc-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Catálogo</span>
        </button>

        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Mesa de Atención Corporativa</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contacto y Asesoría B2B
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Canal directo de comunicación para profesionistas, empresas e instituciones en México. Resolvemos consultas sobre compras de hardware, cotizaciones por volumen, facturación fiscal CFDI 4.0 y desarrollo de software.
          </p>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Corporate Information */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700">
                  <Mail className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Canales de Correo Electrónico</h3>
                  <span className="text-xs text-zinc-400 font-mono">Tiempo de respuesta estimado: &lt; 24 hrs</span>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80">
                  <span className="text-zinc-400">Ventas &amp; Hardware:</span>
                  <span className="text-zinc-200 font-semibold">ventas@inversati.com</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80">
                  <span className="text-zinc-400">Proyectos de Software:</span>
                  <span className="text-zinc-200 font-semibold">proyectos@inversati.com</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80">
                  <span className="text-zinc-400">Facturación &amp; CFDI:</span>
                  <span className="text-zinc-200 font-semibold">facturacion@inversati.com</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Atención Rápida por WhatsApp</h3>
                  <span className="text-xs text-zinc-400 font-mono">Para empresas y profesionistas</span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Chatea directamente con un asesor para resolver dudas técnicas de compatibilidad o disponibilidad inmediata en almacén.
              </p>
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola, me comunico desde el portal de Inversa para solicitar una cotización o asesoría.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Iniciar Chat en WhatsApp</span>
              </a>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700">
                  <Clock className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Horario de Operaciones</h3>
                  <span className="text-xs text-zinc-400 font-mono">Tiempo del Centro de México (CDMX)</span>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Lunes a Viernes: <strong>09:00 - 18:00 hrs</strong><br />
                Sábados: <strong>10:00 - 14:00 hrs</strong> (Mesa técnica y despachos)
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Cobertura Nacional</h3>
                  <span className="text-xs text-zinc-400 font-mono">República Mexicana</span>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Centro logístico con envíos asegurados mediante DHL Express y FedEx a las 32 entidades de la República Mexicana.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive B2B Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl">
              
              {enviado ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-5">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Solicitud Recibida Correctamente</h3>
                  <div className="mt-2.5 px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-zinc-300 text-xs">
                    Folio de Seguimiento: #{folio}
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
                    Hemos registrado su solicitud corporativa. Un asesor de Inversa revisará sus requerimientos técnicos y se comunicará a la brevedad con la propuesta correspondiente.
                  </p>
                  <button
                    onClick={() => { setEnviado(false); setNombre(''); setEmail(''); setMensaje(''); }}
                    className="mt-6 px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
                  >
                    Enviar Otra Consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
                    <FileText className="w-4 h-4 text-zinc-400" />
                    <h3 className="text-sm font-semibold text-white">
                      Formulario de Cotización &amp; Atención
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej. Roberto Morales"
                        className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Empresa o Razón Social
                      </label>
                      <input
                        type="text"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Ej. Soluciones Tecnológicas S.A. de C.V."
                        className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contacto@empresa.com"
                        className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Teléfono / WhatsApp de Contacto
                      </label>
                      <input
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Ej. 55 1234 5678"
                        className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Tipo de Requerimiento
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTipoConsulta('hardware')}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                          tipoConsulta === 'hardware'
                            ? 'bg-zinc-100 text-zinc-950 border-white font-semibold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        Hardware &amp; Equipos
                      </button>
                      <button
                        type="button"
                        onClick={() => setTipoConsulta('web')}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                          tipoConsulta === 'web'
                            ? 'bg-zinc-100 text-zinc-950 border-white font-semibold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        Desarrollo Web / SaaS
                      </button>
                      <button
                        type="button"
                        onClick={() => setTipoConsulta('volumen')}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                          tipoConsulta === 'volumen'
                            ? 'bg-zinc-100 text-zinc-950 border-white font-semibold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        Cotización por Volumen
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Descripción del Proyecto o Requerimiento Técnico *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      placeholder="Describa el equipo, volumen requerido o las características de su proyecto web..."
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud de Cotización</span>
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
