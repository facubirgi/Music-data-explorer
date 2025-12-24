export interface Statistics {
  mean: number;
  stdDev: number;
}

export interface OutlierTrack {
  id: string;
  name: string;
  tempo: number;
  energy: number;
  reasons: string[];
  [key: string]: any;
}

/**
 * Calcula el promedio de una propiedad específica en un array de tracks
 */
export function calculateAverage(tracks: any[], key: string): number {
  if (!tracks.length) return 0;
  return tracks.reduce((acc, track) => acc + (track[key] || 0), 0) / tracks.length;
}

/**
 * Calcula la media y desviación estándar de una propiedad
 */
export function getStatistics(data: any[], key: string): Statistics {
  const mean = calculateAverage(data, key);
  const variance = data.reduce((acc, val) => acc + Math.pow((val[key] || 0) - mean, 2), 0) / data.length;
  
  return {
    mean,
    stdDev: Math.sqrt(variance),
  };
}

/**
 * Detecta outliers basándose en Z-Score
 */
export function detectOutliers(
  tracks: any[],
  threshold: number = 1.8,
  limit: number = 3
): OutlierTrack[] {
  const tempoStats = getStatistics(tracks, 'tempo');
  const energyStats = getStatistics(tracks, 'energy');

  const outliers = tracks
    .filter((track) => {
      const tempoZ = Math.abs((track.tempo - tempoStats.mean) / tempoStats.stdDev);
      const energyZ = Math.abs((track.energy - energyStats.mean) / energyStats.stdDev);
      return tempoZ > threshold || energyZ > threshold;
    })
    .map((track) => {
      const reasons: string[] = [];
      
      if (track.tempo > tempoStats.mean + tempoStats.stdDev * 1.5) {
        reasons.push('Muy Rápida');
      }
      if (track.tempo < tempoStats.mean - tempoStats.stdDev * 1.5) {
        reasons.push('Muy Lenta');
      }
      if (track.energy > energyStats.mean + energyStats.stdDev * 1.5) {
        reasons.push('Energía Explosiva');
      }
      if (track.energy < energyStats.mean - energyStats.stdDev * 1.5) {
        reasons.push('Muy Minimalista');
      }
      
      return { ...track, reasons };
    });

  return outliers.slice(0, limit);
}

/**
 * Genera datos para el gráfico de radar basado en las características promedio
 */
export function generateRadarData(tracks: any[]) {
  return [
    { subject: 'Bailable', A: calculateAverage(tracks, 'danceability'), fullMark: 1 },
    { subject: 'Energía', A: calculateAverage(tracks, 'energy'), fullMark: 1 },
    { subject: 'Positividad', A: calculateAverage(tracks, 'valence'), fullMark: 1 },
    { subject: 'Acústico', A: calculateAverage(tracks, 'acousticness'), fullMark: 1 },
    { subject: 'En Vivo', A: calculateAverage(tracks, 'liveness'), fullMark: 1 },
    { subject: 'Instrumental', A: calculateAverage(tracks, 'instrumentalness'), fullMark: 1 },
  ];
}
