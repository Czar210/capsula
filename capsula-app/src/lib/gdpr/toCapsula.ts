import type { CapsulaData, Year, YearSnapshot } from '../../types'
import type { GdprAggregate } from './parser'

const YEARS: Year[] = ['2023', '2024', '2025', '2026']

// Mescla os dados REAIS do GDPR sobre uma base (live ou mock), preenchendo
// minutos/dias/distintos e a evolução por ano. Gênero por ano fica da base
// (enriquecimento online por artista é opcional). As cenas não mudam.
export function mergeGdpr(base: CapsulaData, agg: GdprAggregate): CapsulaData {
  const minutes = Math.round(agg.totalMs / 60_000)
  const hours = Math.round(agg.totalMs / 3_600_000)

  const evolution: YearSnapshot[] = YEARS.map((year) => {
    const d = agg.byYear[year]
    const fallback = base.evolution.find((e) => e.year === year)
    return {
      year,
      topTrack: d?.topTrack ?? fallback?.topTrack ?? '—',
      topArtist: d?.topArtist ?? fallback?.topArtist ?? '—',
      topGenre: fallback?.topGenre ?? '—',
    }
  })

  const artistName = agg.topArtists[0]?.name ?? base.artistOfPeriod.name

  return {
    ...base,
    artistOfPeriod: { name: artistName, hours: hours || base.artistOfPeriod.hours },
    topTracks: agg.topTracks.length
      ? agg.topTracks.map((t, i) => ({ rank: i + 1, title: t.title, artist: t.artist }))
      : base.topTracks,
    topArtists: agg.topArtists.length
      ? agg.topArtists.map((a, i) => ({ rank: i + 1, name: a.name }))
      : base.topArtists,
    totals: {
      minutes: minutes || base.totals.minutes,
      tracks: agg.distinctTracks || base.totals.tracks,
      artists: agg.distinctArtists || base.totals.artists,
      days: agg.distinctDays || base.totals.days,
    },
    evolution,
    poster: {
      ...base.poster,
      artist: artistName,
      minutes: minutes || base.poster.minutes,
    },
    meta: {
      source: base.meta?.source === 'live' ? 'live+gdpr' : 'gdpr',
      rangeLabel: base.meta?.rangeLabel ?? '2023 — 2026',
      estimated: { hours: false, totals: false, evolution: false },
    },
  }
}
