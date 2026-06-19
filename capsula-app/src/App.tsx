import { MotionConfig } from 'motion/react'
import { CapsulaProvider } from './data/CapsulaContext'
import { ConnectBar } from './components/ConnectBar'
import { Footer } from './components/Footer'
import { Grain } from './components/Grain'
import { ScrollProgress } from './components/ScrollProgress'
import { SmoothScroll } from './components/SmoothScroll'
import { Abertura } from './sections/Abertura'
import { ArtistaDoPeriodo } from './sections/ArtistaDoPeriodo'
import { TopMusicas } from './sections/TopMusicas'
import { TopArtistas } from './sections/TopArtistas'
import { Generos } from './sections/Generos'
import { Totais } from './sections/Totais'
import { Evolucao } from './sections/Evolucao'
import { CartazFinal } from './sections/CartazFinal'

function BrandMark() {
  return (
    <div
      className="fixed left-[clamp(16px,3vw,40px)] top-[clamp(16px,3vw,32px)] z-[60] font-mono text-[0.8125rem] tracking-[0.14em] text-faint"
      style={{ mixBlendMode: 'screen' }}
    >
      <span className="text-accent">●</span> cápsula.app
    </div>
  )
}

export default function App() {
  return (
    // reducedMotion="user" neutraliza transform/layout dos componentes Motion
    // (o resto — keyframes CSS, Lenis — é tratado no index.css e no SmoothScroll).
    <MotionConfig reducedMotion="user">
      <CapsulaProvider>
        <SmoothScroll>
          {/* isolate = escopo do mix-blend-mode do grão (não vaza pro stacking context) */}
          <div className="isolate">
            <BrandMark />
            <ConnectBar />
            <ScrollProgress />
            <Grain opacity={0.18} />
            <main>
            <Abertura />
            <ArtistaDoPeriodo />
            <TopMusicas />
            <TopArtistas />
            <Generos />
            <Totais />
            <Evolucao />
            <CartazFinal />
          </main>
          <Footer />
        </div>
        </SmoothScroll>
      </CapsulaProvider>
    </MotionConfig>
  )
}
