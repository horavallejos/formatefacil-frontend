
import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// Intentamos leer ambas variantes (ANON_KEY o KEY) para evitar errores si el nombre varía en el .env
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Error Crítico: Faltan las variables de entorno de Supabase.');
    console.error('Asegúrate de tener un archivo .env.local con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
    console.error('⚠️ IMPORTANTE: Si acabas de crear el archivo .env.local, debes REINICIAR la terminal (npm run dev).');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
