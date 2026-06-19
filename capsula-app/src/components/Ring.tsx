import type { CSSProperties } from 'react'

interface RingProps {
  /** diâmetro externo em px */
  size?: number
  /** quantos anéis concêntricos */
  count?: number
  /** halo verde no anel externo */
  glow?: boolean
  className?: string
  style?: CSSProperties
}

// Motivo "Romanos": anéis finos (~1px) verdes concêntricos, decorativos, atrás de
// headlines e da figura do cartaz. Opacidade decresce do externo p/ o interno.
export function Ring({ size = 240, count = 1, glow = false, className, style }: RingProps) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        flexShrink: 0,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const inset = (i / count) * (size * 0.42)
        const isOuter = i === 0
        const borderColor = isOuter
          ? 'var(--ring)'
          : i === 1
            ? 'var(--green-16)'
            : 'var(--green-08)'
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: `${inset}px`,
              border: '1px solid',
              borderColor,
              borderRadius: '50%',
              boxShadow: isOuter && glow ? 'var(--shadow-glow)' : 'none',
            }}
          />
        )
      })}
    </div>
  )
}
