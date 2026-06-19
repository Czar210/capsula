# Cápsula — `capsula-app` (build real)

Retrospectiva musical da graduação **2023 → 2026** em página única de
scrollytelling editorial, terminando num **cartaz exportável em PNG de alta
resolução**. Beta com dados **fictícios (mock)** — foco na experiência visual.

Stack: **Vite 8 · React 19 · TypeScript 6 · Tailwind v4 · Motion 12 · Lenis ·
html-to-image · @fontsource-variable** (Fraunces / Inter / Geist Mono, self-hosted).

> Esta pasta é o app de verdade. O protótipo React-via-CDN em `../capsula` +
> `../_ds` é só a referência visual importada do Claude Design.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b + vite build (dist/)
npm run preview    # serve o build de produção
```

Requer **Node ≥ 22.12** (Vite 8 dropou Node 18). Há `.nvmrc` = `22`.

## Estrutura

```
src/
├─ main.tsx                 # entry: importa fontes self-hosted + estilos
├─ App.tsx                  # MotionConfig + SmoothScroll + Grain + ScrollProgress + 8 cenas
├─ styles/
│  ├─ tokens.css            # tokens de marca (var()) — --bg #15152F
│  └─ index.css             # @import tailwind + @theme (utilitários) + base + a11y kill-switch
├─ data/mock.ts             # FONTE ÚNICA dos dados fictícios (trocar pela Spotify depois)
├─ types.ts                 # shapes ~ Spotify Web API
├─ lib/
│  ├─ format.ts             # milhar com ponto (84.207)
│  ├─ fonts.ts              # ensureFontsLoaded() — pré-requisito do export
│  └─ exportPoster.ts       # DOM->PNG alta-res (render duplo, pixelRatio, toBlob)
├─ components/
│  ├─ Reveal.tsx            # fade + subida ao entrar na viewport (DS)
│  ├─ SmoothScroll.tsx      # Lenis (off sob prefers-reduced-motion)
│  ├─ ScrollProgress.tsx    # barra vertical verde (scaleY)
│  ├─ Grain.tsx             # grão feTurbulence pré-assado, soft-light
│  ├─ Ring.tsx              # motivo de anéis verdes finos
│  ├─ Section.tsx           # casca 100svh "uma respiração"
│  ├─ RankRow.tsx           # linha de top-5
│  ├─ YearTabs.tsx          # seletor de ano (evolução)
│  └─ Button.tsx            # botão pílula
└─ sections/                # uma cena por arquivo (1→8)
   ├─ Abertura.tsx
   ├─ ArtistaDoPeriodo.tsx
   ├─ TopMusicas.tsx
   ├─ TopArtistas.tsx
   ├─ Generos.tsx
   ├─ Totais.tsx
   ├─ Evolucao.tsx
   ├─ PosterCard.tsx        # o artboard 4:5 (unidades calc(var(--u)*n), export-safe)
   └─ CartazFinal.tsx       # cena 8: cartaz + baixar/compartilhar
```

## Verificação (checklist de aceite)

- **Scroll**: suave com inércia (Lenis); com `prefers-reduced-motion` ligado vira nativo instantâneo.
- **Reveals**: cada cena sobe 24px + fade ~700ms, uma vez, sem bounce.
- **Barra de progresso**: verde, fina, à direita, sobe conforme o scroll.
- **Grão**: perceptível, fixo, não intercepta clique, sem jank.
- **8 cenas**: abertura → artista → top músicas → top artistas → gêneros → totais → evolução (abas por ano) → cartaz.
- **Export PNG**: na cena 8, "Baixar imagem" gera `capsula-2023-2026.png` ~2240×2800, fundo escuro sólido, **Fraunces itálico + Geist Mono corretos**, grão presente, sem halo. Testar Chrome / Safari / Firefox.

## Deploy (Vercel)

Importar o repo, **Root Directory = `capsula-app`**, framework auto-detecta Vite,
fixar **Node 22** em Project Settings. Rota única, sem `vercel.json`.

## Spotify — 3 modos (híbrido)

O canto superior direito (`ConnectBar`) controla a fonte dos dados. As 8 cenas
**não sabem** de onde vêm — tudo passa pelo `CapsulaContext` que devolve sempre o
mesmo `CapsulaData` (a costura):

| Modo | Como | Dados |
|---|---|---|
| **demo** | default | mock de `src/data/mock.ts` |
| **login** (até 5 pessoas) | "conectar spotify" → PKCE | top músicas/artistas/gêneros **reais** (all-time); minutos/dias/per-ano ficam **estimativa** |
| **upload** (qualquer um) | "subir histórico" → parse no browser | minutos, dias, distintos e **evolução por ano** 100% **reais** |

Login + upload combinam: logar dá os tops na hora, e subir o histórico destrava os números reais.

### Pra ligar o login ao vivo (passo manual seu)

1. Criar app no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) (o dono precisa de **Premium ativo**, exigência de fev/2026).
2. **Redirect URIs** (byte-idêntico): `http://127.0.0.1:5173/` (dev) e `https://SEU-PROJETO.vercel.app/` (prod). Nunca `localhost`.
3. **Users and Access**: adicionar o **e-mail exato** da conta Spotify de cada pessoa — **máximo 5** (parede do Development Mode; Extended Quota exige empresa).
4. `cp .env.example .env` e preencher `VITE_SPOTIFY_CLIENT_ID`. Reiniciar o `npm run dev`.

> Sem isso, o botão "conectar spotify" some, mas **demo e upload funcionam normalmente** (o upload nem precisa de app/Client ID).

### Pra usar o upload (qualquer pessoa, sem quota)

No Spotify: Conta → Privacidade → pedir **"Extended streaming history"** (NÃO "Account data"). Chega por e-mail em até ~30 dias como vários `Streaming_History_Audio_*.json`. Subir todos no botão "subir histórico" — o parse roda 100% no seu navegador (Web Worker), nada é enviado pra servidor nenhum.

## Limitações honestas (por quê)

- A Web API ao vivo **não** dá minutos ouvidos, dias, faixas distintas nem corte por ano — só `short/medium/long_term`. Por isso esses campos ficam **estimativa** no modo login (badge "estimativa") até subir o histórico.
- Gêneros vêm dos **artistas** (faixas nunca tiveram gênero) e podem vir esparsos.
- Compartilhamento por link público fica pra uma v2 (precisaria de storage + respeitar os Developer Terms, que proíbem guardar dados crus da Spotify — guardaríamos só o PNG renderizado).
- O cartaz traz a marca Spotify + "dados via Spotify" (Design Guidelines) — confirmar os assets oficiais antes de qualquer uso público.

## Teste do parser GDPR

```bash
node --experimental-strip-types scripts/test-parser.ts
```
