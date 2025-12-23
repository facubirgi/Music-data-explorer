export interface Artist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  genres: string[];
  popularity: number;
  followers: { total: number };
}

export interface Track {
  id: string;
  name: string;
  album: {
    name: string;
    images: { url: string }[];
    release_date: string;
  };
  artists: { name: string }[];
  duration_ms: number;
  popularity: number;
}

export interface AudioFeatures {
  id: string;
  danceability: number; // 0.0 a 1.0 (Qué tan bailable es)
  energy: number;       // 0.0 a 1.0 (Intensidad)
  valence: number;      // 0.0 a 1.0 (Positividad/Felicidad)
  tempo: number;        // BPM
  acousticness: number;
  loudness: number;
}

// Un tipo combinado para nuestros gráficos
export interface AnalyzedTrack extends Track {
  features: AudioFeatures;
}