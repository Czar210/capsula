import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** atraso em ms (stagger das listas) */
  delay?: number
  className?: string
  /** deslocamento inicial em px — DS = 24 (sobe ao revelar) */
  y?: number
}

// Reveal do DS: fade + leve subida ao entrar na viewport, uma vez só, sem bounce.
// translateY(24)->0, 700ms, ease decel (0.16,1,0.3,1). Sob prefers-reduced-motion
// o <MotionConfig reducedMotion="user"> (em App) neutraliza o y, mantendo opacity.
export function Reveal({ children, delay = 0, className, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
