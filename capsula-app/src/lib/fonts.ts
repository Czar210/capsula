// Garante que as faces realmente usadas estejam carregadas ANTES de capturar o
// pôster. document.fonts.ready sozinho não basta: uma face nunca pintada (ex.
// Fraunces itálico, só no nó de export) pode não estar no FontFaceSet ainda.
const FONT_SPECS = [
  "1em 'Inter Variable'",
  "500 1em 'Inter Variable'",
  "600 1em 'Inter Variable'",
  "1em 'Geist Mono Variable'",
  "500 1em 'Geist Mono Variable'",
  "500 1em 'Fraunces Variable'",
  "600 1em 'Fraunces Variable'",
  "italic 400 1em 'Fraunces Variable'",
  "italic 600 1em 'Fraunces Variable'",
]

let cached: Promise<void> | null = null

export function ensureFontsLoaded(): Promise<void> {
  if (cached) return cached
  cached = (async () => {
    if (typeof document === 'undefined' || !('fonts' in document)) return
    try {
      await Promise.all(FONT_SPECS.map((spec) => document.fonts.load(spec)))
      await document.fonts.ready
    } catch {
      // não bloquear o export se uma face específica falhar
    }
  })()
  return cached
}
