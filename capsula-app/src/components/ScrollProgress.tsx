import { motion, useScroll, useSpring } from 'motion/react'

// Barra de progresso vertical fina, verde, no canto direito. Anima SOMENTE
// scaleY (transform, compositor-friendly) — nunca height/top. useSpring suaviza
// e absorve pequenas dessincronias com o Lenis.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  })

  return (
    <div
      aria-hidden
      className="fixed right-[clamp(14px,2.4vw,34px)] top-[18vh] z-[60] h-[64vh] w-[2px] overflow-hidden rounded-full"
      style={{ background: 'var(--egg-10)' }}
    >
      <motion.div
        className="h-full w-full origin-top rounded-full"
        style={{
          scaleY,
          background: 'var(--accent)',
          boxShadow: '0 0 10px var(--green-32)',
        }}
      />
    </div>
  )
}
