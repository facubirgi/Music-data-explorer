'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
  LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { ArrowLeft, Loader2, Play, Clock, Music2, Mic2 } from 'lucide-react';

export default function ArtistAnalysisPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/artist/${id}`);
        if (!res.ok) throw new Error('Error fetch');
        const json = await res.json();
        
        // Ordenar por fecha para el gráfico de línea
        if (json.tracks) {
          json.tracks.sort((a: any, b: any) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
        }
        setData(json);
      } catch (error) { console.error(error); }
    };
    if (id) fetchData();
  }, [id]);

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-black text-white"><Loader2 className="animate-spin" /></div>;

  const { artist, tracks } = data;

  // --- CÁLCULO DE PROMEDIOS PARA EL RADAR ---
  const avg = (key: string) => tracks.reduce((acc: number, t: any) => acc + t[key], 0) / tracks.length;
  
  const radarData = [
    { subject: 'Bailable', A: avg('danceability'), fullMark: 1 },
    { subject: 'Energía', A: avg('energy'), fullMark: 1 },
    { subject: 'Positividad', A: avg('valence'), fullMark: 1 },
    { subject: 'Acústico', A: avg('acousticness'), fullMark: 1 },
    { subject: 'En Vivo', A: avg('liveness'), fullMark: 1 },
    { subject: 'Instrumental', A: avg('instrumentalness'), fullMark: 1 },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20">
      
      {/* HEADER CON GRADIENTE */}
      <div className="relative h-75 w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-green-900/40 to-neutral-950 z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-8">
          <button onClick={() => router.back()} className="absolute top-8 left-6 flex items-center text-white/70 hover:text-white transition-colors bg-black/30 px-3 py-1 rounded-full backdrop-blur-md">
            <ArrowLeft size={16} className="mr-2" /> Volver
          </button>
          
          <div className="flex flex-col md:flex-row items-end gap-6">
            <img src={artist.images[0]?.url} alt={artist.name} className="w-40 h-40 rounded-full shadow-2xl border-4 border-neutral-900 object-cover" />
            <div className="mb-2">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">{artist.name}</h1>
              <div className="flex flex-wrap gap-2 mt-3">
                {artist.genres.slice(0, 3).map((g: string) => (
                  <span key={g} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm capitalize font-medium text-white">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: GRÁFICOS (2/3 del ancho) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Radar Chart (NUEVO) - Perfil Sonoro */}
          <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -z-10"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Mic2 className="text-green-400" size={20}/> Perfil Sonoro Promedio
            </h3>
            <div className="h-87.5 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
                  <Radar name={artist.name} dataKey="A" stroke="#22c55e" strokeWidth={3} fill="#22c55e" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-neutral-500 mt-2">
              Esta forma representa la "huella digital" sónica del artista.
            </p>
          </div>

          {/* 2. Scatter Plot - Mapa Emocional */}
          <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">Mapa Emocional</h3>
            <p className="text-sm text-neutral-400 mb-6">Cada punto es una canción. Eje X: Tristeza/Felicidad. Eje Y: Intensidad.</p>
            <div className="h-75 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" dataKey="valence" name="Valence" domain={[0, 1]} tick={{fill: '#555'}} />
                  <YAxis type="number" dataKey="energy" name="Energy" domain={[0, 1]} tick={{fill: '#555'}} />
                  <Tooltip 
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-black/90 p-2 border border-neutral-700 rounded text-xs">
                            <b className="text-green-400">{d.name}</b>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine x={0.5} stroke="#444" strokeDasharray="3 3" />
                  <ReferenceLine y={0.5} stroke="#444" strokeDasharray="3 3" />
                  <Scatter name="Canciones" data={tracks} fill="#fff" fillOpacity={0.8} shape="circle" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: KPI & LISTA (1/3 del ancho) */}
        <div className="space-y-8">
          
          {/* KPI CARDS */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                <p className="text-xs text-neutral-500 uppercase font-bold">Popularidad</p>
                <p className="text-3xl font-mono text-white mt-1">{artist.popularity}<span className="text-sm text-neutral-600">/100</span></p>
             </div>
             <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                <p className="text-xs text-neutral-500 uppercase font-bold">Tempo (Avg)</p>
                <p className="text-3xl font-mono text-green-400 mt-1">
                  {Math.round(avg('tempo'))} <span className="text-sm text-neutral-600">BPM</span>
                </p>
             </div>
          </div>

          {/* LISTA DE CANCIONES (TOP TRACKS) */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden">
             <div className="p-4 border-b border-neutral-800 bg-neutral-900">
               <h3 className="font-bold flex items-center gap-2"><Music2 size={18}/> Top Canciones</h3>
             </div>
             <div className="max-h-125 overflow-y-auto">
               {tracks.map((track: any, i: number) => (
                 <div key={track.id} className="p-4 hover:bg-white/5 transition-colors border-b border-neutral-800/50 flex gap-3 group">
                    <div className="font-mono text-neutral-600 text-sm w-6 pt-1">#{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate text-sm">{track.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{track.album}</p>
                      
                      {/* Mini barras de stats */}
                      <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-400">
                         <div className="flex-1 flex items-center gap-1">
                            <span>Energía</span>
                            <div className="h-1 bg-neutral-700 flex-1 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-500" style={{width: `${track.energy * 100}%`}}></div>
                            </div>
                         </div>
                         <div className="flex-1 flex items-center gap-1">
                            <span>Feliz</span>
                            <div className="h-1 bg-neutral-700 flex-1 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{width: `${track.valence * 100}%`}}></div>
                            </div>
                         </div>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}