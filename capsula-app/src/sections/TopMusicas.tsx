import { useCapsula } from '../data/CapsulaContext'
import { RankRow } from '../components/RankRow'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'

// 3 · TOP 5 MÚSICAS — revela 01–05 uma a uma.
export function TopMusicas() {
  const capsula = useCapsula()
  return (
    <Section label="03 — As 5 músicas">
      <Reveal>
        <p className="cap-eyebrow">// as 5 músicas</p>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.01em]">
          As músicas que <span className="italic">tocaram</span> a faculdade.
        </h2>
      </Reveal>
      <div className="mt-12 w-full">
        {capsula.topTracks.map((t, i) => (
          <Reveal key={t.title} delay={200 + i * 110}>
            <RankRow rank={t.rank} title={t.title} subtitle={t.artist} active={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
