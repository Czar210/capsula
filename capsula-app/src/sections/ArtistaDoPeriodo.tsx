import { useCapsula } from '../data/CapsulaContext'
import { Reveal } from '../components/Reveal'
import { Ring } from '../components/Ring'
import { Section } from '../components/Section'

// 2 · O ARTISTA DO PERÍODO — rótulo verde, nome grande em Fraunces itálico,
// anel verde como motivo. As "horas" só existem com o histórico (GDPR); no modo
// login mostramos um fato REAL ("o nº 1 de todos os tempos") em vez de número falso.
export function ArtistaDoPeriodo() {
  const capsula = useCapsula()
  const { name, hours } = capsula.artistOfPeriod
  const estimated = capsula.meta?.estimated.hours

  return (
    <Section label="02 — Artista do período">
      <Ring
        size={460}
        count={2}
        className="absolute right-[-4rem] top-1/2 -translate-y-1/2 opacity-90"
      />
      <Reveal>
        <p className="cap-eyebrow text-accent">// o artista do período</p>
      </Reveal>
      <Reveal delay={140}>
        <h2 className="relative mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold italic leading-none tracking-[-0.02em]">
          {name}
        </h2>
      </Reveal>
      <Reveal delay={280} className="mt-12">
        <p className="cap-num text-[0.95rem] uppercase tracking-[0.14em] text-muted">
          {estimated ? 'o nº 1 de todos os tempos' : `${hours} horas ouvidas`}
        </p>
      </Reveal>
    </Section>
  )
}
