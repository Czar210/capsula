// Selo discreto para números que NÃO vêm da API ao vivo (minutos/dias/per-ano)
// — honestidade do produto. Some quando há GDPR ou dados reais.
export function EstimateTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`ml-2 inline-block translate-y-[-1px] rounded-full px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-[0.12em] text-faint ${className}`}
      style={{ border: '1px solid var(--border)' }}
    >
      estimativa
    </span>
  )
}
