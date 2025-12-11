import React from 'react';

export const GrowthChart: React.FC = () => {
  return (
    <div className="relative bg-neon-surface/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-sm">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h4 className="text-gray-400 text-xs uppercase tracking-widest">Proyección</h4>
          <p className="text-white font-bold text-xl">Tus Ingresos</p>
        </div>
        <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-bold">
          +320%
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="h-40 flex items-end gap-2 relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="w-full h-px bg-white border-dashed border-t"></div>
          <div className="w-full h-px bg-white border-dashed border-t"></div>
          <div className="w-full h-px bg-white border-dashed border-t"></div>
          <div className="w-full h-px bg-white border-dashed border-t"></div>
        </div>

        {/* Bars */}
        <div className="w-1/5 bg-gray-700/50 rounded-t-lg h-[20%] relative group">
           <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">Mes 1</div>
        </div>
        <div className="w-1/5 bg-neon-blue/30 rounded-t-lg h-[0%] animate-grow-up" style={{"--target-height": "45%"} as React.CSSProperties}></div>
        <div className="w-1/5 bg-neon-blue/60 rounded-t-lg h-[0%] animate-grow-up" style={{"--target-height": "65%", "animationDelay": "0.2s"} as React.CSSProperties}></div>
        <div className="w-1/5 bg-neon-orange/80 rounded-t-lg h-[0%] animate-grow-up shadow-[0_0_15px_rgba(255,159,28,0.5)]" style={{"--target-height": "85%", "animationDelay": "0.4s"} as React.CSSProperties}></div>
        <div className="w-1/5 bg-gradient-to-t from-neon-orange to-yellow-400 rounded-t-lg h-[0%] animate-grow-up shadow-[0_0_20px_rgba(255,159,28,0.8)]" style={{"--target-height": "100%", "animationDelay": "0.6s"} as React.CSSProperties}>
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neon-orange text-black font-bold text-xs px-3 py-1 rounded-full shadow-neon-orange whitespace-nowrap animate-bounce">
             ¡Experto!
           </div>
        </div>
      </div>

      <div className="flex justify-between text-gray-500 text-xs mt-3 px-1">
        <span>Inicio</span>
        <span>Práctica</span>
        <span>Clientes</span>
      </div>
    </div>
  );
};