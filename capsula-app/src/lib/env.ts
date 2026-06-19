// Config do Spotify. O CLIENT_ID vem de VITE_SPOTIFY_CLIENT_ID (.env). Sem ele,
// o login fica desabilitado, mas o resto (demo + upload GDPR) funciona normal.
export const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID ?? ''

// Precisa ser BYTE-idêntico ao registrado no dashboard. Dev = http://127.0.0.1:5173/
// (nunca "localhost"). Prod = a URL HTTPS da Vercel.
export const REDIRECT_URI =
  import.meta.env.VITE_SPOTIFY_REDIRECT_URI ??
  (typeof window !== 'undefined' ? `${window.location.origin}/` : '')

// Só o escopo necessário (top tracks/artists).
export const SPOTIFY_SCOPES = 'user-top-read'

export function isSpotifyConfigured(): boolean {
  return SPOTIFY_CLIENT_ID.length > 0
}
