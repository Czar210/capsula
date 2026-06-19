import { Reveal } from '../components/Reveal'
import { Ring } from '../components/Ring'
import { Section } from '../components/Section'

function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
        role pra baixo
      </span>
      <span className="cap-scroll-cue font-mono text-xl leading-none text-accent">↓</span>
    </div>
  )
}

// 1 · ABERTURA — assinatura "2023 — 2026" gigante (o travessão verde itálico),
// a pergunta de abertura, anel verde atrás e o indicador de scroll.
export function Abertura() {
  return (
    <Section center label="01 — Abertura">
      <Ring
        size={680}
        count={3}
        glow
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ maxWidth: '92vw', maxHeight: '92vw' }}
      />
      <Reveal className="relative">
        <h1 className="font-display text-[clamp(4.5rem,14vw,13rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
          2023 <span className="italic text-accent">—</span> 2026
        </h1>
        <p className="mx-auto mt-9 max-w-[22ch] font-display text-[clamp(1.5rem,4vw,2.5rem)] italic leading-[1.25] text-ink">
          Foram 4 anos. Vamos ouvir de novo?
        </p>
      </Reveal>
      <Reveal delay={500} className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <ScrollCue />
      </Reveal>
    </Section>
  )
}
