import { useCapsula } from '../data/CapsulaContext'
import { RankRow } from '../components/RankRow'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'

// 4 · TOP 5 ARTISTAS — mesmo padrão de lista.
export function TopArtistas() {
  const capsula = useCapsula()
  return (
    <Section label="04 — Os 5 artistas">
      <Reveal>
        <p className="cap-eyebrow">// os 5 artistas</p>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.01em]">
          As vozes que mais <span className="italic">voltaram</span>.
        </h2>
      </Reveal>
      <div className="mt-12 w-full">
        {capsula.topArtists.map((a, i) => (
          <Reveal key={a.name} delay={200 + i * 110}>
            <RankRow rank={a.rank} title={a.name} active={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
