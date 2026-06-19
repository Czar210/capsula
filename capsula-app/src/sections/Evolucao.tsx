import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useCapsula } from '../data/CapsulaContext'
import type { Year } from '../types'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { UploadHistoryButton } from '../components/UploadHistoryButton'
import { YearTabs } from '../components/YearTabs'

function YearCell({
  kicker,
  value,
  italic = false,
  tag = false,
}: {
  kicker: string
  value: string
  italic?: boolean
  tag?: boolean
}) {
  return (
    <div>
      <p className="cap-eyebrow">{kicker}</p>
      {tag ? (
        <span
          className="mt-3 inline-flex rounded-full px-4 py-2 font-mono text-[0.9rem] text-accent"
          style={{ border: '1px solid var(--ring-faint)', background: 'var(--accent-tint)' }}
        >
          {value}
        </span>
      ) : (
        <h3
          className={
            'mt-3 font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.01em] text-ink' +
            (italic ? ' italic' : '')
          }
        >
          {value}
        </h3>
      )}
    </div>
  )
}

// 7 · A EVOLUÇÃO — corte por ano NÃO existe na API ao vivo. No modo login,
// estado honesto + CTA pra subir o histórico (que destrava a evolução real).
export function Evolucao() {
  const capsula = useCapsula()
  const years = capsula.evolution
  // hook sempre chamado (antes de qualquer return) p/ não violar regras de hooks
  const [active, setActive] = useState<Year>('2023')
  const d = years.find((y) => y.year === active) ?? years[0]

  if (capsula.meta?.estimated.evolution) {
    return (
      <Section label="07 — A evolução">
        <Reveal>
          <p className="cap-eyebrow">// como meu gosto mudou</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2.25rem,5vw,4rem)] font-medium italic leading-[1.05] tracking-[-0.01em]">
            Sua linha do tempo precisa do histórico.
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-[46ch] font-mono text-[0.875rem] leading-relaxed text-faint">
            A evolução ano a ano (2023 – 2026) não existe na API ao vivo do Spotify. Suba seu
            “Extended streaming history” pra montar a sua.
          </p>
        </Reveal>
        <Reveal delay={360} className="mt-8">
          <UploadHistoryButton />
        </Reveal>
      </Section>
    )
  }

  return (
    <Section label="07 — A evolução">
      <Reveal>
        <p className="cap-eyebrow">// como meu gosto mudou</p>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.01em]">
          Como meu gosto <span className="italic text-accent">mudou</span>.
        </h2>
      </Reveal>
      <Reveal delay={200} className="mt-12">
        <YearTabs years={years.map((y) => y.year)} value={active} onChange={setActive} />
      </Reveal>
      <div className="mt-12 w-full min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-10 sm:grid-cols-3"
          >
            <YearCell kicker="música #1" value={d.topTrack} italic />
            <YearCell kicker="artista #1" value={d.topArtist} italic />
            <YearCell kicker="gênero dominante" value={d.topGenre} tag />
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
