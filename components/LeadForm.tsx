import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Button } from './Button';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export const LeadForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus('idle');

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            email, 
            interest_level: 'Newsletter',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        // Si el error es por duplicado (código 23505 en Postgres), lo tratamos como éxito para no asustar al usuario
        if (error.code === '23505') {
          setStatus('success');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
      console.error('Error saving lead:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center animate-fade-in">
        <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
        <h3 className="text-white font-bold text-lg">¡Gracias por suscribirte!</h3>
        <p className="text-gray-400 text-sm">Pronto recibirás novedades y descuentos exclusivos.</p>
        <button onClick={() => setStatus('idle')} className="text-green-400 text-xs mt-4 hover:underline">Enviar otro correo</button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
      <h3 className="text-white font-bold text-xl mb-2">Únete al Club de Expertos</h3>
      <p className="text-gray-400 text-sm mb-4">Recibe guías gratuitas y ofertas flash en tu correo.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="email" 
            placeholder="Tu mejor correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-orange focus:shadow-[0_0_10px_rgba(255,159,28,0.2)] transition-all"
            required
          />
        </div>
        
        <Button type="submit" disabled={loading} fullWidth className="py-2 text-sm">
          {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Suscribirme Gratis'}
        </Button>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-400 text-xs mt-2">
            <AlertCircle size={14} />
            <span>Ocurrió un error. Intenta nuevamente.</span>
          </div>
        )}
      </form>
    </div>
  );
};