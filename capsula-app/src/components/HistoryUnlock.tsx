import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { UploadHistoryButton } from './UploadHistoryButton'

const SPOTIFY_PRIVACY_URL = 'https://www.spotify.com/br/account/privacy/'

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 text-left">
      <span
        className="cap-num shrink-0 text-base font-medium text-accent"
        style={{ minWidth: '1.8ch' }}
      >
        {String(n).padStart(2, '0')}
      </span>
      <div>
        <div className="font-sans text-[0.95rem] font-semibold text-ink">{title}</div>
        <div className="mt-1 font-mono text-[0.8125rem] leading-relaxed text-faint">{children}</div>
      </div>
    </li>
  )
}

// Estado "destrave com o histórico": explica que o dado só vem do export GDPR
// e mostra, em 3 passos, como costuma funcionar. Usado nas cenas Totais e Evolução
// quando se está logado mas sem histórico.
export function HistoryUnlock({ title }: { title: string }) {
  return (
    <>
      <Reveal delay={120}>
        <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2.25rem,5.5vw,4rem)] font-medium italic leading-[1.05] tracking-[-0.02em]">
          {title}
        </h2>
      </Reveal>

      <Reveal delay={240}>
        <p className="mt-6 max-w-[48ch] font-mono text-[0.875rem] leading-relaxed text-faint">
          Não dá pra puxar isso da API do Spotify. Veja como pegar o seu:
        </p>
      </Reveal>

      <Reveal delay={320}>
        <ol className="mt-8 flex max-w-[54ch] flex-col gap-6">
          <Step n={1} title="Peça seu histórico no Spotify">
            Em{' '}
            <a
              href={SPOTIFY_PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
              style={{ color: 'var(--accent)' }}
            >
              Conta → Privacidade
            </a>
            , marque{' '}
            <span style={{ color: 'var(--text-secondary)' }}>“Extended streaming history”</span> (não
            “Account data”) e confirme no e-mail.
          </Step>
          <Step n={2} title="Aguarde o e-mail do Spotify">
            Pode levar até ~30 dias (costuma vir em alguns dias). O Spotify não libera isso por API,
            então não tem como ser automático.
          </Step>
          <Step n={3} title="Suba os arquivos aqui">
            Os{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Streaming_History_Audio_*.json</span> do
            .zip. O processamento é 100% no seu navegador.
          </Step>
        </ol>
      </Reveal>

      <Reveal delay={420}>
        <div className="mt-9">
          <UploadHistoryButton label="subir meu histórico" />
        </div>
      </Reveal>
    </>
  )
}
