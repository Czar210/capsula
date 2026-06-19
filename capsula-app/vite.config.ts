import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Tailwind v4 é configurado via o plugin + CSS-first (@theme), sem tailwind.config.js.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 127.0.0.1 (não "localhost") p/ casar com o redirect URI do Spotify no dev.
  server: { host: '127.0.0.1', port: 5173 },
})
