import { Course } from './types';
import { Layers, Smartphone, Cpu, Wrench, Bike, Home, Zap } from 'lucide-react';

export const CONTACT_INFO = {
  email: 'info@formatefacil.online',
  phone: '+54 9 3794 89-7374',
  whatsappLink: 'https://wa.me/c/5493794897374',
  whatsappDisplay: '+54 9 3794 89-7374',
  instagram: 'https://www.instagram.com/stories/formatefacil.online/',
  facebook: 'https://www.facebook.com/profile.php?id=61576128307920'
};

// desde acá puedes ver todos los cursos disponibles en Formate Fácil

export const COURSES: Course[] = [
  {
    id: 'reparacion-celulares',
    title: 'Curso Reparación de Celulares',
    subtitle: 'Domina la reparación de Smartphones iPhone y Android desde cero y prepárate para generar ingresos inmediatos',
    description: 'Aprende: Hardware - Software - Microelectrónica - Microsoldadura.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop',
    priceUSD: 29.00,
    originalPrice: 60.00,
    rating: 5.0,
    students: 1117,
    category: 'Tecnología',
    hotmartLink: 'https://hotmart.com/es/marketplace/productos/curso-de-reparacion-de-celulares-8/O60157236J',
    level: 'Experto',
    features: [
      'Diagnóstico de fallas',
      'Cambios de módulos, pantallas y baterías',
      'Software y programas de software',
      'Técnicas para trabajar más rápido y seguro',
      'Herramientas: uso de multímetro y fuente de poder, microscopio, cautín, Flux',
      'Libros de electrónica, esquemáticos y programas de Software'
    ],
    benefits: [
      'Método guiado paso a paso para aprender a reparar celulares en menos de 30 días',
      'Alta demanda laboral y rápido retorno de inversión',
      'Baja inversión inicial',
      'Certificado digital emitido por Hotmart',
      'Acceso de por vida al contenido y actualizaciones futuras'
    ]
  },

  // acá comienza el nuevo curso de construcción completa
  {
    id: 'construccion-completa',
    title: 'Técnico Profesional en Construcción',
    subtitle: 'Aprendé todo sobre albañilería desde cero. Más de 390 lecciones prácticas.',
    description: 'Te transformarás en un verdadero profesional: desde limpieza de terrenos y lectura de planos hasta terminación y remodelación.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    priceUSD: 89.99, // Manteniendo precio original ya que no se especificó uno nuevo
    rating: 4.9,
    students: 1000,
    category: 'Oficios',
    hotmartLink: 'https://pay.hotmart.com/L48336648S?ref=Y100605559Y&bid=1765442343044',
    level: 'Principiante',
    features: [
      'Más de 390 lecciones prácticas y dinámicas',
      'Limpieza de terrenos y medidas de seguridad',
      'Lectura de planos arquitectónicos',
      'Terminación y remodelación',
      'Resultados desde tu primera obra'
    ],
    benefits: [
      'Más de 1000 alumnos capacitados',
      'Salida laboral inmediata',
      'Curso online, práctico y fácil',
      'Gana 4 cursos gratis al inscribirte hoy'
    ]
  },

  // curso de reparación de pc y laptops
  {
    id: 'reparacion-pc',
    title: 'Técnico de PC y Laptops',
    subtitle: 'Mantenimiento, armado y reparación de ordenadores',
    description: 'Conviértete en el técnico de confianza de empresas y particulares.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop',
    priceUSD: 39.99,
    rating: 4.7,
    students: 2100,
    category: 'Tecnología',
    hotmartLink: 'https://hotmart.com', // Placeholder
    level: 'Principiante',
    features: [
      'Armado de PC Gamer',
      'Instalación de Sistemas Operativos',
      'Limpieza y mantenimiento preventivo',
      'Diagnóstico de discos y RAM',
      'Optimización de rendimiento'
    ],
    benefits: [
      'Trabaja desde casa',
      'Alta recurrencia de clientes',
      'Soporte técnico a empresas',
      'Comunidad de alumnos activa'
    ]
  },

  // curso de microsoldadura avanzada
  {
    id: 'microsoldadura',
    title: 'Máster en Microsoldadura',
    subtitle: 'Reparación de placas electrónicas a nivel componente',
    description: 'La habilidad mejor pagada en el mundo de la reparación técnica.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop',
    priceUSD: 120.00,
    rating: 5.0,
    students: 300,
    category: 'Avanzado',
    hotmartLink: 'https://hotmart.com', // Placeholder
    level: 'Avanzado',
    features: [
      'Uso de microscopio y estación de calor',
      'Reballing y Reflow',
      'Lectura de esquemáticos avanzados',
      'Reparación de pistas dañadas',
      'Diagnóstico de ICs de carga'
    ],
    benefits: [
      'Ingresos muy superiores al promedio',
      'Poca competencia en el mercado',
      'Repara equipos que otros dan por muertos',
      'Certificación de especialista'
    ]
  },

  // y así podes ir agregando más cursos...

  // curso de reparación de patinetas eléctricas
  // {
  //   id: 'patinetas-electricas',
  //   title: 'Movilidad Eléctrica',
  //   subtitle: 'Reparación de Patinetas y Scooters',
  //   description: 'El auge de la movilidad eléctrica necesita técnicos especializados hoy.',
  //   image: 'https://images.unsplash.com/photo-1555593853-2cf5b7a1496a?q=80&w=1000&auto=format&fit=crop',
  //   priceUSD: 45.00,
  //   rating: 4.6,
  //   students: 560,
  //   category: 'Mecánica',
  //   hotmartLink: 'https://hotmart.com', // Placeholder
  //   level: 'Intermedio',
  //   features: [
  //     'Diagnóstico de baterías de litio',
  //     'Reparación de controladores y motores',
  //     'Cambio de ruedas macizas y neumáticas',
  //     'Flasheo de firmware',
  //     'Mantenimiento de frenos'
  //   ],
  //   benefits: [
  //     'Nicho de mercado en explosión',
  //     'Clientes fieles y recurrentes',
  //     'Servicio rápido y bien pagado',
  //     'Posibilidad de vender repuestos'
  //   ]
  // },

  // curso de mecánica de motos y bicicletas
  {
    id: 'motos-bicicletas',
    title: 'Mecánica de Motos',
    subtitle: 'Mantenimiento preventivo y correctivo',
    description: 'Ahorra dinero reparando tu moto o inicia tu propio taller mecánico.',
    image: 'https://images.unsplash.com/photo-1626846934442-f2de9bb7e996?q=80&w=1000&auto=format&fit=crop',
    priceUSD: 55.00,
    rating: 4.8,
    students: 900,
    category: 'Mecánica',
    hotmartLink: 'https://hotmart.com', // Placeholder
    level: 'Principiante',
    features: [
      'Motores de 2 y 4 tiempos',
      'Sistema eléctrico y carburación',
      'Transmisión y frenos',
      'Suspensión y chasis',
      'Herramientas de taller'
    ],
    benefits: [
      'Independencia laboral total',
      'Oficio clásico siempre necesario',
      'Aprende a comprar y vender motos usadas',
      'Manuales de taller incluidos'
    ]
  }
];

export const ICONS_MAP: Record<string, any> = {
  'reparacion-celulares': Smartphone,
  'construccion-completa': Home,
  'reparacion-pc': Cpu,
  'microsoldadura': Layers,
  'patinetas-electricas': Zap,
  'motos-bicicletas': Bike
};