import { getSpotifyClient } from '@/src/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await getSpotifyClient();
    
    // Prueba: Buscar a "Daft Punk"
    const result = await client.searchArtists('Daft Punk');
    const artist = result.body.artists?.items[0];

    return NextResponse.json({ 
      message: '¡Conexión exitosa!', 
      artistName: artist?.name, 
      artistId: artist?.id 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error conectando a Spotify' }, { status: 500 });
  }
}