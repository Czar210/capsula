import { toBlob, toPng } from 'html-to-image'
import { ensureFontsLoaded } from './fonts'

// Alvo: ~2240px de largura (4:5 -> ~2800 de altura), nítido para tela e impressão.
const TARGET_WIDTH = 2240

function posterBg(): string {
  if (typeof document === 'undefined') return '#0A0A18'
  const v = getComputedStyle(document.documentElement).getPropertyValue('--bg-deep').trim()
  return v || '#0A0A18'
}

// Captura o nó do cartaz como PNG de alta resolução via html-to-image (foreignObject
// = engine nativo do browser, preserva grão feTurbulence + mix-blend-mode + webfonts).
export async function exportPosterToBlob(node: HTMLElement): Promise<Blob | null> {
  // 1) garantir que TODAS as faces usadas (incl. Fraunces itálico) estejam prontas
  await ensureFontsLoaded()

  const options = {
    // 2) DPI explícito p/ não sair borrado (default usaria o DPR da tela)
    pixelRatio: node.offsetWidth ? TARGET_WIDTH / node.offsetWidth : 4,
    cacheBust: true,
    // 3) fundo opaco igual ao do cartaz (evita halo branco nos cantos arredondados)
    backgroundColor: posterBg(),
    // 4) anula qualquer transform de preview p/ não clipar a captura
    style: { transform: 'none', transformOrigin: 'top left' },
  }

  // 5) Render duplo: a 1ª chamada prima o cache de fontes do html-to-image e
  //    contorna a 1ª-imagem-preta do Safari; descartamos o resultado.
  try {
    await toPng(node, options)
  } catch {
    /* ignore prime errors */
  }

  // 6) toBlob (não data-URL) p/ evitar corrupção de download de imagem grande no Firefox
  return toBlob(node, options)
}
