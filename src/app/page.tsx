'use client';

import { Search } from 'lucide-react';
import { useSearch } from '@/src/hooks/useSearch';
import { Hero } from '@/src/components/layout/Hero';
import { SearchResults } from '@/src/components/layout/SearchResults';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';

export default function Home() {
  const { query, setQuery, results, loading, handleSearch } = useSearch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8 flex flex-col items-center">
      <Hero />

      {/* Buscador */}
      <div className="w-full max-w-xl mb-12 relative z-10">
        <form onSubmit={onSubmit} className="relative">
          <Input
            type="text"
            placeholder="Busca un artista (ej: Bad Bunny, Queen...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search />}
          />
          
          <Button 
            type="submit" 
            isLoading={loading}
            className="absolute right-2 top-2 bottom-2"
          >
            {loading ? '' : 'Buscar'}
          </Button>
        </form>
      </div>

      <SearchResults results={results} />
    </main>
  );
}