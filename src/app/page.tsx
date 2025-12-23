'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Music, Loader2 } from 'lucide-react';

// Definimos la estructura de los datos del artista
type Artist = {
  id: string;
  name: string;
  image: string | null;
  followers: number;
  genres: string[];
};

export default function Home() {
  const router = useRouter(); // Hook para navegar entre páginas
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Llamamos a nuestro propio endpoint
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.artists || []);
    } catch (error) {
      console.error('Error buscando:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8 flex flex-col items-center">
      {/* Header / Título */}
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

      {/* Buscador */}
      <div className="w-full max-w-xl mb-12 relative z-10">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Busca un artista (ej: Bad Bunny, Queen...)"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-4 px-6 pl-14 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-lg placeholder:text-neutral-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          
          <button 
            type="submit" 
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-green-500 hover:bg-green-400 text-black font-bold px-6 rounded-full transition-colors disabled:opacity-50 flex items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Buscar'}
          </button>
        </form>
      </div>

      {/* Grid de Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {results.map((artist) => (
          <div 
            key={artist.id} 
            onClick={() => router.push(`/artist/${artist.id}`)}
            className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 flex items-center gap-4 hover:bg-neutral-800 hover:border-neutral-700 transition-all cursor-pointer group hover:scale-[1.02]"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0 border-2 border-transparent group-hover:border-green-500 transition-colors">
              {artist.image ? (
                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-600 font-bold text-2xl">
                  {artist.name[0]}
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-lg text-white truncate group-hover:text-green-400 transition-colors">
                {artist.name}
              </h3>
              <p className="text-sm text-neutral-400 truncate">
                {artist.genres.slice(0, 2).join(', ')}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                {new Intl.NumberFormat().format(artist.followers)} seguidores
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}