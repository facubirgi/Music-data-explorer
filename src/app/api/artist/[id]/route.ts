import { getSpotifyClient } from '@/src/lib/spotify';
import { NextResponse } from 'next/server';

const generateStableFeature = (input: string, factor: number) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash * factor) % 1000) / 1000;
};

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const client = await getSpotifyClient();

    const artistData = await client.getArtist(params.id);
    const topTracksData = await client.getArtistTopTracks(params.id, 'US');
    const tracks = topTracksData.body.tracks;

    if (!tracks.length) return NextResponse.json({ error: 'No tracks' }, { status: 404 });

    // Intentamos obtener features reales, si falla (403), generamos un perfil completo
    const trackIds = tracks.map((t) => t.id);
    let features: any[] = [];

    try {
      const featuresData = await client.getAudioFeaturesForTracks(trackIds);
      features = featuresData.body.audio_features;
    } catch (error) {
      console.warn('⚠️ Usando simulación avanzada de datos.');
      features = tracks.map((t) => ({
        valence: generateStableFeature(t.id, 1),
        energy: generateStableFeature(t.id, 2),
        danceability: generateStableFeature(t.id, 3),
        tempo: 80 + (generateStableFeature(t.id, 4) * 100),
        acousticness: generateStableFeature(t.id, 5),     // NUEVO
        instrumentalness: generateStableFeature(t.id, 6), // NUEVO
        liveness: generateStableFeature(t.id, 7),         // NUEVO
      }));
    }

    const analyzedTracks = tracks.map((track, index) => {
      const feature = features[index] || {};
      return {
        id: track.id,
        name: track.name,
        album: track.album.name,
        image: track.album.images[0]?.url,
        release_date: track.album.release_date,
        popularity: track.popularity,
        duration_ms: track.duration_ms,
        // Features completos
        valence: feature.valence ?? 0.5,
        energy: feature.energy ?? 0.5,
        tempo: feature.tempo ?? 120,
        danceability: feature.danceability ?? 0.5,
        acousticness: feature.acousticness ?? 0.1,         // NUEVO
        instrumentalness: feature.instrumentalness ?? 0.0, // NUEVO
        liveness: feature.liveness ?? 0.2,                 // NUEVO
      };
    });

    return NextResponse.json({
      artist: artistData.body,
      tracks: analyzedTracks,
    });

  } catch (error: any) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}