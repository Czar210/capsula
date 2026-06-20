import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { useCapsulaController } from '../data/CapsulaContext'

const chip =
  'rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-40'

// Cluster de controle fixo (canto superior direito): status + conectar Spotify +
// subir histórico (GDPR) + sair. Lê tudo do CapsulaController.
export function ConnectBar() {
  const c = useCapsulaController()
  const fileRef = useRef<HTMLInputElement>(null)

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length) void c.uploadGdpr(files)
    e.target.value = '' // permite re-subir os mesmos arquivos
  }

  const label = c.uploadProgress
    ? `lendo ${c.uploadProgress.done}/${c.uploadProgress.total}…`
    : c.status === 'loading'
      ? 'carregando…'
      : c.status === 'live' && c.hasGdpr
        ? 'conectado + histórico'
        : c.status === 'live'
          ? 'conectado'
          : c.hasGdpr
            ? 'histórico carregado'
            : 'demo'

  const liveOrLoading = c.status === 'live' || c.status === 'loading'
  const active = c.status === 'live' || c.hasGdpr

  return (
    <div className="fixed right-[clamp(16px,3vw,40px)] top-[clamp(16px,3vw,32px)] z-[70] flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <span
          className="rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.08em]"
          style={{
            color: active ? 'var(--accent)' : 'var(--text-faint)',
            border: '1px solid var(--border)',
          }}
        >
          ● {label}
        </span>

        {c.configured && !liveOrLoading ? (
          <button
            type="button"
            onClick={c.login}
            className={chip}
            style={{ background: 'var(--accent)', color: 'var(--text-on-accent)' }}
          >
            conectar spotify
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={c.busy}
          className={chip}
          style={{
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-strong)',
          }}
        >
          {c.hasGdpr ? 'trocar histórico' : 'subir histórico'}
        </button>

        {c.status === 'live' ? (
          <button
            type="button"
            onClick={c.logout}
            className={chip}
            style={{
              background: 'transparent',
              color: 'var(--text-faint)',
              border: '1px solid var(--border)',
            }}
          >
            sair
          </button>
        ) : null}

        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          multiple
          hidden
          onChange={onPick}
        />
      </div>

      {c.error ? (
        <button
          type="button"
          onClick={c.dismissError}
          className="max-w-[300px] rounded-md px-3 py-2 text-left font-mono text-[11px] leading-snug"
          style={{
            background: 'var(--surface)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-strong)',
          }}
        >
          {c.error} <span className="text-faint">(fechar)</span>
        </button>
      ) : null}
    </div>
  )
}
