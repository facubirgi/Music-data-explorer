import { useState } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Label,
  LabelList
} from 'recharts';

interface EmotionalMapProps {
  tracks: any[];
  quizMode: boolean;
  onQuizToggle: () => void;
  revealedTrack: string | null;
  onTrackClick: (track: any) => void;
}

export function EmotionalMap({ 
  tracks, 
  quizMode, 
  onQuizToggle, 
  revealedTrack, 
  onTrackClick 
}: EmotionalMapProps) {
  return (
    <div className="p-6 rounded-2xl" 
         style={{ backgroundColor: 'rgba(23, 23, 23, 0.5)', border: '1px solid #262626' }}>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: '#ffffff' }}>
          Mapa Emocional
        </h3>
        <button 
          onClick={onQuizToggle}
          className={`text-xs px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${
            quizMode 
              ? 'bg-yellow-500 text-black border-yellow-500 font-bold' 
              : 'bg-transparent text-neutral-400 border-neutral-700 hover:text-white'
          }`}
        >
          {quizMode ? 'Salir del Quiz' : '🎮 Jugar: Adivina el Track'}
        </button>
      </div>
      
      {quizMode && (
        <p className="text-xs text-yellow-500 mb-4 animate-pulse">
          Modo Quiz: Haz clic en un punto para escuchar y revelar.
        </p>
      )}

      {/* Leyenda de cuadrantes */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="p-2 rounded" style={{ backgroundColor: '#1a1a1a', borderLeft: '3px solid #4ade80' }}>
          <span className="font-bold text-green-400">Valence (Positividad)</span>
          <p className="text-neutral-400 text-[10px]">0 = Triste/Negativo • 1 = Feliz/Positivo</p>
        </div>
        <div className="p-2 rounded" style={{ backgroundColor: '#1a1a1a', borderLeft: '3px solid #60a5fa' }}>
          <span className="font-bold text-blue-400">Energy (Energía)</span>
          <p className="text-neutral-400 text-[10px]">0 = Calmado • 1 = Enérgico</p>
        </div>
      </div>

      <div className="h-75 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              type="number" 
              dataKey="valence" 
              name="Valence" 
              domain={[0, 1]} 
              tick={{ fill: '#4ade80', fontSize: 11 }}
              tickFormatter={(value) => (value * 100).toFixed(0)}
            >
              <Label 
                value="Valence (Positividad →)" 
                position="bottom" 
                offset={20}
                style={{ fill: '#4ade80', fontSize: 12, fontWeight: 'bold' }} 
              />
            </XAxis>
            <YAxis 
              type="number" 
              dataKey="energy" 
              name="Energy" 
              domain={[0, 1]} 
              tick={{ fill: '#60a5fa', fontSize: 11 }}
              tickFormatter={(value) => (value * 100).toFixed(0)}
            >
              <Label 
                value="Energy (Energía ↑)" 
                position="left" 
                angle={-90}
                offset={40}
                style={{ fill: '#60a5fa', fontSize: 12, fontWeight: 'bold', textAnchor: 'middle' }} 
              />
            </YAxis>
            <ReferenceLine x={0.5} stroke="#444" strokeDasharray="3 3" />
            <ReferenceLine y={0.5} stroke="#444" strokeDasharray="3 3" />
            
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload;
                  
                  if (quizMode && revealedTrack !== data.id) {
                    return (
                      <div className="bg-neutral-900 border border-neutral-700 p-3 rounded shadow-xl text-center" 
                           style={{ minWidth: '150px' }}>
                        <p className="text-3xl mb-2">🕵️‍♂️</p>
                        <p className="font-bold text-white text-sm mb-1">¿Qué canción es?</p>
                        <p className="text-xs text-neutral-400">Clic para oír y revelar</p>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="bg-black/90 border border-neutral-700 p-3 rounded shadow-xl max-w-50">
                      <p className="font-bold text-green-400 text-sm mb-1">{data.name}</p>
                      <p className="text-xs text-neutral-300 mb-2">{data.album}</p>
                      <div className="text-[10px] text-neutral-400 grid grid-cols-2 gap-x-2">
                        <span>Val: {Math.round(data.valence * 100)}%</span>
                        <span>En: {Math.round(data.energy * 100)}%</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            <Scatter 
              name="Canciones" 
              data={tracks} 
              fill={quizMode ? (revealedTrack ? "#22c55e" : "#eab308") : "#fff"} 
              fillOpacity={0.8} 
              shape="circle"
              onClick={onTrackClick}
              style={{ cursor: quizMode ? 'pointer' : 'default' }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
