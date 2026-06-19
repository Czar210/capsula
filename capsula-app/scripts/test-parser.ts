// Teste do parser GDPR rodado com type-stripping do Node:
//   node --experimental-strip-types scripts/test-parser.ts
import assert from 'node:assert'
import { aggregateFiles } from '../src/lib/gdpr/parser.ts'

const T = (ts: string, ms: number, title: string | null, artist: string | null, uri: string | null) => ({
  ts,
  ms_played: ms,
  master_metadata_track_name: title,
  master_metadata_album_artist_name: artist,
  spotify_track_uri: uri,
})

const file2024 = JSON.stringify([
  T('2024-03-01T10:00:00Z', 200_000, 'Redbone', 'Childish Gambino', 'spotify:track:a'),
  T('2024-03-01T10:05:00Z', 200_000, 'Redbone', 'Childish Gambino', 'spotify:track:a'),
  T('2024-06-15T22:00:00Z', 240_000, 'Está Escrito', 'Los Hermanos', 'spotify:track:b'),
  T('2024-06-15T22:05:00Z', 5_000, 'Skip', 'Whoever', 'spotify:track:c'), // <30s: só minutos+dia
  T('2024-07-01T09:00:00Z', 100_000, null, null, null), // podcast: só minutos
])
const file2025 = JSON.stringify([
  T('2025-01-10T12:00:00Z', 300_000, 'Motion Sickness', 'Phoebe Bridgers', 'spotify:track:d'),
  T('2025-01-11T12:00:00Z', 300_000, 'Motion Sickness', 'Phoebe Bridgers', 'spotify:track:d'),
])

const agg = aggregateFiles([file2024, file2025])
console.log(JSON.stringify(agg, null, 2))

assert.equal(agg.totalMs, 200_000 * 2 + 240_000 + 5_000 + 100_000 + 300_000 * 2, 'totalMs')
assert.equal(agg.distinctTracks, 3, 'distinctTracks (Skip<30s e podcast fora)')
assert.equal(agg.distinctArtists, 3, 'distinctArtists')
assert.equal(agg.distinctDays, 4, 'distinctDays (podcast sem uri não conta dia)')
assert.equal(agg.topTracks[0].title, 'Motion Sickness', 'top track geral (600k)')
assert.equal(agg.byYear['2024'].topTrack, 'Redbone', '2024 topTrack')
assert.equal(agg.byYear['2024'].topArtist, 'Childish Gambino', '2024 topArtist')
assert.equal(agg.byYear['2025'].topTrack, 'Motion Sickness', '2025 topTrack')
assert.deepEqual(agg.years, ['2024', '2025'], 'years')

console.log('\n✅ OK — parser GDPR correto')
