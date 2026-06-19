# Cápsula — Retrospectiva

> Uma retrospectiva musical da graduação **2023 → 2026** em forma de página única de
> *scrollytelling* editorial, terminando num **cartaz exportável em alta resolução**.
> Um cartaz vivo, não um dashboard.

<p>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white">
  <img alt="Motion" src="https://img.shields.io/badge/Motion-12-0055FF">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green">
</p>

Conecte o Spotify (ou suba seu histórico) e reviva, num scroll vertical lento, a trilha
sonora de quatro anos de faculdade — terminando num pôster bonito, compartilhável e
pensado para impressão. Estética **analógica e editorial**: fundo *blueberry night*, um
verde radioativo de destaque, grão de papel orgânico e tipografia grande
(Fraunces · Inter · Geist Mono).

---

## ✨ Destaques

- **8 cenas de 100vh**, uma ideia por tela, reveladas com fade + leve subida no scroll
- **Cartaz final exportável** como PNG de alta resolução (~2240×2800, pensado p/ impressão)
- **Grão de papel** orgânico (SVG `feTurbulence` pré-assado, `mix-blend-mode`), fixo e performático
- **Smooth scroll** com inércia (Lenis), barra de progresso vertical, tudo respeitando `prefers-reduced-motion`
- **3 modos de dados** atrás de uma única costura (`CapsulaData`) — as cenas não sabem a fonte:
  | Modo | Como | Dados |
  |---|---|---|
  | **demo** | padrão | dados fictícios (mock) |
  | **login** (até 5 pessoas) | Spotify OAuth **PKCE** | top músicas/artistas/gêneros reais (all-time) |
  | **upload** (qualquer um) | parse do export GDPR no browser | minutos, dias, distintos e **evolução por ano** 100% reais |

---

## 🧱 Stack

| Camada | Escolha |
|---|---|
| Build | **Vite 8** (Rolldown) + template `react-ts` |
| UI | **React 19** + **TypeScript 6** |
| Estilo | **Tailwind v4** (CSS-first, `@theme`) com tokens do design system |
| Animação | **Motion 12** (`motion/react`) — reveals + barra de progresso |
| Smooth scroll | **Lenis** (desligado sob reduced-motion) |
| Export PNG | **html-to-image** (foreignObject preserva grão, blend e webfonts) |
| Fontes | **@fontsource-variable** (Fraunces + itálico, Inter, Geist Mono), self-hosted |
| Auth | Authorization Code **PKCE**, client-side puro (sem backend) |
| Deploy alvo | **Vercel** (estático) |

A stack foi escolhida a partir de uma pesquisa multi-agente que confirmou as melhores
opções de 2026 para cada peça (build, scroll, export, fontes, grão, Spotify) e desenhou
o plano com mapa de riscos antes da primeira linha de código.

---

## 🚀 Rodar

> O app vive em [`capsula-app/`](./capsula-app). Requer **Node ≥ 22.12**.

```bash
cd capsula-app
npm install
npm run dev      # http://127.0.0.1:5173
```

`npm run build` faz `tsc -b` + `vite build`; `npm run preview` serve o build.

Funciona **sem nenhuma configuração** no modo demo + upload. O login ao vivo precisa de
um app no Spotify (veja abaixo).

---

## 🎧 Spotify (opcional, pra dados reais)

### Login ao vivo
1. Crie um app no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) (o dono precisa de **Premium ativo**).
2. **Redirect URIs** (byte-idêntico): `http://127.0.0.1:5173/` (dev) e `https://SEU-PROJETO.vercel.app/` (prod). Nunca `localhost`.
3. **Users and Access** → adicione o e-mail exato de cada pessoa (**máx. 5** — limite do Development Mode).
4. `cp .env.example .env`, preencha `VITE_SPOTIFY_CLIENT_ID`, reinicie o dev server.

### Upload do histórico (qualquer pessoa, sem quota)
No Spotify: Conta → Privacidade → peça o **"Extended streaming history"** (NÃO "Account data").
Chega por e-mail em até ~30 dias como vários `Streaming_History_Audio_*.json`. Suba todos
em **"subir histórico"** — o parse roda 100% no seu navegador (Web Worker); nada sai do dispositivo.

Detalhes completos em [`capsula-app/README.md`](./capsula-app/README.md).

---

## ⚠️ Limitações honestas (e o porquê)

- **Login = no máximo 5 pessoas** que você cadastra. Extended Quota Mode (acesso público) exige empresa — por isso o login é, na prática, privado. Quem precisa de "qualquer pessoa" usa o **upload**, que escala sem quota.
- **Minutos, dias, faixas distintas e corte por ano NÃO existem na Web API ao vivo** (só `short/medium/long_term`). No modo login esses números aparecem com badge **"estimativa"** até alguém subir o histórico (aí viram reais).
- **Gêneros** vêm dos **artistas** (faixas nunca tiveram gênero) e podem vir esparsos.
- Compartilhamento por link público é uma v2 (exigiria storage e respeitar os Developer Terms — guardaríamos só o PNG renderizado, nunca dados crus da Spotify).

---

## 🗂️ Estrutura

```
.
├─ capsula-app/                 # ★ o app (Vite + React + TS + Tailwind)
│  ├─ src/
│  │  ├─ sections/              # as 8 cenas (uma por arquivo) + o cartaz
│  │  ├─ components/            # Reveal, Grain, Ring, ScrollProgress, ConnectBar, ...
│  │  ├─ data/                  # CapsulaContext (a costura), mock, serviço Spotify
│  │  ├─ lib/auth/              # PKCE client-side (pkce, tokenStore, auth)
│  │  ├─ lib/gdpr/              # parser do export (Web Worker) — testado
│  │  └─ styles/                # tokens + Tailwind @theme
│  └─ scripts/test-parser.ts    # teste do parser GDPR (node --experimental-strip-types)
├─ capsula/ + _ds/              # protótipo React-via-CDN importado do Claude Design (referência)
└─ README.md
```

> `capsula/` + `_ds/` são o **protótipo original** (React/Babel via CDN) importado do
> Claude Design — mantido como referência visual da origem do design system.

---

## 🛣️ Roadmap

- [ ] Deploy na Vercel (Root Directory = `capsula-app`, Node 22)
- [ ] Login ao vivo testado end-to-end com Client ID real
- [ ] Enriquecimento de gênero por ano (opcional, via `/artists/{id}`)
- [ ] v2: link compartilhável (`/c/<slug>`) guardando só o PNG renderizado

---

## 📄 Licença & aviso

[MIT](./LICENSE) © César Augusto Sibila.

Projeto pessoal, **não afiliado à Spotify AB**. As marcas e dados do Spotify pertencem aos
seus donos; o app exibe atribuição conforme as diretrizes. Antes de qualquer uso público,
confirmar os assets oficiais de marca e a conformidade com os Developer Terms.
