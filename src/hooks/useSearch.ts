import { useState } from 'react';
import type { Artist } from '@/src/types';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      setResults(data.artists || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al buscar artistas';
      setError(errorMessage);
      console.error('Error buscando:', err);
    } finally {
      setLoading(false);
    }
  };

  return { query, setQuery, results, loading, error, handleSearch };
}
