import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { useCapsulaController } from '../data/CapsulaContext'
import { Button } from './Button'

// Botão reutilizável que abre o seletor de arquivos do export GDPR e dispara o
// parse (mesma ação do "subir histórico" da ConnectBar). Usado nos estados
// "destrave com o histórico" das cenas que só têm dado real via GDPR.
export function UploadHistoryButton({ label = 'subir histórico' }: { label?: string }) {
  const c = useCapsulaController()
  const ref = useRef<HTMLInputElement>(null)

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length) void c.uploadGdpr(files)
    e.target.value = ''
  }

  return (
    <>
      <Button variant="secondary" arrow disabled={c.busy} onClick={() => ref.current?.click()}>
        {c.busy ? 'lendo…' : label}
      </Button>
      <input
        ref={ref}
        type="file"
        accept=".json,application/json"
        multiple
        hidden
        onChange={onPick}
      />
    </>
  )
}
