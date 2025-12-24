import { 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer 
} from 'recharts';
import { Mic2 } from 'lucide-react';

interface RadarChartData {
  subject: string;
  A: number;
  fullMark: number;
}

interface SonicRadarChartProps {
  data: RadarChartData[];
  artistName: string;
}

export function SonicRadarChart({ data, artistName }: SonicRadarChartProps) {
  return (
    <div className="p-6 rounded-2xl relative overflow-hidden" 
         style={{ backgroundColor: 'rgba(23, 23, 23, 0.5)', border: '1px solid #262626' }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -z-10" 
           style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }} />
      
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: '#ffffff' }}>
        <Mic2 size={20} style={{ color: '#4ade80' }} /> 
        Huella Digital Sonora
      </h3>
      
      <div className="h-87.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
            <Radar 
              name={artistName} 
              dataKey="A" 
              stroke="#22c55e" 
              strokeWidth={3} 
              fill="#22c55e" 
              fillOpacity={0.3} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
