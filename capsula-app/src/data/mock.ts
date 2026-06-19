import type { CapsulaData } from '../types'

// ============================================================
// FONTE ÚNICA dos dados (FICTÍCIOS). Trocar este arquivo pelo retorno real
// da Spotify (com auth PKCE) no futuro. Per-ano é mock — a Web API ao vivo
// não dá corte por ano (só short/medium/long_term).
// ============================================================
export const capsula: CapsulaData = {
  period: { from: 2023, to: 2026 },

  artistOfPeriod: {
    name: 'Tame Impala',
    hours: 327,
  },

  // Seção 3 — top 5 músicas (ordem do brief)
  topTracks: [
    { rank: 1, title: 'The Less I Know The Better', artist: 'Tame Impala' },
    { rank: 2, title: 'Redbone', artist: 'Childish Gambino' },
    { rank: 3, title: 'Tongues', artist: 'Joods' },
    { rank: 4, title: 'Motion Sickness', artist: 'Phoebe Bridgers' },
    { rank: 5, title: 'Está Escrito', artist: 'Los Hermanos' },
  ],

  // Seção 4 — top 5 artistas
  topArtists: [
    { rank: 1, name: 'Tame Impala' },
    { rank: 2, name: 'Childish Gambino' },
    { rank: 3, name: 'Phoebe Bridgers' },
    { rank: 4, name: 'Mac DeMarco' },
    { rank: 5, name: 'Los Hermanos' },
  ],

  // Seção 5 — paleta sonora (peso controla tamanho/opacidade)
  genres: [
    { name: 'indie', weight: 1.0 },
    { name: 'psicodelia', weight: 0.92, italic: true },
    { name: 'mpb', weight: 0.82 },
    { name: 'shoegaze', weight: 0.5, italic: true },
    { name: 'soul', weight: 0.64 },
  ],

  // Seção 6 — os totais
  totals: {
    minutes: 84207,
    tracks: 1284,
    artists: 312,
    days: 58,
  },

  // Seção 7 — evolução (distinta por ano)
  evolution: [
    { year: '2023', topTrack: 'Está Escrito', topArtist: 'Los Hermanos', topGenre: 'mpb' },
    { year: '2024', topTrack: 'Redbone', topArtist: 'Childish Gambino', topGenre: 'soul' },
    { year: '2025', topTrack: 'Motion Sickness', topArtist: 'Phoebe Bridgers', topGenre: 'indie' },
    { year: '2026', topTrack: 'The Less I Know The Better', topArtist: 'Tame Impala', topGenre: 'psicodelia' },
  ],

  // Seção 8 — síntese do cartaz
  poster: {
    artist: 'Tame Impala',
    minutes: 84207,
    genres: ['indie', 'psicodelia', 'mpb'],
  },

  // Demo: apresentado como a "verdade" da demonstração (não marcado estimativa).
  meta: {
    source: 'mock',
    rangeLabel: '2023 — 2026',
    estimated: { hours: false, totals: false, evolution: false },
  },
}
