import { useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Section } from '../components/Section'
import { exportPosterToBlob } from '../lib/exportPoster'
import { PosterCard } from './PosterCard'

const DEFAULT_NOTE = 'PNG 2240×2800 · pensado para impressão'

function triggerDownload(blob: Blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'capsula-2023-2026.png'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

// 8 · O CARTAZ — síntese esparsa, exportável em PNG de alta resolução.
export function CartazFinal() {
  const posterRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState(DEFAULT_NOTE)

  async function handleDownload() {
    if (!posterRef.current) return
    setBusy(true)
    setNote('Gerando imagem…')
    try {
      const blob = await exportPosterToBlob(posterRef.current)
      if (!blob) throw new Error('no-blob')
      triggerDownload(blob)
      setNote('Pronto — imagem salva.')
    } catch {
      setNote('Não foi possível gerar. Tente novamente.')
    } finally {
      setBusy(false)
    }
  }

  async function handleShare() {
    if (!posterRef.current) return
    setBusy(true)
    setNote('Preparando…')
    try {
      const blob = await exportPosterToBlob(posterRef.current)
      if (!blob) throw new Error('no-blob')
      const file = new File([blob], 'capsula-2023-2026.png', { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Cápsula 2023 — 2026',
          text: 'Minha retrospectiva musical.',
        })
        setNote('Compartilhado.')
      } else {
        triggerDownload(blob)
        setNote('Compartilhamento indisponível — imagem baixada.')
      }
    } catch (e) {
      setNote(e instanceof Error && e.name === 'AbortError' ? DEFAULT_NOTE : 'Não foi possível compartilhar.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Section center label="08 — O cartaz">
      <p className="cap-eyebrow mb-8">// o cartaz</p>
      <PosterCard innerRef={posterRef} />
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button variant="primary" onClick={handleDownload} disabled={busy}>
          {busy ? 'Gerando…' : 'Baixar imagem (alta resolução)'}
        </Button>
        <Button variant="secondary" arrow onClick={handleShare} disabled={busy}>
          Compartilhar
        </Button>
      </div>
      <p className="cap-num mt-4 text-[12px] tracking-[0.04em] text-faint">{note}</p>
    </Section>
  )
}
