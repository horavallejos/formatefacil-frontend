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

// export const COURSES: Course[] = [ ... ]; // Deprecated: Now fetching from Supabase
export const COURSES: Course[] = [];


export const ICONS_MAP: Record<string, any> = {
  'reparacion-celulares': Smartphone,
  'construccion-completa': Home,
  'reparacion-pc': Cpu,
  'microsoldadura': Layers,
  'patinetas-electricas': Zap,
  'motos-bicicletas': Bike
};