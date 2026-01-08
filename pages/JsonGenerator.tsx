import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Copy, Plus, Trash2, ArrowLeft, Save, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Module {
  title: string;
  lessons: string;
}

interface CourseData {
  course_id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  price_usd: number;
  original_price_usd: number;
  rating: number;
  students: number;
  category: string;
  hotmart_link: string;
  level: string;
  featured: boolean;
  features: string[];
  benefits: string[];
  syllabus: Module[];
}

export const JsonGenerator: React.FC = () => {
  const [course, setCourse] = useState<CourseData>({
    course_id: '',
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    price_usd: 0,
    original_price_usd: 0,
    rating: 5.0,
    students: 0,
    category: '',
    hotmart_link: '',
    level: 'Principiante',
    featured: false,
    features: [''],
    benefits: [''],
    syllabus: [{ title: '', lessons: '' }]
  });

  const [copied, setCopied] = useState(false);

  // --- Handlers para Syllabus (Módulos) ---
  const addModule = () => {
    setCourse(prev => ({
      ...prev,
      syllabus: [...prev.syllabus, { title: '', lessons: '' }]
    }));
  };

  const removeModule = (index: number) => {
    const newSyllabus = [...course.syllabus];
    newSyllabus.splice(index, 1);
    setCourse(prev => ({ ...prev, syllabus: newSyllabus }));
  };

  const updateModule = (index: number, field: keyof Module, value: string) => {
    const newSyllabus = [...course.syllabus];
    newSyllabus[index][field] = value;
    setCourse(prev => ({ ...prev, syllabus: newSyllabus }));
  };

  // --- Handlers para Campos Básicos ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCourse(prev => ({ ...prev, [name]: checked }));
  };

  // --- Handlers para Arrays (Features / Benefits) ---
  const updateArrayItem = (field: 'features' | 'benefits', index: number, value: string) => {
    const newArray = [...course[field]];
    newArray[index] = value;
    setCourse(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'features' | 'benefits') => {
    setCourse(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field: 'features' | 'benefits', index: number) => {
    const newArray = [...course[field]];
    newArray.splice(index, 1);
    setCourse(prev => ({ ...prev, [field]: newArray }));
  };

  const generateJson = () => {
    // Limpiamos arrays vacíos antes de generar
    const cleanCourse = {
      ...course,
      features: course.features.filter(f => f.trim() !== ''),
      benefits: course.benefits.filter(b => b.trim() !== '')
    };
    return JSON.stringify(cleanCourse, null, 2);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-gray-400 hover:text-neon-orange mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Volver al inicio
      </Link>
      
      <h1 className="text-3xl font-heading font-bold text-white mb-2">Constructor de Cursos (JSON)</h1>
      <p className="text-gray-400 mb-8">Genera el objeto completo para insertar en la tabla <code>courses</code> de Supabase.</p>
      
      {/* SECCIÓN 1: DATOS BÁSICOS */}
      <div className="bg-black/40 border border-white/10 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2">
          <Save size={20} /> Información Principal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">ID del Curso (Slug)</label>
            <input name="course_id" value={course.course_id} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white focus:border-neon-blue outline-none" placeholder="ej: reparacion-celulares" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Título</label>
            <input name="title" value={course.title} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white focus:border-neon-blue outline-none" placeholder="ej: Máster en Reparación" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Subtítulo</label>
            <input name="subtitle" value={course.subtitle} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white focus:border-neon-blue outline-none" placeholder="ej: De cero a experto en 30 días" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Descripción</label>
            <textarea name="description" value={course.description} onChange={handleChange} rows={3} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white focus:border-neon-blue outline-none" placeholder="Descripción detallada..." />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Categoría</label>
            <input name="category" value={course.category} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" placeholder="ej: Tecnología" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Nivel</label>
            <select name="level" value={course.level} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white">
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">URL Imagen</label>
            <input name="image_url" value={course.image_url} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" placeholder="/images/..." />
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: PRECIOS Y MARKETING */}
      <div className="bg-black/40 border border-white/10 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <RefreshCw size={20} /> Marketing y Ventas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Precio Actual (USD)</label>
            <input type="number" name="price_usd" value={course.price_usd} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Precio Original (USD)</label>
            <input type="number" name="original_price_usd" value={course.original_price_usd} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Rating (0-5)</label>
            <input type="number" step="0.1" name="rating" value={course.rating} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Estudiantes</label>
            <input type="number" name="students" value={course.students} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Link Hotmart (Checkout)</label>
            <input name="hotmart_link" value={course.hotmart_link} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white" placeholder="https://pay.hotmart.com/..." />
          </div>
          <div className="flex items-center gap-3 pt-4">
            <input type="checkbox" id="featured" name="featured" checked={course.featured} onChange={handleCheckbox} className="w-5 h-5 accent-neon-orange" />
            <label htmlFor="featured" className="text-white cursor-pointer select-none">¿Destacar en Home? (Featured)</label>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: LISTAS (FEATURES & BENEFITS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Features */}
        <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4">Características (Features)</h3>
          <div className="space-y-2">
            {course.features.map((feat, idx) => (
              <div key={idx} className="flex gap-2">
                <input value={feat} onChange={(e) => updateArrayItem('features', idx, e.target.value)} className="flex-1 bg-black/50 border border-white/20 rounded p-2 text-white text-sm" placeholder="Característica..." />
                <button onClick={() => removeArrayItem('features', idx)} className="text-red-400 hover:bg-red-400/10 p-2 rounded"><Trash2 size={16} /></button>
              </div>
            ))}
            <Button onClick={() => addArrayItem('features')} variant="outline" className="w-full mt-2 text-xs py-1 border-dashed">
              <Plus size={14} className="mr-1" /> Agregar Feature
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4">Beneficios (Benefits)</h3>
          <div className="space-y-2">
            {course.benefits.map((ben, idx) => (
              <div key={idx} className="flex gap-2">
                <input value={ben} onChange={(e) => updateArrayItem('benefits', idx, e.target.value)} className="flex-1 bg-black/50 border border-white/20 rounded p-2 text-white text-sm" placeholder="Beneficio..." />
                <button onClick={() => removeArrayItem('benefits', idx)} className="text-red-400 hover:bg-red-400/10 p-2 rounded"><Trash2 size={16} /></button>
              </div>
            ))}
            <Button onClick={() => addArrayItem('benefits')} variant="outline" className="w-full mt-2 text-xs py-1 border-dashed">
              <Plus size={14} className="mr-1" /> Agregar Beneficio
            </Button>
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: TEMARIO (SYLLABUS) */}
      <h2 className="text-2xl font-bold text-white mb-4">Temario del Curso</h2>
      <div className="space-y-6 mb-8">
        {course.syllabus.map((module, index) => (
          <div key={index} className="bg-neon-surface border border-white/10 p-4 rounded-xl flex gap-4 items-start animate-fade-in">
            <div className="flex items-center justify-center w-8 h-8 bg-white/5 rounded-full text-gray-400 font-bold mt-1">
              {index + 1}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Título del Módulo</label>
                <input
                  type="text"
                  value={module.title || ''}
                  onChange={(e) => updateModule(index, 'title', e.target.value)}
                  className="w-full bg-black/50 border border-white/20 rounded p-2 text-white focus:border-neon-blue outline-none transition-colors"
                  placeholder="Ej: Introducción a la Electrónica"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Descripción de Lecciones</label>
                <input
                  type="text"
                  value={module.lessons || ''}
                  onChange={(e) => updateModule(index, 'lessons', e.target.value)}
                  className="w-full bg-black/50 border border-white/20 rounded p-2 text-white focus:border-neon-blue outline-none transition-colors"
                  placeholder="Ej: 5 clases • 45 min"
                />
              </div>
            </div>
            <button 
              onClick={() => removeModule(index)}
              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors mt-6"
              title="Eliminar módulo"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-12">
        <Button onClick={addModule} variant="outline" className="flex items-center gap-2 border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-white">
          <Plus size={18} /> Agregar Módulo
        </Button>
      </div>

      <div className="bg-black/80 p-6 rounded-xl border border-white/10 relative shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            JSON Resultante
          </h3>
          <button 
            onClick={copyToClipboard}
            className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-all ${copied ? 'bg-green-500/20 text-green-400' : 'bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20'}`}
          >
            <Copy size={16} /> {copied ? '¡Copiado al portapapeles!' : 'Copiar JSON'}
          </button>
        </div>
        <pre className="text-gray-300 font-mono text-sm overflow-x-auto p-4 bg-black rounded-lg border border-white/5 max-h-96 scrollbar-thin scrollbar-thumb-gray-700">
          {generateJson()}
        </pre>
      </div>
    </div>
  );
};