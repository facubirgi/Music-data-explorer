'use client';

import { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Toaster, toast } from 'sonner';

import { useArtistData } from '@/src/hooks/useArtistData';
import { useAudioPlayer } from '@/src/hooks/useAudioPlayer';
import { calculateAverage, detectOutliers, generateRadarData } from '@/src/lib/statistics';
import { LoadingSpinner } from '@/src/components/ui/LoadingSpinner';
import { Button } from '@/src/components/ui/Button';
import { SonicRadarChart } from '@/src/components/charts/SonicRadarChart';
import { EmotionalMap } from '@/src/components/charts/EmotionalMap';
import { TrackList } from '@/src/components/charts/TrackList';
import { OutliersSection } from '@/src/components/charts/OutliersSection';

export default function ArtistAnalysisPage() {
  const { id } = useParams();
  const router = useRouter();
  const exportRef = useRef<HTMLDivElement>(null);
  
  const { data, loading } = useArtistData(id as string);
  const { playingUrl, togglePreview } = useAudioPlayer();
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [revealedTrack, setRevealedTrack] = useState<string | null>(null);

  const handleDownloadImage = async () => {
    if (!exportRef.current || !data?.artist) return;
    
    setIsDownloading(true);
    const wasQuizMode = quizMode;
    if (wasQuizMode) setQuizMode(false);
    
    const toastId = toast.loading('Generando reporte de alta calidad...');

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (doc) => {
          doc.querySelectorAll('*').forEach((el: any) => {
            if (el.style) el.style.boxShadow = 'none';
          });
        }
      });
      
      const link = document.createElement('a');
      link.download = `${data.artist.name.replace(/\s+/g, '_')}_Analysis.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
      toast.success('¡Reporte descargado!', { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error('Error al generar imagen', { id: toastId });
    } finally {
      setIsDownloading(false);
      if (wasQuizMode) setQuizMode(true);
    }
  };

  const handleTrackClick = (track: any) => {
    if (quizMode) {
      setRevealedTrack(track.id);
      if (track.preview_url) togglePreview(track.preview_url);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;
  if (!data) return null;

  const { artist, tracks } = data;
  const radarData = generateRadarData(tracks);
  const outliers = detectOutliers(tracks);

  return (
    <div className="min-h-screen font-sans pb-20 relative" 
         style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      
      <Toaster theme="dark" position="bottom-center" richColors />

      <Button
        onClick={handleDownloadImage}
        isLoading={isDownloading}
        className="fixed bottom-6 right-6 z-50 shadow-lg gap-3"
      >
        {!isDownloading && <Download size={20} />}
        {isDownloading ? 'Generando...' : 'Descargar Reporte'}
      </Button>

      <button 
        onClick={() => router.back()} 
        className="absolute top-8 left-6 z-20 flex items-center text-white/70 hover:text-white transition-colors bg-black/30 px-3 py-1 rounded-full backdrop-blur-md"
      >
        <ArrowLeft size={16} className="mr-2" /> Volver
      </button>

      <div ref={exportRef} className="pb-12" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>
        
        {/* HEADER */}
        <div className="relative h-75 w-full overflow-hidden">
          <div className="absolute inset-0 z-0" 
               style={{ background: 'linear-gradient(to bottom, rgba(20, 83, 45, 0.4), #0a0a0a)' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0" />
          
          <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-8">
            <div className="flex flex-col md:flex-row items-end gap-6">
              <img 
                src={artist.images[0]?.url} 
                alt={artist.name} 
                crossOrigin="anonymous" 
                className="w-40 h-40 rounded-full object-cover"
                style={{ border: '4px solid #171717', boxShadow: '0 10px 15px rgba(0,0,0,0.5)' }} 
              />
              <div className="mb-2">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter" 
                    style={{ color: '#ffffff' }}>
                  {artist.name}
                </h1>
                <p className="font-medium flex items-center gap-2" style={{ color: '#4ade80' }}>
                  <Share2 size={16} /> Perfil Sónico & Reporte de Datos
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <SonicRadarChart data={radarData} artistName={artist.name} />
            
            <EmotionalMap
              tracks={tracks}
              quizMode={quizMode}
              onQuizToggle={() => { 
                setQuizMode(!quizMode); 
                setRevealedTrack(null); 
              }}
              revealedTrack={revealedTrack}
              onTrackClick={handleTrackClick}
            />
          </div>

          <div className="space-y-8">
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" 
                   style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
                <p className="text-xs uppercase font-bold" style={{ color: '#737373' }}>
                  Popularidad
                </p>
                <p className="text-3xl font-mono mt-1" style={{ color: '#ffffff' }}>
                  {artist.popularity}
                  <span className="text-sm" style={{ color: '#525252' }}>/100</span>
                </p>
              </div>
              
              <div className="p-4 rounded-xl" 
                   style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
                <p className="text-xs uppercase font-bold" style={{ color: '#737373' }}>
                  Tempo Promedio
                </p>
                <p className="text-3xl font-mono mt-1" style={{ color: '#4ade80' }}>
                  {Math.round(calculateAverage(tracks, 'tempo'))}
                  <span className="text-sm" style={{ color: '#525252' }}> BPM</span>
                </p>
              </div>
            </div>

            <TrackList 
              tracks={tracks} 
              playingUrl={playingUrl} 
              onPlayToggle={togglePreview}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-8">
          <OutliersSection outliers={outliers} />
        </div>

        <div className="text-center text-sm mt-12 pb-6" style={{ color: '#525252' }}>
          Generado con Music Data Explorer • Powered by Spotify API
        </div>
      </div>
    </div>
  );
}
