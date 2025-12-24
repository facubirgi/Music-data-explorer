import { useRouter } from 'next/navigation';
import type { Artist } from '@/src/types';
import { formatNumber } from '@/src/lib/utils';
import { Card } from '@/src/components/ui/Card';

interface SearchResultsProps {
  results: Artist[];
}

export function SearchResults({ results }: SearchResultsProps) {
  const router = useRouter();

  if (results.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      {results.map((artist) => (
        <Card
          key={artist.id}
          onClick={() => router.push(`/artist/${artist.id}`)}
          className="flex items-center gap-4 cursor-pointer group hover:scale-[1.02] transition-all"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-800 shrink-0 border-2 border-transparent group-hover:border-green-500 transition-colors">
            {artist.images?.[0]?.url ? (
              <img 
                src={artist.images[0].url} 
                alt={artist.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600 font-bold text-2xl">
                {artist.name[0]}
              </div>
            )}
          </div>
          
          <div className="overflow-hidden flex-1">
            <h3 className="font-bold text-lg text-white truncate group-hover:text-green-400 transition-colors">
              {artist.name}
            </h3>
            <p className="text-sm text-neutral-400 truncate">
              {artist.genres.slice(0, 2).join(', ')}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {formatNumber(artist.followers.total)} seguidores
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
