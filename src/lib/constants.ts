/**
 * Constantes de configuración de la aplicación
 */

export const APP_CONFIG = {
  name: 'Music Data Explorer',
  description: 'Análisis de datos musicales con Spotify API',
  version: '1.0.0',
} as const;

export const SPOTIFY_CONFIG = {
  searchLimit: 5,
  topTracksLimit: 10,
  region: 'US',
} as const;

export const CHART_CONFIG = {
  outlierThreshold: 1.8,
  outlierLimit: 3,
  radarAttributes: [
    'danceability',
    'energy',
    'valence',
    'acousticness',
    'liveness',
    'instrumentalness',
  ],
} as const;

export const COLORS = {
  primary: '#22c55e', // green-500
  secondary: '#eab308', // yellow-500
  accent: '#c084fc', // purple-400
  danger: '#ef4444', // red-500
  background: '#0a0a0a',
  card: '#171717',
  border: '#262626',
} as const;
