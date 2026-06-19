// Modo client-side puro (decisão do projeto): access_token só em MEMÓRIA;
// refresh_token em localStorage (pra sobreviver ao reload). Sem backend.
const REFRESH_KEY = 'capsula.spotify.refresh'

let accessToken: string | null = null
let expiresAt = 0

export function setTokens(access: string, expiresInSec: number, refresh?: string): void {
  accessToken = access
  expiresAt = Date.now() + expiresInSec * 1000
  // Spotify ROTACIONA o refresh_token mas pode omitir: só sobrescreve se vier um novo.
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY)
}

export function currentAccess(): { token: string | null; expiresAt: number } {
  return { token: accessToken, expiresAt }
}

export function clearTokens(): void {
  accessToken = null
  expiresAt = 0
  localStorage.removeItem(REFRESH_KEY)
}

export function hasSession(): boolean {
  return Boolean(accessToken) || Boolean(getRefreshToken())
}
