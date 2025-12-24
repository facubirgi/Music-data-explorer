import { Music } from 'lucide-react';

export function Hero() {
  return (
    <div className="text-center mb-12 mt-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex justify-center mb-4">
        <div className="bg-green-500 p-3 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]">
          <Music size={32} className="text-black" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        Music Data Explorer
      </h1>
      
      <p className="text-neutral-400 max-w-lg mx-auto">
        Descubre los patrones ocultos en la discografía de tus artistas. 
        Analiza si son tristes, rápidos o bailables.
      </p>
    </div>
  );
}
