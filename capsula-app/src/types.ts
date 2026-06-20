// Shapes do domínio Cápsula. Modelados próximos das respostas da Spotify Web API
// (top tracks/artists) para a troca futura do mock pelo plugue real ser trivial.

export type Year = '2023' | '2024' | '2025' | '2026'

export interface Track {
  rank: number
  title: string
  artist: string
}

export interface Artist {
  rank: number
  name: string
}

export interface Genre {
  name: string
  /** peso relativo 0–1 — controla tamanho/opacidade na cena de gêneros */
  weight: number
  italic?: boolean
}

export interface YearSnapshot {
  year: Year
  topTrack: string
  topArtist: string
  topGenre: string
}

export interface Totals {
  /** minutos em fones de ouvido — o número herói */
  minutes: number
  tracks: number
  artists: number
  days: number
}

export interface ArtistOfPeriod {
  name: string
  hours: number
}

export interface PosterData {
  artist: string
  minutes: number
  genres: string[]
}

export type CapsulaSource = 'mock' | 'live' | 'gdpr' | 'live+gdpr'

export interface CapsulaMeta {
  source: CapsulaSource
  /** rótulo da janela de tempo: "2023 — 2026" (demo) ou "all-time" (live) */
  rangeLabel: string
  /** campos que NÃO são reais (a API ao vivo não dá minutos/dias/per-ano) */
  estimated: { hours: boolean; totals: boolean; evolution: boolean }
}

export interface CapsulaData {
  period: { from: number; to: number }
  artistOfPeriod: ArtistOfPeriod
  topTracks: Track[]
  topArtists: Artist[]
  genres: Genre[]
  totals: Totals
  evolution: YearSnapshot[]
  poster: PosterData
  /** nome de exibição do Spotify (só quando logado) */
  user?: { name: string }
  meta?: CapsulaMeta
}
