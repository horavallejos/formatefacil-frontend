import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Bot } from 'lucide-react';
import { COURSES } from '../constants';
import { Link } from 'react-router-dom';

export const AIRecommender: React.FC = () => {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [suggestion, setSuggestion] = useState<typeof COURSES[0] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRecommend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsThinking(true);
    setHasSearched(false);
    
    // Simulate AI thinking
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      
      // Simple keyword matching "AI"
      let found = COURSES.find(c => 
        c.title.toLowerCase().includes(lowerInput) || 
        c.description.toLowerCase().includes(lowerInput) ||
        c.features.some(f => f.toLowerCase().includes(lowerInput))
      );

      // Fallback
      if (!found) {
        if (lowerInput.includes('manual') || lowerInput.includes('construir')) found = COURSES.find(c => c.id === 'construccion-completa');
        else if (lowerInput.includes('tech') || lowerInput.includes('compu')) found = COURSES.find(c => c.id === 'reparacion-pc');
        else found = COURSES[0]; // Default to most popular
      }

      setSuggestion(found || COURSES[0]);
      setIsThinking(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-neon-surface to-black border border-white/10 rounded-2xl p-8 relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">IA Orientadora</h3>
            <p className="text-gray-400 text-xs">¿No sabes por dónde empezar?</p>
          </div>
        </div>

        <form onSubmit={handleRecommend} className="relative mb-6">
          <input 
            type="text" 
            placeholder="Ej: Me gusta la tecnología y quiero trabajar rápido..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-black/50 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:shadow-neon-purple transition-all pr-12"
          />
          <button 
            type="submit"
            disabled={isThinking || !input}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neon-purple text-white rounded-lg hover:bg-white hover:text-neon-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isThinking ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          </button>
        </form>

        {hasSearched && suggestion && (
          <div className="animate-grow-up" style={{"--target-height": "auto"} as React.CSSProperties}>
            <div className="bg-white/5 border border-neon-purple/30 rounded-xl p-4 flex gap-4 items-center">
              <img src={suggestion.image} alt="course" className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <p className="text-neon-purple text-xs font-bold uppercase mb-1">Te recomendamos:</p>
                <h4 className="text-white font-bold leading-tight">{suggestion.title}</h4>
              </div>
              <Link to={`/curso/${suggestion.id}`}>
                <button className="bg-neon-purple/20 text-neon-purple p-2 rounded-full hover:bg-neon-purple hover:text-white transition-all">
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
            <p className="text-gray-400 text-xs mt-2 italic">
              "Basado en tus intereses, este curso tiene una alta salida laboral."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};