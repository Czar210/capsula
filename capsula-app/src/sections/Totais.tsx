import { useCapsula } from '../data/CapsulaContext'
import { EstimateTag } from '../components/EstimateTag'
import { formatThousands } from '../lib/format'
import { Reveal } from '../components/Reveal'
import { Ring } from '../components/Ring'
import { Section } from '../components/Section'

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <span className="cap-num text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-none text-ink">
        {value}
      </span>
    </div>
  )
}

// 6 · OS TOTAIS — número herói gigante em verde + métricas menores em mono.
export function Totais() {
  const capsula = useCapsula()
  const { minutes, tracks, artists, days } = capsula.totals
  return (
    <Section center label="06 — Os totais">
      <Ring
        size={760}
        count={3}
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 opacity-70"
        style={{ maxWidth: '96vw', maxHeight: '96vw' }}
      />
      <Reveal className="relative">
        <p className="cap-eyebrow">// os totais</p>
      </Reveal>
      <Reveal delay={120} className="relative mt-6">
        <div className="cap-num text-[clamp(3.5rem,11vw,9rem)] font-medium leading-[0.9] text-accent">
          {formatThousands(minutes)}
        </div>
        <div className="mt-4 font-mono text-[clamp(1rem,2.2vw,1.375rem)] uppercase tracking-[0.14em] text-muted">
          minutos em fones de ouvido
          {capsula.meta?.estimated.totals ? <EstimateTag /> : null}
        </div>
      </Reveal>
      <Reveal
        delay={280}
        className="relative mt-20 flex flex-wrap justify-center gap-[clamp(2rem,6vw,6rem)]"
      >
        <Metric label="faixas distintas" value={formatThousands(tracks)} />
        <Metric label="artistas" value={formatThousands(artists)} />
        <Metric label="dias ouvindo" value={String(days)} />
      </Reveal>
    </Section>
  )
}
