import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Fontes self-hosted (same-origin via Vite) — pré-requisito do export PNG:
   stylesheet cross-origin (Google CDN) faria o html-to-image dropar o
   @font-face silenciosamente e o pôster sairia em fonte fallback.
   Fraunces tem o itálico num arquivo separado (usado nos destaques). */
import '@fontsource-variable/fraunces/index.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource-variable/inter/index.css'
import '@fontsource-variable/geist-mono/index.css'

import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
