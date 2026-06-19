import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { useMemo } from 'react'

// Smooth scroll com inércia (feel "living poster"). Lenis sequestra o scroll por
// padrão, então sob prefers-reduced-motion NÃO montamos o provider — o usuário
// fica com scroll nativo instantâneo (e acessível).
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  if (reduced) return <>{children}</>

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
