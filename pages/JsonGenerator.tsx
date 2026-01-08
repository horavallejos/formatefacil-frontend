import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Copy, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const JsonGenerator: React.FC = () => {
  const [modules, setModules] = useState<{title: string, lessons: string}[]>([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentLessons, setCurrentLessons] = useState('');

  const addModule = () => {
    if (currentTitle && currentLessons) {
      setModules([...modules, { title: currentTitle, lessons: currentLessons }]);
      setCurrentTitle('');
      setCurrentLessons('');
    }
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const jsonOutput = JSON.stringify(modules, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    alert('¡JSON copiado! Ahora pégalo en la columna "syllabus" de Supabase.');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="text-gray-400 hover:text-white"><ArrowLeft /></Link>
        <h1 className="text-3xl font-heading font-bold text-white">Generador de Temario JSON</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-bold text-neon-blue mb-4">1. Agregar Módulo</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Título del Módulo</label>
              <input 
                type="text" 
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                placeholder="Ej: Módulo 1: Introducción"
                className="w-full bg-black/50 border border-white/20 rounded p-2 text-white focus:border-neon-blue outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Lecciones (texto simple)</label>
              <textarea 
                value={currentLessons}
                onChange={(e) => setCurrentLessons(e.target.value)}
                placeholder="Ej: Bienvenida, Herramientas, Seguridad"
                className="w-full bg-black/50 border border-white/20 rounded p-2 text-white h-24 focus:border-neon-blue outline-none"
              />
            </div>
            <Button onClick={addModule} fullWidth disabled={!currentTitle || !currentLessons}>
              <Plus size={18} className="mr-2 inline" /> Agregar Módulo
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-white mb-2">Módulos Agregados:</h3>
            {modules.length === 0 && <p className="text-gray-500 text-sm italic">Aún no has agregado módulos.</p>}
            <ul className="space-y-2">
              {modules.map((m, idx) => (
                <li key={idx} className="bg-black/30 p-3 rounded flex justify-between items-center border border-white/5">
                  <div>
                    <p className="font-bold text-sm text-white">{m.title}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">{m.lessons}</p>
                  </div>
                  <button onClick={() => removeModule(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Resultado */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col">
          <h2 className="text-xl font-bold text-neon-orange mb-4">2. Resultado JSON</h2>
          <p className="text-sm text-gray-400 mb-2">Copia esto y pégalo en Supabase:</p>
          <div className="flex-grow relative">
            <textarea 
              readOnly
              value={jsonOutput}
              className="w-full h-full min-h-[300px] bg-black border border-white/20 rounded p-4 font-mono text-sm text-green-400 resize-none outline-none"
            />
            <button 
              onClick={copyToClipboard}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded text-white transition-colors"
              title="Copiar al portapapeles"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};