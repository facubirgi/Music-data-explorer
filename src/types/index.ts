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
  preview_url?: string | null;
}

export interface AudioFeatures {
  id: string;
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
  loudness: number;
  instrumentalness?: number;
  liveness?: number;
}

export interface AnalyzedTrack extends Track {
  features: AudioFeatures;
  valence: number;
  energy: number;
  tempo: number;
  danceability: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  release_date?: string;
}

export interface SearchArtist {
  id: string;
  name: string;
  image: string | null;
  followers: number;
  genres: string[];
}

export interface ApiError {
  error: string;
  message?: string;
}
