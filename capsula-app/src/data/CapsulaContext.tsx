import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { CapsulaData } from '../types'
import { capsula as mock } from './mock'
import { buildCapsulaFromApi } from './spotify/fetchCapsula'
import {
  getValidToken,
  handleRedirectCallback,
  hasSession,
  isSpotifyConfigured,
  logout as authLogout,
  startLogin,
} from '../lib/auth/auth'
import {
  filterStreamingFiles,
  ingestGdprFiles,
  looksLikeAccountDataExport,
} from '../lib/gdpr/ingest'
import type { IngestProgress } from '../lib/gdpr/ingest'
import { mergeGdpr } from '../lib/gdpr/toCapsula'

type Status = 'demo' | 'loading' | 'live' | 'error'

interface Controller {
  status: Status
  configured: boolean
  error: string | null
  busy: boolean
  uploadProgress: IngestProgress | null
  hasGdpr: boolean
  login: () => void
  logout: () => void
  uploadGdpr: (files: File[]) => Promise<void>
  dismissError: () => void
}

const DataContext = createContext<CapsulaData>(mock)
const ControllerContext = createContext<Controller | null>(null)

function spotifyErrorMessage(code: string): string {
  if (code === 'access_denied') return 'Login cancelado.'
  if (code === 'state_mismatch') return 'Falha de segurança no login (state). Tente de novo.'
  return `Erro no login: ${code}`
}

export function CapsulaProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CapsulaData>(mock)
  const [status, setStatus] = useState<Status>('demo')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<IngestProgress | null>(null)

  // Boot: trata o callback ?code (sem router) e restaura sessão existente.
  useEffect(() => {
    let alive = true
    void (async () => {
      const cb = await handleRedirectCallback()
      if (!alive) return
      if (cb.error) setError(spotifyErrorMessage(cb.error))
      if (cb.loggedIn || hasSession()) {
        setStatus('loading')
        const token = await getValidToken()
        if (!alive) return
        if (!token) {
          setStatus('demo') // refresh falhou/expirou
          return
        }
        try {
          const live = await buildCapsulaFromApi()
          if (!alive) return
          setData(live)
          setStatus('live')
        } catch (e) {
          if (!alive) return
          setStatus('error')
          setError(e instanceof Error ? e.message : 'Falha ao buscar seus dados.')
        }
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const login = useCallback(() => {
    startLogin().catch((e) => setError(e instanceof Error ? e.message : 'Falha no login.'))
  }, [])

  const logout = useCallback(() => {
    authLogout()
    setData(mock)
    setStatus('demo')
    setError(null)
  }, [])

  const uploadGdpr = useCallback(async (files: File[]) => {
    const audio = filterStreamingFiles(files)
    if (audio.length === 0) {
      setError(
        looksLikeAccountDataExport(files)
          ? 'Esse é o export "Account data" (~1 ano). Peça o "Extended streaming history" no Spotify.'
          : 'Não encontrei arquivos Streaming_History_Audio_*.json no que você subiu.',
      )
      return
    }
    setBusy(true)
    setError(null)
    setUploadProgress({ done: 0, total: audio.length })
    try {
      const aggregate = await ingestGdprFiles(audio, setUploadProgress)
      setData((prev) => mergeGdpr(prev, aggregate))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Falha ao ler o histórico.')
    } finally {
      setBusy(false)
      setUploadProgress(null)
    }
  }, [])

  const dismissError = useCallback(() => setError(null), [])

  const controller = useMemo<Controller>(
    () => ({
      status,
      configured: isSpotifyConfigured(),
      error,
      busy,
      uploadProgress,
      hasGdpr: data.meta?.source === 'gdpr' || data.meta?.source === 'live+gdpr',
      login,
      logout,
      uploadGdpr,
      dismissError,
    }),
    [status, error, busy, uploadProgress, data.meta?.source, login, logout, uploadGdpr, dismissError],
  )

  return (
    <DataContext.Provider value={data}>
      <ControllerContext.Provider value={controller}>{children}</ControllerContext.Provider>
    </DataContext.Provider>
  )
}

export function useCapsula(): CapsulaData {
  return useContext(DataContext)
}

export function useCapsulaController(): Controller {
  const ctrl = useContext(ControllerContext)
  if (!ctrl) throw new Error('useCapsulaController deve estar dentro de <CapsulaProvider>')
  return ctrl
}
