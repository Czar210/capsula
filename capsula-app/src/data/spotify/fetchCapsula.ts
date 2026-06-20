import type { Artist, CapsulaData, Genre, Track } from '../../types'
import { capsula as mock } from '../mock'
import { apiGet } from './client'

interface SpTrack {
  name: string
  artists: { name: string }[]
}
interface SpArtist {
  name: string
  genres: string[]
}
interface TopResp<T> {
  items: T[]
}
interface SpUser {
  display_name: string | null
  id: string
}

// Monta o MESMO CapsulaData a partir dos endpoints reais. O que a API ao vivo
// NÃO dá (minutos/dias/distintos, per-ano) fica como estimativa (vinda do mock)
// e marcado em meta.estimated — destravado depois pelo upload GDPR.
export async function buildCapsulaFromApi(): Promise<CapsulaData> {
  const [tracksResp, artistsResp, artists50, me] = await Promise.all([
    apiGet<TopResp<SpTrack>>('/me/top/tracks?limit=5&time_range=long_term'),
    apiGet<TopResp<SpArtist>>('/me/top/artists?limit=5&time_range=long_term'),
    apiGet<TopResp<SpArtist>>('/me/top/artists?limit=50&time_range=long_term'),
    apiGet<SpUser>('/me').catch(() => null), // perfil é opcional: falha não quebra a retrospectiva
  ])
  const userName = me?.display_name || me?.id || 'você'

  const topTracks: Track[] = tracksResp.items.map((t, i) => ({
    rank: i + 1,
    title: t.name,
    artist: t.artists[0]?.name ?? '—',
  }))
  const topArtists: Artist[] = artistsResp.items.map((a, i) => ({ rank: i + 1, name: a.name }))

  // Gêneros vêm dos ARTISTAS (tracks nunca tiveram gênero). Agrega ~50 e rankeia.
  const counts = new Map<string, number>()
  for (const a of artists50.items) {
    for (const g of a.genres ?? []) counts.set(g, (counts.get(g) ?? 0) + 1)
  }
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
  const maxCount = ranked[0]?.[1] ?? 1
  // NÃO cair no mock: se a API não devolveu gêneros (campo deprecated em 2026),
  // deixar vazio — a cena de gêneros mostra um estado honesto em vez de dado falso.
  const genres: Genre[] = ranked.map(([name, c], i) => ({
    name,
    weight: Math.max(0.4, c / maxCount),
    italic: i % 2 === 1,
  }))

  const artistName = topArtists[0]?.name ?? mock.artistOfPeriod.name

  return {
    period: mock.period,
    artistOfPeriod: { name: artistName, hours: mock.artistOfPeriod.hours }, // hours = estimativa
    topTracks: topTracks.length ? topTracks : mock.topTracks,
    topArtists: topArtists.length ? topArtists : mock.topArtists,
    genres, // [] quando a API não dá gêneros
    totals: mock.totals, // estimativa (live não tem minutos/dias/distintos)
    evolution: mock.evolution, // estimativa (live não tem corte por ano)
    poster: {
      artist: artistName,
      minutes: mock.totals.minutes,
      genres: genres.slice(0, 3).map((g) => g.name),
    },
    user: { name: userName },
    meta: {
      source: 'live',
      rangeLabel: 'all-time',
      estimated: { hours: true, totals: true, evolution: true },
    },
  }
}
