import { getSpotifyClient } from '@/src/lib/spotify';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  // 1. Obtener lo que el usuario escribió (?q=Soda)
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Falta el término de búsqueda' }, { status: 400 });
  }

  try {
    // 2. Conectarse a Spotify
    const client = await getSpotifyClient();

    // 3. Buscar Artistas (limitamos a 6 para que se vea ordenado)
    const data = await client.searchArtists(query, { limit: 6 });

    // 4. Devolver la respuesta al Frontend
    return NextResponse.json(data.body);

  } catch (error) {
    console.error('Error buscando en Spotify:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}