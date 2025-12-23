import SpotifyWebApi from 'spotify-web-api-node';

// Inicializamos el cliente con las variables de entorno
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

/**
 * Esta función obtiene un Access Token válido usando el flujo "Client Credentials".
 * Úsala en tus API Routes antes de hacer cualquier consulta.
 */
export const getSpotifyClient = async () => {
  try {
    // Verificar que las credenciales existan
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      console.error('❌ Missing Spotify credentials');
      console.error('CLIENT_ID:', process.env.SPOTIFY_CLIENT_ID ? '✓ Set' : '✗ Missing');
      console.error('CLIENT_SECRET:', process.env.SPOTIFY_CLIENT_SECRET ? '✓ Set' : '✗ Missing');
      throw new Error('Missing Spotify credentials in environment variables');
    }

    console.log('🔑 Requesting Spotify access token...');
    // Solicitamos un token de acceso
    const data = await spotifyApi.clientCredentialsGrant();
    const accessToken = data.body['access_token'];

    // Configuramos el cliente con el token
    spotifyApi.setAccessToken(accessToken);
    console.log('✅ Spotify access token obtained');

    return spotifyApi;
  } catch (error) {
    console.error('Error al autenticar con Spotify:', error);
    throw new Error('Fallo en la autenticación con Spotify');
  }
};

export default spotifyApi;