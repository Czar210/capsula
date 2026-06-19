import { REDIRECT_URI, SPOTIFY_CLIENT_ID, SPOTIFY_SCOPES, isSpotifyConfigured } from '../env'
import { challengeFromVerifier, generateVerifier, randomState } from './pkce'
import { clearTokens, currentAccess, getRefreshToken, hasSession, setTokens } from './tokenStore'

const AUTH_URL = 'https://accounts.spotify.com/authorize'
const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const VERIFIER_KEY = 'capsula.pkce.verifier'
const STATE_KEY = 'capsula.pkce.state'

export { isSpotifyConfigured, hasSession }

interface TokenResponse {
  access_token: string
  expires_in: number
  refresh_token?: string
}

// Inicia o login: gera verifier+state, persiste em sessionStorage (sobrevive ao
// redirect de página inteira) e manda pro /authorize do Spotify.
export async function startLogin(): Promise<void> {
  if (!isSpotifyConfigured()) {
    throw new Error('Spotify Client ID não configurado (defina VITE_SPOTIFY_CLIENT_ID).')
  }
  const verifier = generateVerifier()
  const state = randomState()
  sessionStorage.setItem(VERIFIER_KEY, verifier)
  sessionStorage.setItem(STATE_KEY, state)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: await challengeFromVerifier(verifier),
    state,
    scope: SPOTIFY_SCOPES,
  })
  window.location.assign(`${AUTH_URL}?${params.toString()}`)
}

function cleanUrl(): void {
  const target = REDIRECT_URI || window.location.origin + window.location.pathname
  window.history.replaceState({}, '', target)
}

// Roda no boot (sem router): se há ?code, troca por token; sempre limpa a URL
// pra um reload não re-trocar um code já usado (single-use → invalid_grant).
export async function handleRedirectCallback(): Promise<{ loggedIn: boolean; error?: string }> {
  const params = new URLSearchParams(window.location.search)
  const error = params.get('error')
  const code = params.get('code')
  const returnedState = params.get('state')
  if (!code && !error) return { loggedIn: false }

  const verifier = sessionStorage.getItem(VERIFIER_KEY)
  const storedState = sessionStorage.getItem(STATE_KEY)
  sessionStorage.removeItem(VERIFIER_KEY)
  sessionStorage.removeItem(STATE_KEY)

  if (error) {
    cleanUrl()
    return { loggedIn: false, error }
  }
  if (!verifier || !returnedState || returnedState !== storedState) {
    cleanUrl()
    return { loggedIn: false, error: 'state_mismatch' }
  }

  try {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code as string,
      redirect_uri: REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      code_verifier: verifier,
    })
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    if (!res.ok) throw new Error(`token ${res.status}`)
    const json = (await res.json()) as TokenResponse
    setTokens(json.access_token, json.expires_in, json.refresh_token)
    cleanUrl()
    return { loggedIn: true }
  } catch (e) {
    cleanUrl()
    return { loggedIn: false, error: e instanceof Error ? e.message : 'token_exchange_failed' }
  }
}

async function refresh(): Promise<boolean> {
  const refreshToken = getRefreshToken()
  if (!refreshToken || !isSpotifyConfigured()) return false
  try {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: SPOTIFY_CLIENT_ID,
    })
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    if (!res.ok) throw new Error(`refresh ${res.status}`)
    const json = (await res.json()) as TokenResponse
    setTokens(json.access_token, json.expires_in, json.refresh_token)
    return true
  } catch {
    // invalid_grant (refresh expirado ~6 meses) → descartar e re-logar do zero
    clearTokens()
    return false
  }
}

export async function getValidToken(): Promise<string | null> {
  const { token, expiresAt } = currentAccess()
  if (token && Date.now() < expiresAt - 30_000) return token
  const ok = await refresh()
  return ok ? currentAccess().token : null
}

export function logout(): void {
  clearTokens()
}
