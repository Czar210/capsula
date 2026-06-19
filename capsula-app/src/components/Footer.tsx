// Rodapé do site: assinatura + disclaimer de não-afiliação (compliance).
export function Footer() {
  return (
    <footer
      className="mx-auto flex max-w-[var(--max-content)] flex-col items-center gap-3 px-[var(--gutter)] py-16 text-center"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <span className="font-display text-xl italic text-muted">cápsula</span>
      <span className="cap-num text-[11px] uppercase tracking-[0.2em] text-faint">
        2023 — 2026 · retrospectiva
      </span>
      <span className="font-mono text-[11px] text-faint">
        Projeto pessoal · não afiliado à Spotify AB
      </span>
    </footer>
  )
}
