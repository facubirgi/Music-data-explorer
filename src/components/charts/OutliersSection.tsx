import { AlertCircle } from 'lucide-react';
import type { OutlierTrack } from '@/src/lib/statistics';

interface OutliersSectionProps {
  outliers: OutlierTrack[];
}

export function OutliersSection({ outliers }: OutliersSectionProps) {
  return (
    <div className="p-6 rounded-2xl" 
         style={{ backgroundColor: 'rgba(38, 38, 38, 0.3)', border: '1px solid #262626' }}>
      
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#ffffff' }}>
        <AlertCircle size={20} style={{ color: '#c084fc' }} /> 
        Anomalías Detectadas (Z-Score &gt; 1.8)
      </h3>
      
      {outliers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {outliers.map((track) => (
            <div 
              key={track.id} 
              className="p-4 rounded-xl" 
              style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
            >
              <div className="flex items-start justify-between mb-2">
                <span 
                  className="text-xs font-bold px-2 py-1 rounded uppercase" 
                  style={{ backgroundColor: 'rgba(192, 132, 252, 0.2)', color: '#d8b4fe' }}
                >
                  Atípica
                </span>
                <span className="text-xs" style={{ color: '#737373' }}>
                  {track.release_date?.split('-')[0] || 'N/A'}
                </span>
              </div>
              
              <p className="font-bold text-lg truncate" style={{ color: '#ffffff' }}>
                {track.name}
              </p>
              
              <div className="space-y-1 mt-2">
                {track.reasons.map((reason) => (
                  <div key={reason} className="flex items-center gap-2 text-xs" style={{ color: '#e5e5e5' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#c084fc' }} />
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-4" style={{ color: '#737373' }}>
          Sin anomalías detectadas.
        </p>
      )}
    </div>
  );
}
