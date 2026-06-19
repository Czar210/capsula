import { getValidToken } from '../../lib/auth/auth'

const API = 'https://api.spotify.com/v1'

// GET autenticado: injeta o Bearer, trata 401 (sessão morta) e 429 (respeita Retry-After).
export async function apiGet<T>(path: string): Promise<T> {
  const token = await getValidToken()
  if (!token) throw new Error('not-authenticated')

  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 401) throw new Error('unauthorized')
  if (res.status === 429) {
    const retry = Number(res.headers.get('Retry-After') ?? '1')
    await new Promise((r) => setTimeout(r, (retry + 0.5) * 1000))
    return apiGet<T>(path)
  }
  if (!res.ok) throw new Error(`spotify ${res.status}`)
  return (await res.json()) as T
}
