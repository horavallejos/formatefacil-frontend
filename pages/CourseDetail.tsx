import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES, ICONS_MAP } from '../constants';
import { CurrencyConfig } from '../types';
import { formatPrice } from '../utils/currencyUtils';
import { Button } from '../components/Button';
import { CourseChatbot } from '../components/CourseChatbot';
import { CheckCircle, ShieldCheck, Clock, Award, ArrowLeft, Lock, Smartphone } from 'lucide-react';

interface CourseDetailProps {
  currency: CurrencyConfig;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ currency }) => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-3xl font-heading text-white mb-4">Curso no encontrado</h2>
        <Link to="/"><Button variant="outline">Volver al Inicio</Button></Link>
      </div>
    );
  }

  // Determine Icon
  const IconComponent = ICONS_MAP[course.id] || Award;

  const handlePurchase = () => {
    // This simulates the "On-site" feel but redirects to Hotmart
    // In a real "Own payment" scenario, this would open a Stripe/MercadoPago modal
    if(confirm(`Estás siendo redirigido a la plataforma segura de pagos para adquirir: ${course.title}`)) {
      window.open(course.hotmartLink, '_blank');
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      
      {/* Header */}
      <div className="relative bg-neon-surface border-b border-white/10 pb-20 pt-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-orange/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-neon-orange mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Volver al catálogo
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 rounded-xl bg-neon-orange/20 text-neon-orange mb-6">
                <IconComponent size={40} />
              </div>
              <h1 className="font-heading font-black text-4xl sm:text-6xl text-white mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-gray-300 font-light mb-8 border-l-4 border-neon-blue pl-4">
                {course.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <Button onClick={handlePurchase} className="w-full sm:w-auto shadow-neon-orange">
                  Inscribirme Ahora • {formatPrice(course.priceUSD, currency)}
                </Button>
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-2 sm:mt-0">
                  <ShieldCheck size={16} className="text-green-500" />
                  <span>Pago 100% Seguro</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-neon-blue/20">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer hover:bg-black/30 transition-all">
                   <div className="w-20 h-20 bg-neon-orange rounded-full flex items-center justify-center shadow-neon-orange group-hover:scale-110 transition-transform">
                      <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* What you'll learn */}
            <section className="bg-black/30 p-8 rounded-2xl border border-white/5">
              <h3 className="font-heading text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-neon-blue">///</span> Qué aprenderás
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-neon-orange shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">Descripción del Curso</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {course.description} Este curso está diseñado meticulosamente para llevarte desde un nivel básico hasta un nivel competente, permitiéndote ofrecer servicios profesionales. Incluye material teórico, demostraciones prácticas en video de alta resolución y acceso a una comunidad exclusiva.
              </p>
            </section>

            {/* Curriculum Preview (Static Placeholder) */}
            <section className="space-y-4">
              <h3 className="font-heading text-2xl font-bold text-white mb-4">Temario</h3>
              {[1, 2, 3, 4].map((module) => (
                <div key={module} className="bg-neon-surface border border-white/5 p-4 rounded-lg flex justify-between items-center hover:border-neon-blue/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/5 w-8 h-8 flex items-center justify-center rounded text-gray-400 text-sm font-bold">
                      0{module}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Módulo {module}: Fundamentos Técnicos</h4>
                      <p className="text-xs text-gray-500">3 lecciones • 45 min</p>
                    </div>
                  </div>
                  <Lock size={16} className="text-gray-600" />
                </div>
              ))}
            </section>

          </div>

          {/* Right Column: Benefits Sticky */}
          <div className="lg:col-span-1">
             <div className="sticky top-24 bg-neon-surface border border-neon-orange/20 rounded-2xl p-6 shadow-lg shadow-neon-orange/10">
               <h3 className="font-heading text-xl font-bold text-white mb-6 text-center">
                 Este curso incluye:
               </h3>
               
               <ul className="space-y-4 mb-8">
                 <li className="flex items-center gap-3 text-gray-300 text-sm">
                   <Clock className="text-neon-blue" size={18} />
                   <span>Acceso de por vida 24/7</span>
                 </li>
                 <li className="flex items-center gap-3 text-gray-300 text-sm">
                   <Award className="text-neon-blue" size={18} />
                   <span>Certificado de finalización</span>
                 </li>
                 <li className="flex items-center gap-3 text-gray-300 text-sm">
                   <Smartphone className="text-neon-blue" size={18} />
                   <span>Acceso en Móvil y TV</span>
                 </li>
                 <li className="flex items-center gap-3 text-gray-300 text-sm">
                   <ShieldCheck className="text-neon-blue" size={18} />
                   <span>Garantía de 7 días</span>
                 </li>
               </ul>

               <div className="text-center mb-6">
                 <span className="text-3xl font-heading font-bold text-white block">
                   {formatPrice(course.priceUSD, currency)}
                 </span>
                 <span className="text-sm text-gray-500 line-through">
                   {formatPrice(course.priceUSD * 1.5, currency)}
                 </span>
               </div>

               <Button fullWidth onClick={handlePurchase} className="mb-4">
                 Comprar Ahora
               </Button>
               
               <p className="text-xs text-center text-gray-500">
                 Acceso inmediato tras el pago.
               </p>
             </div>
          </div>

        </div>
      </div>

      {/* Final CTA Strip */}
      <section className="bg-neon-orange py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-black mb-4">¿TIENES DUDAS?</h2>
          <p className="text-black/80 mb-6 font-medium">Nuestro equipo de soporte está listo para ayudarte a tomar la mejor decisión.</p>
          <button className="bg-black text-white px-8 py-3 rounded font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
            Contactar por WhatsApp
          </button>
        </div>
      </section>

      {/* AI Chatbot Integration */}
      <CourseChatbot course={course} />

    </div>
  );
};
