interface RankRowProps {
  rank: number
  title: string
  subtitle?: string
  /** #1 ganha o título em itálico Fraunces */
  active?: boolean
}

// Linha de ranking "top 5": número mono verde + título Fraunces + (subtítulo Inter).
export function RankRow({ rank, title, subtitle, active = false }: RankRowProps) {
  return (
    <div
      className="flex items-baseline gap-6 py-4"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <span
        className="cap-num shrink-0 text-xl font-medium text-accent"
        style={{ minWidth: '2.2ch' }}
      >
        {String(rank).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1">
        <div
          className={
            'font-display text-[clamp(1.25rem,3vw,1.875rem)] font-medium leading-tight text-ink' +
            (active ? ' italic' : '')
          }
        >
          {title}
        </div>
        {subtitle ? <div className="mt-1 text-[0.9375rem] text-muted">{subtitle}</div> : null}
      </div>
    </div>
  )
}
