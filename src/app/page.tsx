'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Music2, Loader2, ChevronRight, Users, Mic2 } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setArtists([]); // Limpiar resultados anteriores

    try {
      // Asumimos que tienes una ruta API para buscar (si no la tienes, avísame y te paso el backend)
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setArtists(data.artists?.items || []);
      }
    } catch (error) {
      console.error("Error buscando artistas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-green-500/30">
      
      {/* --- HERO SECTION / BUSCADOR --- */}
      <div className="flex flex-col items-center justify-center pt-20 pb-10 px-6">
        <div className="mb-8 text-center space-y-4">
           <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full mb-4 ring-1 ring-green-500/30">
              <Music2 className="text-green-400 w-8 h-8" />
           </div>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-neutral-500">
             Music Data Explorer
           </h1>
           <p className="text-neutral-400 text-lg max-w-lg mx-auto">
             Descubre el ADN sónico de tus artistas favoritos. Analiza métricas, detecta anomalías y explora datos reales de Spotify.
           </p>
        </div>

        {/* BARRA DE BÚSQUEDA */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-neutral-500 group-focus-within:text-green-400 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Buscar artista (ej. Soda Stereo, Coldplay, Daft Punk)..." 
            className="w-full bg-neutral-900/80 border border-neutral-800 text-white rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all shadow-2xl placeholder:text-neutral-600 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading || !query}
            className="absolute right-2 top-2 bottom-2 bg-neutral-800 hover:bg-neutral-700 text-white px-6 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Buscar'}
          </button>
        </form>
      </div>

      {/* --- RESULTADOS --- */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 text-green-500 animate-spin mx-auto mb-4" />
            <p className="text-neutral-500 animate-pulse">Consultando base de datos de Spotify...</p>
          </div>
        )}

        {!loading && hasSearched && artists.length === 0 && (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-3xl bg-neutral-900/20">
            <p className="text-neutral-400 text-xl">No encontramos artistas con ese nombre 😔</p>
            <p className="text-neutral-600 mt-2">Intenta verificar la ortografía.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {artists.map((artist) => (
            <Link key={artist.id} href={`/artist/${artist.id}`} className="block group">
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-4 flex items-center gap-5 hover:bg-neutral-900 hover:border-green-500/30 transition-all cursor-pointer relative overflow-hidden">
                
                {/* EFECTO GLOW AL HOVER */}
                <div className="absolute inset-0 bg-linear-to-r from-green-500/0 via-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* --- AQUÍ ESTÁ LA CORRECCIÓN DE LA IMAGEN --- */}
                <div className="relative shrink-0">
                   {artist.images && artist.images.length > 0 ? (
                     <img 
                       src={artist.images[0]?.url} // Tomamos la primera imagen del array
                       alt={artist.name} 
                       className="w-20 h-20 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform border-2 border-neutral-800 group-hover:border-green-500"
                     />
                   ) : (
                     // Fallback si no tiene foto
                     <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-neutral-700">
                        <Mic2 className="text-neutral-500" />
                     </div>
                   )}
                </div>

                <div className="flex-1 min-w-0 z-10">
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors truncate">
                    {artist.name}
                  </h3>
                  
                  {/* --- AQUÍ ESTÁ LA CORRECCIÓN DE LOS SEGUIDORES (NaN) --- */}
                  <div className="flex items-center gap-4 text-sm text-neutral-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {/* Accedemos a .total y formateamos */}
                      {artist.followers?.total?.toLocaleString('es-ES') || 0} 
                    </span>
                  </div>

                  {artist.genres && artist.genres.length > 0 && (
                    <p className="text-xs text-neutral-500 mt-2 capitalize truncate">
                      {artist.genres.slice(0, 2).join(', ')}
                    </p>
                  )}
                </div>

                <ChevronRight className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}