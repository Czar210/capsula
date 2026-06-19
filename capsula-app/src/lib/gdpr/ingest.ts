import type { GdprAggregate } from './parser'

export interface IngestProgress {
  done: number
  total: number
}

// Só os arquivos de áudio do export "Extended Streaming History".
export function filterStreamingFiles(files: File[]): File[] {
  return files.filter((f) => /Streaming_History_Audio.*\.json$/i.test(f.name))
}

// Detecta o export ERRADO ("Account data" → StreamingHistory*.json, ~1 ano só).
export function looksLikeAccountDataExport(files: File[]): boolean {
  return (
    files.some((f) => /^StreamingHistory.*\.json$/i.test(f.name)) &&
    filterStreamingFiles(files).length === 0
  )
}

export function ingestGdprFiles(
  files: File[],
  onProgress?: (p: IngestProgress) => void,
): Promise<GdprAggregate> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
    worker.onmessage = (e: MessageEvent<{ type: string; done?: number; total?: number; aggregate?: GdprAggregate }>) => {
      const msg = e.data
      if (msg.type === 'progress') {
        onProgress?.({ done: msg.done ?? 0, total: msg.total ?? 0 })
      } else if (msg.type === 'done') {
        resolve(msg.aggregate as GdprAggregate)
        worker.terminate()
      }
    }
    worker.onerror = (err) => {
      reject(err instanceof ErrorEvent ? new Error(err.message) : new Error('worker_error'))
      worker.terminate()
    }
    worker.postMessage({ files })
  })
}
