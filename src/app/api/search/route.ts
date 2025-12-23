import { getSpotifyClient } from '@/src/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q'); // Obtenemos lo que escribió el usuario

  if (!query) {
    return NextResponse.json({ error: 'Falta el término de búsqueda' }, { status: 400 });
  }

  try {
    const client = await getSpotifyClient();
    
    // Buscamos artistas (límite 5 para no saturar)
    const data = await client.searchArtists(query, { limit: 5 });
    const artists = data.body.artists?.items || [];

    // Limpiamos la data para enviar solo lo necesario al frontend
    const cleanArtists = artists.map(artist => ({
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url || null, // La imagen principal
      followers: artist.followers.total,
      genres: artist.genres.slice(0, 3) // Solo los 3 géneros principales
    }));

    return NextResponse.json({ artists: cleanArtists });

  } catch (error) {
    console.error('Error buscando artista:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}