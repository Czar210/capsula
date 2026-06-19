// Parser PURO (sem DOM) do export "Extended Streaming History" do Spotify —
// testável isoladamente. Faz fold das linhas em Maps e nunca retém os arrays crus.
// Título/artista ficam no VALOR do Map (nunca dependemos de split de chave).

export interface StreamRow {
  ts: string // ISO "2024-03-12T20:11:05Z"
  ms_played: number
  master_metadata_track_name: string | null
  master_metadata_album_artist_name: string | null
  spotify_track_uri: string | null // null = podcast/local → ignorar
}

export interface GdprAggregate {
  totalMs: number
  distinctTracks: number
  distinctArtists: number
  distinctDays: number
  topTracks: { title: string; artist: string; ms: number }[]
  topArtists: { name: string; ms: number }[]
  byYear: Record<string, { topTrack: string; topArtist: string }>
  years: string[]
}

const MIN_MS = 30_000 // ≥30s conta como "ouvida" para os tops
const SEP = String.fromCharCode(31) // unit separator: só p/ chave única, nunca exibido

interface TrackAgg {
  title: string
  artist: string
  ms: number
}

export interface Accumulator {
  totalMs: number
  trackMs: Map<string, TrackAgg>
  artistMs: Map<string, number>
  days: Set<string>
  yearTracks: Map<string, Map<string, TrackAgg>>
  yearArtists: Map<string, Map<string, number>>
}

export function createAccumulator(): Accumulator {
  return {
    totalMs: 0,
    trackMs: new Map(),
    artistMs: new Map(),
    days: new Set(),
    yearTracks: new Map(),
    yearArtists: new Map(),
  }
}

function bumpArtist(map: Map<string, number>, key: string, by: number): void {
  map.set(key, (map.get(key) ?? 0) + by)
}

function bumpTrack(
  map: Map<string, TrackAgg>,
  key: string,
  title: string,
  artist: string,
  by: number,
): void {
  const cur = map.get(key)
  if (cur) cur.ms += by
  else map.set(key, { title, artist, ms: by })
}

function nestedTrack(
  outer: Map<string, Map<string, TrackAgg>>,
  year: string,
): Map<string, TrackAgg> {
  let inner = outer.get(year)
  if (!inner) {
    inner = new Map()
    outer.set(year, inner)
  }
  return inner
}

function nestedArtist(
  outer: Map<string, Map<string, number>>,
  year: string,
): Map<string, number> {
  let inner = outer.get(year)
  if (!inner) {
    inner = new Map()
    outer.set(year, inner)
  }
  return inner
}

export function foldRows(acc: Accumulator, rows: StreamRow[]): void {
  for (const r of rows) {
    const ms = r.ms_played ?? 0
    acc.totalMs += ms // minutos totais incluem tudo que tocou
    if (!r.spotify_track_uri) continue // pular podcasts/local
    const title = r.master_metadata_track_name
    const artist = r.master_metadata_album_artist_name
    if (!title || !artist) continue
    if (typeof r.ts !== 'string' || r.ts.length < 10) continue

    acc.days.add(r.ts.slice(0, 10))
    if (ms < MIN_MS) continue

    const year = r.ts.slice(0, 4)
    const key = title + SEP + artist
    bumpTrack(acc.trackMs, key, title, artist, ms)
    bumpArtist(acc.artistMs, artist, ms)
    bumpTrack(nestedTrack(acc.yearTracks, year), key, title, artist, ms)
    bumpArtist(nestedArtist(acc.yearArtists, year), artist, ms)
  }
}

function maxTrack(map: Map<string, TrackAgg>): TrackAgg | null {
  let best: TrackAgg | null = null
  for (const v of map.values()) if (!best || v.ms > best.ms) best = v
  return best
}

function maxArtist(map: Map<string, number>): string | null {
  let best: string | null = null
  let bestVal = -1
  for (const [k, v] of map) {
    if (v > bestVal) {
      best = k
      bestVal = v
    }
  }
  return best
}

export function finalize(acc: Accumulator): GdprAggregate {
  const tracks = [...acc.trackMs.values()].sort((a, b) => b.ms - a.ms)
  const artists = [...acc.artistMs.entries()].sort((a, b) => b[1] - a[1])

  const byYear: GdprAggregate['byYear'] = {}
  for (const [year, yearTracks] of acc.yearTracks) {
    const t = maxTrack(yearTracks)
    const yearArtists = acc.yearArtists.get(year)
    byYear[year] = {
      topTrack: t?.title ?? '—',
      topArtist: (yearArtists && maxArtist(yearArtists)) || '—',
    }
  }

  return {
    totalMs: acc.totalMs,
    distinctTracks: acc.trackMs.size,
    distinctArtists: acc.artistMs.size,
    distinctDays: acc.days.size,
    topTracks: tracks.slice(0, 5).map((t) => ({ title: t.title, artist: t.artist, ms: t.ms })),
    topArtists: artists.slice(0, 5).map(([name, ms]) => ({ name, ms })),
    byYear,
    years: [...acc.yearTracks.keys()].sort(),
  }
}

// Conveniência p/ testes e uso direto (não-worker).
export function aggregateFiles(fileContents: string[]): GdprAggregate {
  const acc = createAccumulator()
  for (const text of fileContents) {
    const rows = JSON.parse(text) as StreamRow[]
    if (Array.isArray(rows)) foldRows(acc, rows)
  }
  return finalize(acc)
}
