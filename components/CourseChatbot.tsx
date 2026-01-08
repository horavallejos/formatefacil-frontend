import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Minimize2, MessageCircle } from 'lucide-react';
import { Course } from '../types';
import { CONTACT_INFO } from '../constants';

interface CourseChatbotProps {
  course: Course;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const CourseChatbot: React.FC<CourseChatbotProps> = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastResponseRef = useRef('');
  const repetitionCountRef = useRef(0);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage({
          id: 'init',
          text: `¡Hola! Soy el asistente IA de FormateFacil. Estoy aquí para resolver tus dudas sobre el curso de **${course.title}**. ¿Qué te gustaría saber?`,
          sender: 'bot',
          timestamp: new Date()
        });
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, course.title]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg]);
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Price Logic
    if (q.includes('precio') || q.includes('costo') || q.includes('cuanto vale') || q.includes('pagar')) {
      return `El valor actual del curso es de **USD ${course.priceUSD}**. Es un pago único que te da acceso de por vida.`;
    }

    // Certificate Logic
    if (q.includes('certificado') || q.includes('diploma') || q.includes('titulo')) {
      return "¡Sí! Al finalizar el 100% de las clases recibirás un certificado digital oficial de FormateFacil que valida tus conocimientos para el mercado laboral.";
    }

    // Prerequisites/Experience
    if (q.includes('experiencia') || q.includes('previo') || q.includes('requisito') || q.includes('se nada') || q.includes('cero')) {
      if (course.level === 'Principiante') {
        return "No necesitas experiencia previa. Este curso está diseñado para llevarte desde cero absoluto hasta un nivel profesional.";
      } else if (course.level === 'Avanzado') {
        return "Este es un curso avanzado. Se recomienda tener conocimientos básicos previos, aunque repasamos fundamentos en el primer módulo.";
      } else {
        return "Es ideal tener nociones básicas, pero explicamos todo paso a paso para que nadie se quede atrás.";
      }
    }

    // Duration/Time
    if (q.includes('tiempo') || q.includes('dura') || q.includes('horario') || q.includes('tarda')) {
      return "El curso es 100% online y a tu ritmo. Tienes acceso las 24 horas del día. La mayoría de los estudiantes lo completan en 3 a 4 semanas dedicando 1 hora diaria.";
    }

    // Content/What will I learn
    if (q.includes('aprender') || q.includes('temario') || q.includes('contenido') || q.includes('enseña')) {
      return `Aprenderás habilidades clave como: ${course.features.slice(0, 3).join(', ')}, entre otros temas técnicos prácticos.`;
    }

    // Warranty
    if (q.includes('garantia') || q.includes('devolucion') || q.includes('seguro')) {
      return "Cuentas con una garantía de satisfacción de 7 días. Si el contenido no cumple tus expectativas, te devolvemos el 100% de tu dinero sin preguntas.";
    }

    // Default Fallback
    return "Entiendo tu consulta. Para ese detalle específico, te recomiendo hablar directamente con un asesor humano por WhatsApp para una respuesta más personalizada.";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    // Add User Message
    addMessage({
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    });

    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      let responseText = generateResponse(userText);

      // Lógica anti-loop (kill_him logic)
      if (responseText === lastResponseRef.current) {
        repetitionCountRef.current += 1;
      } else {
        repetitionCountRef.current = 1;
        lastResponseRef.current = responseText;
      }

      if (repetitionCountRef.current >= 3) {
        window.open(CONTACT_INFO.whatsappLink, '_blank');
        responseText = "Parece que estamos dando vueltas. Te abro WhatsApp para que hables con un humano directamente. 👋";
        repetitionCountRef.current = 0; // Reset
        lastResponseRef.current = '';
      }

      addMessage({
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      });
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neon-blue text-black p-4 rounded-full shadow-[0_0_20px_rgba(46,196,182,0.5)] hover:shadow-[0_0_30px_rgba(46,196,182,0.8)] transition-all hover:scale-110 group animate-pulse-slow"
        >
          <Bot size={28} className="group-hover:rotate-12 transition-transform" />
          {isHovered && (
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold pr-2">
              Asistente IA
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[350px] sm:max-w-[400px] flex flex-col bg-black/90 backdrop-blur-xl border border-neon-blue/30 rounded-2xl shadow-2xl overflow-hidden animate-grow-up" style={{ height: '500px' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-neon-blue/20 to-black p-4 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center border border-neon-blue/50 relative">
                <Bot size={20} className="text-neon-blue" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Asistente IA</h3>
                <p className="text-neon-blue text-[10px] uppercase tracking-wider">En línea • {course.title}</p>
              </div>
            </div>
            <div className="flex gap-2">
               <a 
                 href={CONTACT_INFO.whatsappLink} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-green-400 hover:text-white transition-colors p-1"
                 title="Hablar con humano por WhatsApp"
               >
                 <MessageCircle size={18} />
               </a>
               <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-neon-blue text-black rounded-tr-none font-medium' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}
                >
                  {/* Handle simplistic markdown for bold text */}
                  {msg.text.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className={msg.sender === 'user' ? 'font-black' : 'text-neon-blue'}>{part}</strong> : part
                  )}
                  <span className="text-[10px] opacity-50 block mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-black/50 border-t border-white/10">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Pregunta sobre precio, duración..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(46,196,182,0.2)] transition-all"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="absolute right-1 top-1 p-1.5 bg-neon-blue text-black rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-gray-600 text-center mt-2">
              La IA puede cometer errores. Verifica con soporte humano.
            </p>
          </form>

        </div>
      )}
    </>
  );
};
