import type { CSSProperties, ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  /** centraliza conteúdo (abertura, totais) */
  center?: boolean
  /** rótulo de tela (data-attr) p/ debug/âncora */
  label?: string
  className?: string
  style?: CSSProperties
}

// "Uma respiração": cada cena ocupa 100svh (svh evita o salto da barra de URL no
// mobile), centra verticalmente, com ar generoso de cartaz.
export function Section({ children, center = false, label, className = '', style }: SectionProps) {
  return (
    <section
      data-screen-label={label}
      className={[
        'relative mx-auto flex min-h-[100svh] w-full max-w-[var(--max-content)] flex-col justify-center px-[var(--gutter)] py-28',
        center ? 'items-center text-center' : 'items-start text-left',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {children}
    </section>
  )
}
