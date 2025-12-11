import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex flex-col mb-4">
              <span className="font-heading font-bold text-white text-2xl tracking-wide uppercase leading-none">
                Formate<span className="text-neon-orange">Facil</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              La plataforma educativa líder para aprender oficios técnicos y generar ingresos reales. Tu futuro comienza hoy.
            </p>
            <div className="inline-block px-3 py-1 border border-neon-blue/30 rounded bg-neon-blue/5 text-neon-blue text-xs">
              Formación Práctica 100%
            </div>
          </div>

          <div>
            <h4 className="font-heading text-white font-bold uppercase tracking-wider mb-6">Plataforma</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#cursos" className="hover:text-neon-orange transition-colors">Cursos Disponibles</a></li>
              <li><a href="#beneficios" className="hover:text-neon-orange transition-colors">Cómo Funciona</a></li>
              <li><a href="#beneficios" className="hover:text-neon-orange transition-colors">Certificados</a></li>
              <li><a href="#cursos" className="hover:text-neon-orange transition-colors">Precios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-white font-bold uppercase tracking-wider mb-6">Atención Personalizada</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                 <Mail size={16} className="text-neon-orange" />
                 <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                 <Phone size={16} className="text-neon-orange" />
                 <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                 <MessageCircle size={16} className="text-green-500" />
                 <a href={CONTACT_INFO.whatsappLink} target="_blank" className="hover:text-white transition-colors text-green-400 font-bold">
                   Soporte WhatsApp
                 </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-white font-bold uppercase tracking-wider mb-6">Redes</h4>
            <div className="flex space-x-4 mb-6">
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-neon-orange hover:text-black transition-all">
                <Facebook size={20} />
              </a>
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-neon-orange hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
            <p className="text-xs text-gray-500">
              Soporte 24/7 para alumnos activos.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FormateFacil.online. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-gray-400 text-xs">Sistemas Operativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};