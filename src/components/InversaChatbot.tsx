import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquareText, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  ChevronRight, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle,
  Cpu,
  Truck,
  FileText,
  Code2,
  CreditCard,
  Headphones,
  ExternalLink,
  Minus
} from 'lucide-react';
import { 
  FAQ_KNOWLEDGE_BASE, 
  FAQ_TOPICS, 
  FaqItem, 
  predictQuestions, 
  findBestAnswer 
} from '../data/faqKnowledgeBase';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  faqItem?: FaqItem;
  suggestedQuestions?: FaqItem[];
}

interface InversaChatbotProps {
  onNavigateTab?: (tab: 'hardware' | 'crea_tu_web') => void;
}

export const InversaChatbot: React.FC<InversaChatbotProps> = ({ onNavigateTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('todos');
  const [predictions, setPredictions] = useState<FaqItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialGreeting: ChatMessage = {
    id: 'msg-welcome',
    sender: 'bot',
    text: `¡Hola! Soy el **Asistente Inversa**. Estoy aquí para orientarte de inmediato con cualquier duda sobre **hardware, especificaciones técnicas, envíos** y el desarrollo de **páginas web a la medida**.

Puedes escribir tu pregunta abajo (el sistema predecirá la respuesta mientras escribes) o seleccionar una de las opciones disponibles:`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedQuestions: FAQ_KNOWLEDGE_BASE.filter((f) => f.destacada).slice(0, 5)
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll al final de la conversación
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Actualizar predicciones en tiempo real mientras el usuario teclea
  useEffect(() => {
    if (inputMessage.trim().length >= 2) {
      const preds = predictQuestions(inputMessage.trim(), 4);
      setPredictions(preds);
    } else {
      setPredictions([]);
    }
  }, [inputMessage]);

  const handleOpenWhatsApp = (customMessage?: string) => {
    const text = customMessage || 'Hola Inversa, me gustaría consultar información técnica sobre sus productos y servicios.';
    const url = `https://wa.me/525547630737?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleExecuteAction = (actionType?: string, payload?: string) => {
    if (actionType === 'ir_hardware') {
      if (onNavigateTab) onNavigateTab('hardware');
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else if (actionType === 'ir_cotizador') {
      if (onNavigateTab) onNavigateTab('crea_tu_web');
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else if (actionType === 'whatsapp') {
      handleOpenWhatsApp(payload);
    }
  };

  const handleSelectFaq = (faq: FaqItem) => {
    setHasInteracted(true);
    setInputMessage('');
    setPredictions([]);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: faq.pregunta,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      // Preguntas relacionadas de la misma categoría
      const related = FAQ_KNOWLEDGE_BASE
        .filter((f) => f.id !== faq.id && f.categoria === faq.categoria)
        .slice(0, 3);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: faq.respuesta,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        faqItem: faq,
        suggestedQuestions: related.length > 0 ? related : undefined
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputMessage.trim();
    if (!query) return;

    setHasInteracted(true);
    setInputMessage('');
    setPredictions([]);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const match = findBestAnswer(query);

      if (match) {
        const related = FAQ_KNOWLEDGE_BASE
          .filter((f) => f.id !== match.id && f.categoria === match.categoria)
          .slice(0, 3);

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: match.respuesta,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          faqItem: match,
          suggestedQuestions: related.length > 0 ? related : undefined
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // Respuesta fallback inteligente cuando no hay coincidencia exacta
        const fallbacks = FAQ_KNOWLEDGE_BASE.filter((f) => f.destacada).slice(0, 4);
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `No encontré una respuesta exacta para **"${query}"** en nuestra base de datos automatizada.

Puedes revisar una de las preguntas frecuentes más consultadas o comunicarte de inmediato con un **ingeniero humano por WhatsApp** para atender tu consulta de forma directa:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedQuestions: fallbacks,
          faqItem: {
            id: 'fallback-action',
            categoria: 'soporte',
            categoriaLabel: 'Soporte',
            pregunta: query,
            keywords: [],
            respuesta: '',
            destacada: false,
            actionType: 'whatsapp',
            actionLabel: 'Hablar con Asesor Humano en WhatsApp',
            actionPayload: `Hola Inversa, tengo una duda específica sobre: "${query}"`
          }
        };
        setMessages((prev) => [...prev, botMsg]);
      }

      setIsTyping(false);
    }, 500);
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
    setInputMessage('');
    setPredictions([]);
    setSelectedTopic('todos');
  };

  // Preguntas filtradas por tema para las sugerencias rápidas
  const filteredQuickQuestions = FAQ_KNOWLEDGE_BASE.filter((f) => {
    if (selectedTopic === 'todos') return f.destacada;
    return f.categoria === selectedTopic;
  });

  const getTopicIcon = (topicId: string) => {
    switch (topicId) {
      case 'hardware': return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'envios': return <Truck className="w-3.5 h-3.5 text-blue-400" />;
      case 'facturacion': return <FileText className="w-3.5 h-3.5 text-emerald-400" />;
      case 'desarrollo_web': return <Code2 className="w-3.5 h-3.5 text-purple-400" />;
      case 'pagos': return <CreditCard className="w-3.5 h-3.5 text-amber-400" />;
      case 'soporte': return <Headphones className="w-3.5 h-3.5 text-rose-400" />;
      default: return <HelpCircle className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Ventana de Chat Expandida */}
      {isOpen && (
        <div 
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl bg-[#090E1B]/95 border border-cyan-500/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.18)] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95"
        >
          {/* Header Superior del Chatbot */}
          <div className="px-4 py-3 bg-[#0D1528] border-b border-[#1E293B] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full bg-[#080C14] rounded-[10px] flex items-center justify-center text-cyan-400">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090E1B] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-white tracking-wide uppercase">Asistente Inversa</h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    FAQ Predictivo
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  En línea • Base de conocimiento activa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleResetChat}
                title="Reiniciar conversación"
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimizar chat"
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Selector de Temas Rápidos */}
          <div className="px-3 py-2 bg-[#080D18] border-b border-[#1E293B]/70 overflow-x-auto flex items-center gap-1.5 shrink-0 scrollbar-none">
            {FAQ_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedTopic === topic.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 bg-[#0F172A]/60 border border-white/5'
                }`}
              >
                {getTopicIcon(topic.id)}
                <span>{topic.label}</span>
              </button>
            ))}
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed shadow-md ${
                      isBot
                        ? 'bg-[#0E172A] border border-[#1E293B] text-slate-200'
                        : 'bg-cyan-600/30 border border-cyan-400/40 text-cyan-100'
                    }`}
                  >
                    {/* Render de texto con formato bold y viñetas */}
                    <div className="space-y-2 whitespace-pre-line text-[11.5px]">
                      {msg.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph.split('**').map((part, partIdx) => 
                            partIdx % 2 === 1 ? (
                              <strong key={partIdx} className="text-white font-bold">{part}</strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Botón de Acción Contextual */}
                    {msg.faqItem?.actionType && (
                      <div className="mt-3 pt-2.5 border-t border-white/10">
                        <button
                          onClick={() => handleExecuteAction(msg.faqItem?.actionType, msg.faqItem?.actionPayload)}
                          className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-[11px] flex items-center justify-center gap-2 shadow-lg transition-all"
                        >
                          <span>{msg.faqItem.actionLabel || 'Ver más información'}</span>
                          {msg.faqItem.actionType === 'whatsapp' ? (
                            <ExternalLink className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Preguntas sugeridas para interacción directa */}
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="mt-2.5 w-full space-y-1.5 pl-1">
                      <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider block mb-1">
                        Preguntas Relacionadas:
                      </span>
                      {msg.suggestedQuestions.map((sug) => (
                        <button
                          key={sug.id}
                          onClick={() => handleSelectFaq(sug)}
                          className="w-full text-left p-2 rounded-xl bg-[#090F1E] hover:bg-cyan-950/40 border border-[#1E293B] hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-white transition-all flex items-center justify-between group"
                        >
                          <span className="truncate pr-2">{sug.pregunta}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0E172A] border border-[#1E293B] text-slate-400 w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Menú Flotante de Predicciones en Tiempo Real (mientras se escribe) */}
          {predictions.length > 0 && (
            <div className="px-3 py-2 bg-[#070B16] border-t border-cyan-500/30 max-h-40 overflow-y-auto space-y-1 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Preguntas sugeridas según lo que escribes:
                </span>
                <span className="text-slate-500">{predictions.length} coincidencias</span>
              </div>
              {predictions.map((pred) => (
                <button
                  key={pred.id}
                  onClick={() => handleSelectFaq(pred)}
                  className="w-full text-left p-2 rounded-lg bg-[#0F172A] hover:bg-cyan-950/60 border border-[#1E293B] hover:border-cyan-500/40 text-[11px] text-slate-200 hover:text-white flex items-center justify-between gap-2 transition-all"
                >
                  <span className="truncate">{pred.pregunta}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 shrink-0">
                    {pred.categoriaLabel}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Formulario de Entrada de Pregunta */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3 bg-[#0D1528] border-t border-[#1E293B] flex items-center gap-2 shrink-0"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu duda (ej. garantía, envíos, factura...)"
                className="w-full px-3.5 py-2.5 bg-[#080C14] border border-[#1E293B] focus:border-cyan-400 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-colors pr-8 font-sans"
              />
              {inputMessage && (
                <button
                  type="button"
                  onClick={() => { setInputMessage(''); setPredictions([]); }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              title="Enviar pregunta"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Barra Inferior Informativa */}
          <div className="px-3 py-1.5 bg-[#080C14] border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500 shrink-0">
            <span>Inversa Automated Support System</span>
            <button
              onClick={() => handleOpenWhatsApp()}
              className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
            >
              WhatsApp Soporte <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      )}

      {/* Botón Flotante Launcher en Esquina Inferior Derecha */}
      <button
        id="inversa-chatbot-launcher"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 200);
          }
        }}
        className={`group relative flex items-center gap-2.5 p-3 sm:px-4 sm:py-3 rounded-2xl shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-[#0E172A] border border-cyan-500/40 text-cyan-300'
            : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-black font-bold hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]'
        }`}
        title={isOpen ? 'Cerrar Asistente' : 'Abrir Asistente Inversa'}
      >
        {/* Glow radar animation */}
        {!isOpen && (
          <span className="absolute -inset-0.5 rounded-2xl bg-cyan-400/30 blur-sm animate-pulse -z-10" />
        )}

        <div className="relative">
          {isOpen ? (
            <X className="w-5 h-5 text-cyan-300" />
          ) : (
            <MessageSquareText className="w-5 h-5 text-black" />
          )}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-cyan-500 animate-ping" />
          )}
        </div>

        <div className="hidden sm:flex flex-col text-left leading-tight">
          <span className={`text-xs font-black tracking-wide uppercase ${isOpen ? 'text-white' : 'text-slate-950'}`}>
            {isOpen ? 'Cerrar Chat' : 'Asistente Inversa'}
          </span>
          <span className={`text-[10px] font-mono ${isOpen ? 'text-cyan-400' : 'text-slate-900/90'}`}>
            {isOpen ? 'En línea' : 'Preguntas & FAQ'}
          </span>
        </div>
      </button>

    </div>
  );
};
