import { Music2, Play, Pause } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  album: string;
  preview_url: string | null;
  energy: number;
  valence: number;
}

interface TrackListProps {
  tracks: Track[];
  playingUrl: string | null;
  onPlayToggle: (url: string | null) => void;
  limit?: number;
}

export function TrackList({ tracks, playingUrl, onPlayToggle, limit = 6 }: TrackListProps) {
  const displayTracks = tracks.slice(0, limit);

  return (
    <div className="rounded-2xl overflow-hidden" 
         style={{ backgroundColor: 'rgba(23, 23, 23, 0.5)', border: '1px solid #262626' }}>
      
      <div className="p-4" style={{ backgroundColor: '#171717', borderBottom: '1px solid #262626' }}>
        <h3 className="font-bold flex items-center gap-2" style={{ color: '#ffffff' }}>
          <Music2 size={18} /> Tracks Representativos
        </h3>
      </div>
      
      <div>
        {displayTracks.map((track) => (
          <div 
            key={track.id} 
            className="p-4 flex gap-3 items-center" 
            style={{ borderBottom: '1px solid rgba(38, 38, 38, 0.5)' }}
          >
            <button 
              onClick={() => onPlayToggle(track.preview_url)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                playingUrl === track.preview_url 
                  ? 'bg-green-500 text-black' 
                  : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
              }`}
              title={track.preview_url ? "Escuchar Preview" : "No disponible"}
            >
              {playingUrl === track.preview_url ? (
                <Pause size={14} fill="currentColor" />
              ) : (
                <Play size={14} fill="currentColor" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate text-sm ${
                playingUrl === track.preview_url ? 'text-green-400' : 'text-white'
              }`}>
                {track.name}
              </p>
              
              <div className="mt-2 flex items-center gap-2 text-[10px]" style={{ color: '#a3a3a3' }}>
                <div className="flex-1 flex items-center gap-1">
                  <span>Energía</span>
                  <div className="h-1 flex-1 rounded-full overflow-hidden" 
                       style={{ backgroundColor: '#404040' }}>
                    <div className="h-full" 
                         style={{ width: `${track.energy * 100}%`, backgroundColor: '#eab308' }} />
                  </div>
                </div>
                
                <div className="flex-1 flex items-center gap-1">
                  <span>Felicidad</span>
                  <div className="h-1 flex-1 rounded-full overflow-hidden" 
                       style={{ backgroundColor: '#404040' }}>
                    <div className="h-full" 
                         style={{ width: `${track.valence * 100}%`, backgroundColor: '#3b82f6' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
