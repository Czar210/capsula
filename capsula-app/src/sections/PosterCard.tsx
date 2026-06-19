import type { CSSProperties, Ref } from 'react'
import { useCapsula } from '../data/CapsulaContext'
import { formatThousands } from '../lib/format'
import { Grain } from '../components/Grain'
import { SpotifyMark } from '../components/SpotifyMark'

// O cartaz 4:5. Em vez de unidades container-query (cqw) — que colapsam no clone
// do html-to-image — todo o dimensionamento usa calc(var(--u) * n), onde --u é
// 1% da largura. var(--u) é um comprimento FIXO (não relativo ao pai), então não
// há composição de em ao aninhar. Export-safe e responsivo de um jeito só.
interface PosterCardProps {
  innerRef?: Ref<HTMLDivElement>
}

const u = (n: number) => `calc(var(--u) * ${n})`

export function PosterCard({ innerRef }: PosterCardProps) {
  const capsula = useCapsula()
  const { poster, period } = capsula

  const cardStyle: CSSProperties = {
    width: u(100),
    aspectRatio: '4 / 5',
    background: 'var(--bg-deep)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    padding: u(7),
    boxSizing: 'border-box',
    position: 'relative',
  }

  return (
    <div
      ref={innerRef}
      id="capsula-poster"
      // --u = 1% da largura do cartaz; base fixa p/ o calc() (sem cqw, export-safe)
      style={{ ...cardStyle, '--u': 'clamp(3.2px, 0.92vw, 5.6px)' } as CSSProperties}
    >
      {/* anel motivo */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: u(92),
          height: u(92),
          pointerEvents: 'none',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: u(i * 13),
              border: '1px solid',
              borderColor:
                i === 0 ? 'var(--ring)' : i === 1 ? 'var(--green-16)' : 'var(--green-08)',
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      {/* header */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: u(4.4),
          }}
        >
          cápsula
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: u(2.1),
            letterSpacing: '0.16em',
            color: 'var(--text-secondary)',
          }}
        >
          RETROSPECTIVA
        </span>
      </div>

      {/* artista */}
      <div style={{ position: 'relative', marginTop: 'auto' }}>
        <span
          className="cap-eyebrow"
          style={{ fontSize: u(2.3), letterSpacing: '0.14em' }}
        >
          o artista do período
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: u(12),
            lineHeight: 0.96,
            letterSpacing: '-0.02em',
            margin: `${u(1.5)} 0 0`,
          }}
        >
          {poster.artist.split(' ').map((word) => (
            <span key={word} style={{ display: 'block' }}>
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* número herói */}
      <div style={{ position: 'relative', marginTop: u(6) }}>
        <span className="cap-eyebrow" style={{ fontSize: u(2.3), letterSpacing: '0.14em' }}>
          minutos em fones de ouvido
        </span>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            fontSize: u(17.5),
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: 'var(--accent)',
            marginTop: u(0.5),
          }}
        >
          {formatThousands(poster.minutes)}
        </div>
      </div>

      {/* gêneros */}
      <div
        style={{
          position: 'relative',
          marginTop: u(5),
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: u(4.2),
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
        }}
      >
        {poster.genres.map((g, i) => (
          <span key={g}>
            {i > 0 ? <span style={{ color: 'var(--text-faint)' }}> · </span> : null}
            {g}
          </span>
        ))}
      </div>

      {/* assinatura */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          marginTop: u(7),
          paddingTop: u(4.5),
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: u(8.5),
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          {period.from} <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>—</span>{' '}
          {period.to}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: u(2),
            letterSpacing: '0.22em',
            color: 'var(--text-secondary)',
            marginTop: u(1.6),
          }}
        >
          CÁPSULA.APP
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: u(1),
            marginTop: u(2),
          }}
        >
          <SpotifyMark size={u(2.6)} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: u(1.6),
              letterSpacing: '0.12em',
              color: 'var(--text-faint)',
            }}
          >
            dados via Spotify
          </span>
        </div>
      </div>

      <Grain fixed={false} opacity={0.22} />
    </div>
  )
}
