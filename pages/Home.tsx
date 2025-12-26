import React from 'react';
import { Button } from '../components/Button';
import { CourseCard } from '../components/CourseCard';
import { GrowthChart } from '../components/GrowthChart';
import { AIRecommender } from '../components/AIRecommender';
import { COURSES, CONTACT_INFO } from '../constants';
import { CurrencyConfig } from '../types';
import { Laptop, Award, Smartphone, Zap, CheckCircle2, Quote, MessageCircle } from 'lucide-react';

interface HomeProps {
  currency: CurrencyConfig;
}

export const Home: React.FC<HomeProps> = ({ currency }) => {
  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-orange/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/5 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
              <span className="text-neon-blue text-xs font-bold uppercase tracking-widest">Atención Personalizada 24/7</span>
            </div>

            <h1 className="font-heading font-black text-5xl sm:text-7xl leading-tight mb-6 text-white">
              FÓRMATE <br />
              <span className="text-gradient-animate drop-shadow-lg">FÁCIL</span>. <br />
              CRECE <span className="text-neon-blue">RÁPIDO</span>.
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              Domina habilidades técnicas de alta demanda. Cursos online diseñados para que <span className="text-white font-bold">generes ingresos sin experiencia previa</span> desde el primer mes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full sm:w-auto shadow-[0_0_20px_rgba(255,159,28,0.3)]">Inscríbete Hoy</Button>
              </a>
              <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full sm:w-auto">Ver Catálogo</Button>
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-2 group cursor-default">
                <CheckCircle2 className="text-neon-blue group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">Certificado Oficial</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <CheckCircle2 className="text-neon-blue group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">+5000 Alumnos</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-6 relative">
            {/* Dynamic Elements Column */}
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <GrowthChart />
            </div>

            <div className="ml-12 transform hover:scale-105 transition-transform duration-500 delay-100">
              <AIRecommender />
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Strip */}
      <div className="bg-neon-orange overflow-hidden py-3 transform -skew-y-1">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex gap-12 font-heading font-bold text-black uppercase tracking-widest text-lg">
          <span>★ El éxito es para el que se prepara </span>
          <span>★ El comienzo de tu futuro es AHORA </span>
          <span>★ Inversión inteligente: invertí en vos </span>
          <span>★ El conocimiento es poder</span>
          <span>★ Sé dueño de tu destino, preparate </span>
          <span>★ Es hora de tomar la decisión correcta </span>
          <span>★ Inversión inteligente </span>
        </div>
      </div>

      {/* Value Proposition */}
      <section id="beneficios" className="py-20 bg-neon-surface border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-2">POR QUÉ ELEGIRNOS</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-neon-orange to-neon-blue mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-neon-orange/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-neon-orange/5 rounded-full blur-2xl group-hover:bg-neon-orange/20 transition-all"></div>
              <div className="w-14 h-14 rounded-xl bg-neon-orange/10 flex items-center justify-center text-neon-orange mb-6 group-hover:bg-neon-orange group-hover:text-black transition-all shadow-[0_0_15px_rgba(255,159,28,0.1)] group-hover:shadow-[0_0_20px_rgba(255,159,28,0.5)]">
                <Laptop size={32} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">100% Online y Práctico</h3>
              <p className="text-gray-400">
                Aprende a tu ritmo desde cualquier dispositivo. Clases grabadas en HD con primeros planos para no perder detalle.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-neon-blue/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-neon-blue/5 rounded-full blur-2xl group-hover:bg-neon-blue/20 transition-all"></div>
              <div className="w-14 h-14 rounded-xl bg-neon-blue/10 flex items-center justify-center text-neon-blue mb-6 group-hover:bg-neon-blue group-hover:text-black transition-all shadow-[0_0_15px_rgba(46,196,182,0.1)] group-hover:shadow-[0_0_20px_rgba(46,196,182,0.5)]">
                <Zap size={32} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">Salida Laboral Rápida</h3>
              <p className="text-gray-400">
                Enfoque directo al grano. Aprenderás lo que necesitas para empezar a cobrar por tus servicios en semanas.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-neon-purple/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-neon-purple/5 rounded-full blur-2xl group-hover:bg-neon-purple/20 transition-all"></div>
              <div className="w-14 h-14 rounded-xl bg-neon-purple/10 flex items-center justify-center text-neon-purple mb-6 group-hover:bg-neon-purple group-hover:text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                <Award size={32} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">Certificado + Garantía</h3>
              <p className="text-gray-400">
                Certificado digital al finalizar. Si no te gusta el curso en los primeros 7 días, te devolvemos el 100% del dinero.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="cursos" className="py-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-surface to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              NUESTROS <span className="text-gradient-animate">CURSOS</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Elige tu camino profesional. Todos los cursos incluyen soporte personalizado vía WhatsApp.
            </p>
          </div>

          {/* Mobile AI Recommender (visible only on small screens) */}
          <div className="lg:hidden mb-12">
            <AIRecommender />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map(course => (
              <CourseCard key={course.id} course={course} currency={currency} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" className="py-20 bg-gradient-to-b from-neon-surface to-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white text-center mb-12 uppercase tracking-wide">
            Lo que dicen nuestros <span className="text-neon-blue">alumnos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/50 border border-white/10 p-8 rounded-xl relative hover:-translate-y-1 transition-transform duration-300">
              <Quote className="text-neon-orange absolute top-6 left-6 opacity-30" size={48} />
              <p className="text-gray-300 italic mb-6 pl-4 z-10 relative pt-6">
                "Increíble el curso de celulares. En menos de un mes ya recuperé la inversión reparando los teléfonos de mis amigos. Muy bien explicado."
              </p>
              <div className="flex items-center gap-4 pl-4 border-t border-white/5 pt-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center font-bold text-white text-xs">CM</div>
                <div>
                  <p className="text-white font-bold text-sm">Carlos M.</p>
                  <p className="text-gray-500 text-xs">Curso: Reparación de Celulares</p>
                </div>
              </div>
            </div>

            <div className="bg-black/50 border border-white/10 p-8 rounded-xl relative hover:-translate-y-1 transition-transform duration-300">
              <Quote className="text-neon-orange absolute top-6 left-6 opacity-30" size={48} />
              <p className="text-gray-300 italic mb-6 pl-4 z-10 relative pt-6">
                "Estaba desempleado y tomé el curso de construcción en seco. Hoy trabajo con una contratista y gano muy bien. Gracias FormateFacil."
              </p>
              <div className="flex items-center gap-4 pl-4 border-t border-white/5 pt-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center font-bold text-white text-xs">JR</div>
                <div>
                  <p className="text-white font-bold text-sm">Javier R.</p>
                  <p className="text-gray-500 text-xs">Curso: Construcción</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Banner */}
      <section className="py-12 bg-white/5 border-y border-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-heading font-bold text-white mb-2">¿No estás seguro? Te ayudamos.</h3>
          <p className="text-gray-400 mb-6">Recibe asesoría gratuita y personalizada por WhatsApp para elegir el mejor curso para ti.</p>
          <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className="flex items-center gap-2 mx-auto bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-green-900/50 hover:shadow-green-500/30">
              <MessageCircle size={20} />
              Hablar con un Asesor
            </button>
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-neon-orange/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-neon-orange/10 to-transparent blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-5xl font-black text-white mb-6 uppercase italic">
            ¿Listo para <span className="text-neon-orange">comenzar</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            No dejes pasar otra oportunidad. El mejor momento para invertir en ti es ahora.
          </p>
          <a href="#cursos">
            <Button className="scale-125 origin-center">Comenzar Ahora</Button>

          </a>
        </div>
      </section>

    </>
  );
};