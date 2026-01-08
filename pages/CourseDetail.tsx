import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ICONS_MAP } from '../constants';
import { CurrencyConfig, Course } from '../types';
import { formatPrice } from '../utils/currencyUtils';
import { Button } from '../components/Button';
import { CourseChatbot } from '../components/CourseChatbot';
import { CheckCircle, ShieldCheck, Clock, Award, ArrowLeft, Lock, Smartphone, Loader2, X, ExternalLink, Mail, Sparkles } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

interface CourseDetailProps {
  currency: CurrencyConfig;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ currency }) => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [priceRevealed, setPriceRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos en segundos

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCourse = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('course_id', id) // Buscamos por el slug (ej: 'reparacion-celulares')
          .single();

        if (error) throw error;

        if (data) {
          const mappedCourse = {
            ...data,
            id: data.course_id,
            image: data.image_url,
            priceUSD: data.price_usd,
            originalPriceUSD: data.original_price_usd,
            hotmartLink: data.hotmart_link, // CORRECCIÓN CLAVE: Mapeo correcto del link
            syllabus: data.syllabus // Mapeamos el nuevo temario
          };
          setCourse(mappedCourse as Course);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('No se pudo cargar la información del curso.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Lógica del Contador Regresivo
  useEffect(() => {
    let timer: any;
    if (showOfferModal && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOfferModal, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <Loader2 className="animate-spin text-neon-orange" size={48} />
        <p className="text-gray-400">Cargando curso...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-3xl font-heading text-white mb-4">
          {error || 'Curso no encontrado'}
        </h2>
        <Link to="/"><Button variant="outline">Volver al Inicio</Button></Link>
      </div>
    );
  }

  // Determine Icon
  const IconComponent = ICONS_MAP[course.id] || Award;

  const handlePurchaseClick = () => {
    // Si ya tenemos el email (por ejemplo, si ya se registró antes), pasamos directo
    if (userEmail) {
      setShowCheckout(true);
    } else {
      setShowLeadCapture(true);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;

    // Guardamos el lead silenciosamente
    try {
      await supabase.from('leads').insert([
        { 
          email: userEmail, 
          course_id: course.id,
          interest_level: 'Checkout Intention'
        }
      ]);
    } catch (err) {
      console.error("Error saving lead", err);
    }
    setShowLeadCapture(false);
    setShowCheckout(true);
  };

  const handleRevealPrice = () => {
    // Aquí podrías trackear el evento con Google Analytics como planeamos
    // gtag('event', 'price_reveal', { course_id: course.id });
    setPriceRevealed(true);
    setShowOfferModal(true); // Abrimos el modal con la oferta en lugar de scrollear
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
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight break-words">
                {course.title}
              </h1>
              <p className="text-xl text-gray-300 font-light mb-8 border-l-4 border-neon-blue pl-4">
                {course.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                {!priceRevealed ? (
                  <Button onClick={handleRevealPrice} className="w-full sm:w-auto shadow-neon-orange animate-pulse">
                    ✨ ¡Quiero la Oferta Especial!
                  </Button>
                ) : (
                  <Button onClick={handlePurchaseClick} className="w-full sm:w-auto shadow-neon-orange animate-fade-in">
                    Inscribirme Ahora • {formatPrice(course.priceUSD, currency)}
                  </Button>
                )}
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

            {/* Curriculum / Temario */}
            <section className="space-y-4">
              <h3 className="font-heading text-2xl font-bold text-white mb-4">Temario</h3>
              {course.syllabus && Array.isArray(course.syllabus) ? (
                course.syllabus.map((module: any, idx: number) => (
                  <div key={idx} className="bg-neon-surface border border-white/5 p-4 rounded-lg hover:border-neon-blue/30 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/5 w-8 h-8 flex items-center justify-center rounded text-gray-400 text-sm font-bold group-hover:bg-neon-blue group-hover:text-black transition-colors">
                          {idx + 1}
                        </div>
                        <h4 className="text-white font-medium group-hover:text-neon-blue transition-colors">{module.title}</h4>
                      </div>
                      <Lock size={16} className="text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-500 pl-12">{module.lessons}</p>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">
                  El temario detallado se está actualizando. Contacta a soporte para recibir el PDF completo.
                </div>
              )}
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

              {!priceRevealed ? (
                <div className="text-center">
                  <p className="text-gray-400 mb-4 text-sm">¡Descuento exclusivo disponible solo por hoy!</p>
                  <Button fullWidth onClick={handleRevealPrice} className="animate-pulse">
                    Revelar Precio Final
                  </Button>
                </div>
              ) : (
                <div className="text-center mb-6 animate-fade-in">
                  <span className="text-sm text-gray-500 line-through">
                    {course.originalPriceUSD && formatPrice(course.originalPriceUSD, currency)}
                  </span>
                  <span className="text-3xl font-heading font-bold text-white block">
                    {formatPrice(course.priceUSD, currency)}
                  </span>
                  <Button fullWidth onClick={handlePurchaseClick} className="mt-4 mb-4">
                    Comprar Ahora
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Acceso inmediato tras el pago.
                  </p>
                </div>
              )}
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

      {/* Offer Reveal Modal (La tarjeta que "sube") */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-neon-surface border border-neon-orange/30 w-full max-w-md rounded-2xl p-6 relative shadow-[0_0_50px_rgba(255,159,28,0.15)] animate-grow-up" style={{"--target-height": "auto"} as React.CSSProperties}>
            <button onClick={() => setShowOfferModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="inline-block p-3 rounded-full bg-neon-orange/10 text-neon-orange mb-4 animate-bounce">
                <Sparkles size={32} />
              </div>
              <div className="mb-4">
                 <span className="inline-block bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                   ⏳ Expira en {formatTime(timeLeft)}
                 </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">¡Oferta Desbloqueada!</h3>
              <p className="text-gray-400 text-sm">Accede a todo el contenido por un precio especial.</p>
            </div>

            <div className="bg-black/40 rounded-xl p-4 mb-6 border border-white/5">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-neon-blue"/> Acceso de por vida</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-neon-blue"/> Certificado incluido</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-neon-blue"/> Garantía de 7 días</li>
              </ul>
            </div>

            <div className="text-center mb-6">
              <span className="text-sm text-gray-500 line-through block mb-1">
                {course.originalPriceUSD && formatPrice(course.originalPriceUSD, currency)}
              </span>
              <span className="text-4xl font-heading font-black text-white block text-shadow-neon">
                {formatPrice(course.priceUSD, currency)}
              </span>
            </div>

            <Button fullWidth onClick={() => { setShowOfferModal(false); handlePurchaseClick(); }} className="shadow-neon-orange">
              ¡Aprovechar Oferta Ahora!
            </Button>
            <p className="text-xs text-center text-gray-500 mt-4">Oferta por tiempo limitado.</p>
          </div>
        </div>
      )}

      {/* Lead Capture Modal */}
      {showLeadCapture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-neon-surface border border-white/10 w-full max-w-md rounded-2xl p-8 relative shadow-2xl shadow-neon-orange/20">
            <button onClick={() => setShowLeadCapture(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-neon-orange/20 rounded-full flex items-center justify-center mx-auto mb-4 text-neon-orange">
                <Lock size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">¡Último paso!</h3>
              <p className="text-gray-400 text-sm">Ingresa tu correo para asegurar tu cupo y enviarte el acceso inmediato tras el pago.</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neon-orange focus:outline-none"
                  required
                />
              </div>
              <Button fullWidth type="submit">Continuar al Pago</Button>
            </form>
          </div>
        </div>
      )}

      {/* Checkout Modal (Iframe) */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl overflow-hidden relative flex flex-col shadow-2xl shadow-neon-orange/20">
            
            {/* Modal Header */}
            <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
              <div className="flex items-center gap-2 text-gray-800">
                <ShieldCheck size={18} className="text-green-600" />
                <span className="font-bold text-sm">Checkout Seguro</span>
              </div>
              <button 
                onClick={() => setShowCheckout(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 bg-white relative">
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <Loader2 className="animate-spin text-gray-300" size={40} />
              </div>
              <iframe 
                src={course.hotmartLink} 
                className="w-full h-full relative z-10"
                title="Checkout"
              />
            </div>

            {/* Fallback Footer */}
            <div className="bg-gray-50 p-4 text-center border-t text-sm text-gray-600 flex flex-col sm:flex-row justify-center items-center gap-2">
              <span>¿Problemas con la carga?</span>
              <a 
                href={course.hotmartLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-1 rounded-full font-bold hover:bg-green-700 transition-colors flex items-center gap-1 shadow-lg"
              >
                Abrir en nueva ventana <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
