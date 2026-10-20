import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Loader2, 
  Copy, 
  Check, 
  MessageSquare, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  Building,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { ConfigState, QuoteCalculation, SavedSoftwareQuote } from '../../types/configurator';
import { saveSoftwareQuote } from '../../services/configuratorService';
import { formatPrice } from '../../utils/formatters';

interface SaveQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ConfigState;
  calculation: QuoteCalculation;
  onQuoteSaved?: (quote: SavedSoftwareQuote) => void;
}

export const SaveQuoteModal: React.FC<SaveQuoteModalProps> = ({
  isOpen,
  onClose,
  config,
  calculation,
  onQuoteSaved
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    quote: SavedSoftwareQuote;
    shareUrl: string;
    whatsappUrl: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Por favor ingrese su nombre o persona de contacto.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setError('Por favor ingrese un número de teléfono válido para la cotización.');
      return;
    }

    setSaving(true);
    try {
      const res = await saveSoftwareQuote(
        {
          name: name.trim(),
          company: company.trim(),
          phone: phone.trim(),
          email: email.trim(),
          notes: notes.trim()
        },
        config,
        calculation
      );

      setResult(res);
      onQuoteSaved?.(res.quote);
    } catch (err: any) {
      console.error('Error al guardar cotización:', err);
      setError('Ocurrió un error al registrar la cotización. Por favor intente nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col relative text-left">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <FileText className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                {result ? 'Cotización Registrada con Éxito' : 'Guardar Cotización & Generar Propuesta'}
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">
                Inversa Plataforma de Software • Folio Oficial
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {result ? (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-950/70 border border-emerald-800/80 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                  GUARDADO EN FIREBASE FIRESTORE
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  Folio: #{result.quote.id}
                </h4>
                <p className="text-xs text-zinc-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
                  Tu configuración técnica y financiera ha sido registrada. Puedes compartir este enlace o enviarla directamente por WhatsApp a nuestro equipo de arquitectura de software.
                </p>
              </div>

              {/* Summary pill */}
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-left space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Cliente:</span>
                  <span className="text-white font-semibold">{result.quote.clientName}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estilo Visual:</span>
                  <span className="text-zinc-200 capitalize">{result.quote.config.theme.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Tiempo de Entrega:</span>
                  <span className="text-zinc-200 font-bold">~{result.quote.calculation.estimatedDays} días hábiles</span>
                </div>
                <div className="flex justify-between text-zinc-400 pt-1.5 border-t border-zinc-800 text-sm">
                  <span>Inversión Total (IVA inc):</span>
                  <span className="text-emerald-400 font-bold">${formatPrice(result.quote.calculation.total)} MXN</span>
                </div>
              </div>

              {/* Action buttons on success */}
              <div className="space-y-2 pt-2">
                <a
                  href={result.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Propuesta por WhatsApp a Inversa</span>
                </a>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={result.shareUrl}
                    className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copiar Link</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-400 block text-[11px]">Inversión configurada:</span>
                  <span className="text-sm font-bold font-mono text-white">
                    ${formatPrice(calculation.total)} MXN
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 block text-[11px]">Entrega estimada:</span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    ~{calculation.estimatedDays} días hábiles
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                    Nombre Completo o Contacto *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Ing. Sofía Reyes"
                      className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                    Empresa / Organización (Opcional)
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ej. Soluciones Logísticas MX"
                      className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Teléfono WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="55 1234 5678"
                        className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contacto@empresa.com"
                        className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                    Requerimientos o Comentarios Específicos
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Detalles adicionales sobre APIs, pasarelas o fecha meta..."
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 resize-none font-sans"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Cifrado SSL Seguro
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 rounded-lg text-zinc-400 hover:text-white text-xs font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Guardando...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Registrar Propuesta</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
