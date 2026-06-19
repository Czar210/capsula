import { useCapsula } from '../data/CapsulaContext'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'

// 5 · GÊNEROS — "sua paleta sonora": gêneros como palavras grandes em Fraunces,
// tamanho e opacidade variando pelo peso. Só o 1º (maior) é verde.
export function Generos() {
  const capsula = useCapsula()

  // Sem gêneros (a API do Spotify descontinuou o campo por artista em 2026):
  // estado honesto em vez de inventar. No demo/mock, genres vem preenchido.
  if (capsula.genres.length === 0) {
    return (
      <Section label="05 — Os gêneros">
        <Reveal>
          <p className="cap-eyebrow">// sua paleta sonora</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-medium italic leading-[1.1] tracking-[-0.01em]">
            Sua paleta ficou em segredo.
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-[44ch] font-mono text-[0.875rem] leading-relaxed text-faint">
            O Spotify parou de informar os gêneros por artista (descontinuado em 2026), então
            não dá pra montar a paleta a partir da API.
          </p>
        </Reveal>
      </Section>
    )
  }

  return (
    <Section label="05 — Os gêneros">
      <Reveal>
        <p className="cap-eyebrow">// sua paleta sonora</p>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-4 max-w-[34ch] font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-[1.3] text-muted">
          Sua paleta sonora — os tons que se misturaram nesses anos.
        </h2>
      </Reveal>
      <div className="mt-16 flex flex-wrap items-baseline gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-[clamp(0.5rem,2vw,1.5rem)]">
        {capsula.genres.map((g, i) => {
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
