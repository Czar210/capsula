import { useCapsula } from '../data/CapsulaContext'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'

// 5 · "SUA PALETA SONORA" — palavras grandes em Fraunces, tamanho/opacidade
// pelo peso. Só o 1º (maior) é verde.
// Os gêneros do Spotify viraram deprecated/vazios em 2026; quando não há gêneros,
// a paleta usa os TOP ARTISTAS (dado real) como as palavras.
export function Generos() {
  const capsula = useCapsula()
  const hasGenres = capsula.genres.length > 0

  const palette = hasGenres
    ? capsula.genres
    : capsula.topArtists.map((a, i) => ({
        name: a.name,
        weight: Math.max(0.4, 1 - i * 0.16),
        italic: i % 2 === 1,
      }))

  const subtitle = hasGenres
    ? 'Os tons que se misturaram nesses anos.'
    : 'As vozes que pintaram esses anos.'

  return (
    <Section label="05 — Os gêneros">
      <Reveal>
        <p className="cap-eyebrow">// sua paleta sonora</p>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-4 max-w-[34ch] font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-[1.3] text-muted">
          {subtitle}
        </h2>
      </Reveal>
      <div className="mt-16 flex flex-wrap items-baseline gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-[clamp(0.5rem,2vw,1.5rem)]">
        {palette.map((g, i) => {
          const min = 2 + g.weight * 2
          const mid = 5 + g.weight * 9
          const max = 3 + g.weight * 8
          return (
            <Reveal key={g.name} delay={i * 130}>
              <span
                className="inline-block font-display leading-[0.95] tracking-[-0.02em]"
                style={{
                  fontSize: `clamp(${min}rem, ${mid}vw, ${max}rem)`,
                  fontStyle: g.italic ? 'italic' : 'normal',
                  fontWeight: i === 0 ? 600 : 500,
                  opacity: 0.45 + g.weight * 0.55,
                  color: i === 0 ? 'var(--accent)' : 'var(--text-primary)',
                }}
              >
                {g.name}
              </span>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
