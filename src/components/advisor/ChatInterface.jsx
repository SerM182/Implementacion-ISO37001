import React, { useState, useRef, useEffect } from 'react';
import { queryComplianceAdvisor } from '../../utils/complianceAdvisorEngine.js';
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  ShieldCheck,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  '¿Cómo actuar si un contratista de pavimento ofrece un regalo o viaje a un inspector?',
  '¿Qué controles no financieros exige la Cl. 8.4 para los ensayos de calados y asfalto?',
  '¿Cómo proceder ante una solicitud de compra directa por supuesta urgencia vial?',
  '¿Qué requisitos de debida diligencia aplican a un socio comercial con directivos PEP?',
  '¿Cuáles son los controles financieros obligatorios en Tesorería y pagos a contratistas?'
];

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `**Hola, soy su Asistente Especialista en Compliance e Implementación de la Norma ISO 37001:2025 para AUBASA.**\n\nPuedo orientarlo técnicamente sobre la interpretación de las cláusulas de la norma (Cl. 4 a 10), el marco legal argentino (Ley 27.401, Ley Provincial 6021, Decreto 367/17) y los protocolos operativos aplicables a **Contratación, Pagos y Obras Viales** en la **Concesión Autopista Buenos Aires - La Plata (BALP - 50 km)**.\n\n¿En qué consulta o dilema ético puedo ayudarlo hoy?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      metadata: {
        tipo: 'bienvenida',
        clausulasRelacionadas: ['ISO 37001:2025', 'Ley 27.401', 'Ley 6021 PBA']
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend = inputQuery) => {
    const cleanText = textToSend.trim();
    if (!cleanText) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: cleanText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulación reactiva del motor de compliance
    setTimeout(() => {
      const response = queryComplianceAdvisor(cleanText);

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.respuesta,
        titulo: response.titulo,
        tipo: response.tipo,
        clausulasRelacionadas: response.clausulasRelacionadas || (response.clausulaIso ? [response.clausulaIso] : []),
        referenciasLegales: response.referenciasLegales || (response.marcoLegal ? [response.marcoLegal] : []),
        accionesRecomendadas: response.accionesRecomendadas || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `**Conversación reiniciada.** Estoy listo para resolver nuevas consultas sobre ISO 37001, Ley 27.401, debida diligencia de contratistas o controles de obras viales en AUBASA.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleCopyText = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[650px]">
      {/* Header del Chat */}
      <div className="p-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center">
            <Bot className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white">Consultor de Cumplimiento Antisoborno AUBASA</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-slate-400">Motor Experto ISO 37001:2025 • Ley 27.401 • Ley 6021</p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
          title="Reiniciar chat"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Cuerpo de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 shadow-md ${
                  isBot
                    ? 'bg-slate-950 border border-slate-800 text-slate-200'
                    : 'bg-cyan-600 text-white font-medium'
                }`}
              >
                {/* Título de la respuesta si existe */}
                {msg.titulo && (
                  <div className="font-bold text-cyan-300 text-xs border-b border-slate-800 pb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    {msg.titulo}
                  </div>
                )}

                {/* Texto del mensaje formateado */}
                <div className="space-y-1.5 whitespace-pre-wrap">
                  {msg.text}
                </div>

                {/* Etiquetas de Cláusulas y Leyes */}
                {(msg.clausulasRelacionadas?.length > 0 || msg.referenciasLegales?.length > 0) && (
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] text-slate-500 font-semibold">Referencias:</span>
                    {msg.clausulasRelacionadas?.map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/70"
                      >
                        {c}
                      </span>
                    ))}
                    {msg.referenciasLegales?.map((l, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-700"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                )}

                {/* Acciones Recomendadas */}
                {msg.accionesRecomendadas?.length > 0 && (
                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 mt-2 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      Acciones Institucionales Recomendadas:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-300">
                      {msg.accionesRecomendadas.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Footer del mensaje */}
                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                  <span>{msg.timestamp}</span>

                  {isBot && (
                    <button
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                      title="Copiar respuesta"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  )}
                </div>
              </div>

              {!isBot && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] text-slate-400 ml-1">Consultando base experta ISO 37001...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompts Sugeridos Rápidos */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Consultas Frecuentes:
        </span>
        {SUGGESTED_PROMPTS.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 bg-slate-900 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-700 border border-slate-800 rounded-lg text-[11px] text-slate-400 transition-colors flex-shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input de Envío */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Pregunte sobre cláusulas ISO 37001, Ley 27.401, contrataciones u obras viales en AUBASA..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-950"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Consultar</span>
          </button>
        </form>
      </div>
    </div>
  );
}
