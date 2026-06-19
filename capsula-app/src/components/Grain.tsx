import type { CSSProperties } from 'react'

// Tile feTurbulence (fractalNoise + stitchTiles) PRÉ-ASSADO como data-URI: a
// computação cara acontece uma vez no SVG; o browser só repete um bitmap (GPU),
// então não janka no scroll. NÃO animar, NÃO deixar <feTurbulence> vivo pintando
// o viewport. mix-blend-mode soft-light mantém o grão orgânico no fundo escuro
// (screen lavaria em cinza). Sobrevive ao export via foreignObject (html-to-image).
const GRAIN_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='capGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='0.85'/%3E%3CfeFuncG type='linear' slope='0.85'/%3E%3CfeFuncB type='linear' slope='0.85'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23capGrain)'/%3E%3C/svg%3E\")"

interface GrainProps {
  /** ~0.10–0.20. Perceptível mas não digital. */
  opacity?: number
  /** false = grão local (dentro de um container posicionado, ex. o cartaz) */
  fixed?: boolean
  style?: CSSProperties
}

export function Grain({ opacity = 0.18, fixed = true, style }: GrainProps) {
  return (
    <div
      aria-hidden
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        opacity,
        mixBlendMode: 'soft-light',
        backgroundImage: GRAIN_DATA_URI,
        backgroundSize: '120px 120px',
        ...style,
      }}
    />
  )
}
