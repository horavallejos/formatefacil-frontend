
import React, { useState } from 'react';
import { Menu, X, ShoppingCart, MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Función inteligente para navegar
  const handleNavigation = (sectionId: string) => {
    setIsOpen(false); // Cerrar menú móvil si está abierto
    
    if (location.pathname === '/') {
      // Si ya estamos en Home, hacemos scroll suave
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si estamos en otra página, vamos al Home y luego el navegador busca el ID
      navigate(`/#${sectionId}`);
      // Un pequeño hack para asegurar el scroll después de navegar
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-neon-dark/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div onClick={handleLogoClick} className="flex-shrink-0 flex items-center gap-2 group cursor-pointer select-none">
            <div className="w-10 h-10 border-2 border-neon-orange rounded-full flex items-center justify-center group-hover:shadow-neon-orange transition-all relative overflow-hidden">
               <div className="absolute inset-0 bg-neon-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="font-heading font-bold text-neon-orange text-xl group-hover:text-black relative z-10 transition-colors">F</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-white text-xl tracking-wide uppercase leading-none">
                Formate<span className="text-neon-orange">Facil</span>
              </span>
              <span className="text-[10px] text-gray-400 font-sans tracking-[0.2em] leading-none">
                .online
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => handleLogoClick()} className="font-sans text-gray-300 hover:text-neon-orange transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider bg-transparent border-none cursor-pointer">Inicio</button>
              <button onClick={() => handleNavigation('cursos')} className="font-sans text-gray-300 hover:text-neon-orange transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider bg-transparent border-none cursor-pointer">Cursos</button>
              <button onClick={() => handleNavigation('beneficios')} className="font-sans text-gray-300 hover:text-neon-orange transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider bg-transparent border-none cursor-pointer">Beneficios</button>
              <button onClick={() => handleNavigation('testimonios')} className="font-sans text-gray-300 hover:text-neon-orange transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider bg-transparent border-none cursor-pointer">Testimonios</button>
            </div>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center gap-4">
             {/* Personalized Attention Widget */}
            <a 
              href={CONTACT_INFO.whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white bg-green-600/20 px-3 py-1.5 rounded-full border border-green-500/50 hover:bg-green-600 hover:border-transparent transition-all group"
            >
              <div className="relative">
                <MessageCircle size={18} className="text-green-500 group-hover:text-white" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
              <span className="text-xs font-bold uppercase hidden lg:block text-green-400 group-hover:text-white">Soporte en vivo</span>
            </a>

            <button onClick={() => handleNavigation('cursos')} className="bg-neon-orange/10 border border-neon-orange text-neon-orange px-4 py-2 rounded hover:bg-neon-orange hover:text-black transition-all font-heading font-bold text-sm uppercase tracking-wider shadow-[0_0_10px_rgba(255,159,28,0.2)] hover:shadow-[0_0_20px_rgba(255,159,28,0.6)]">
              Ver Catálogo
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neon-surface border-b border-white/10 absolute w-full left-0 top-20 shadow-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => handleLogoClick()} className="text-gray-300 hover:text-neon-orange block w-full text-left px-3 py-2 rounded-md text-base font-medium">Inicio</button>
            <button onClick={() => handleNavigation('cursos')} className="text-gray-300 hover:text-neon-orange block w-full text-left px-3 py-2 rounded-md text-base font-medium">Cursos</button>
            <button onClick={() => handleNavigation('beneficios')} className="text-gray-300 hover:text-neon-orange block w-full text-left px-3 py-2 rounded-md text-base font-medium">Beneficios</button>
            <button onClick={() => handleNavigation('testimonios')} className="text-gray-300 hover:text-neon-orange block w-full text-left px-3 py-2 rounded-md text-base font-medium">Testimonios</button>
            <a 
              href={CONTACT_INFO.whatsappLink}
              target="_blank"
              className="text-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium border border-green-500/30 mt-4 bg-green-500/10"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
