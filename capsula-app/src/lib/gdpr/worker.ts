import { createAccumulator, finalize, foldRows, type StreamRow } from './parser'

// Web Worker: parseia os arquivos um a um fora da main thread (não janka o scroll),
// faz fold em Maps e descarta cada array. Tipagem mínima via cast pra compilar sob a lib DOM.
const ctx = self as unknown as {
  postMessage: (message: unknown) => void
  onmessage: ((ev: MessageEvent<{ files: File[] }>) => void) | null
}

ctx.onmessage = async (ev) => {
  const { files } = ev.data
  const acc = createAccumulator()
  let done = 0
  for (const file of files) {
    try {
      const parsed = JSON.parse(await file.text()) as StreamRow[]
      if (Array.isArray(parsed)) foldRows(acc, parsed)
    } catch {
      // arquivo inválido/errado → ignora, segue os outros
    }
    done += 1
    ctx.postMessage({ type: 'progress', done, total: files.length })
  }
  ctx.postMessage({ type: 'done', aggregate: finalize(acc) })
}
