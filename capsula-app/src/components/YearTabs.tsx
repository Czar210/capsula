import type { Year } from '../types'

interface YearTabsProps {
  years: Year[]
  value: Year
  onChange: (year: Year) => void
}

// Seletor segmentado de ano (cena da evolução). Ano ativo ganha sublinhado verde.
export function YearTabs({ years, value, onChange }: YearTabsProps) {
  return (
    <div
      role="tablist"
      className="inline-flex gap-1 rounded-full p-1"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-raised)' }}
    >
      {years.map((year) => {
        const active = year === value
        return (
          <button
            key={year}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(year)}
            className="cap-num cursor-pointer rounded-full px-[18px] py-[9px] text-[0.8125rem] tracking-[0.06em] transition-colors"
            style={{
              background: active ? 'var(--surface-hover)' : 'transparent',
              color: active ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: active ? 'inset 0 -2px 0 var(--accent)' : 'none',
            }}
          >
            {year}
          </button>
        )
      })}
    </div>
  )
}
