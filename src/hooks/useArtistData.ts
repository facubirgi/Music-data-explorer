import { useEffect, useState } from 'react';

export interface ArtistData {
  artist: any;
  tracks: any[];
}

export function useArtistData(artistId: string | string[]) {
  const [data, setData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`/api/artist/${artistId}`);
        
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        
        const json = await res.json();
        
        // Ordenar tracks por popularidad
        if (json.tracks) {
          json.tracks.sort((a: any, b: any) => b.popularity - a.popularity);
        }
        
        setData(json);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar datos del artista';
        setError(errorMessage);
        console.error('Error fetching artist data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (artistId) {
      fetchData();
    }
  }, [artistId]);

  return { data, loading, error };
}
