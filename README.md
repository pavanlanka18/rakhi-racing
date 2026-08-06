# Rakhi Racing — Frontend

Next.js (App Router, TypeScript, Tailwind) storefront for **Rakhi Racing** — die-cast motorcycles with the rakhi thread tied around the front wheel hub.

## Stack
- Next.js 14 (App Router)
- TypeScript, strict
- Tailwind CSS 3 (semantic palette: circuit / mauli / vermillion / chrome / ivory / ink)
- Fonts: Rajdhani (display) · Inter (body) · IBM Plex Mono (specs) — loaded via `next/font`
- Framer Motion for the hero, cart drawer, mobile menu
- Mocked auth + payments; real Express/Mongo backend in `../rakhi-racing-backend/`

## Setup
```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

The frontend reads products from `src/lib/fixtures/products.ts` by default. If `NEXT_PUBLIC_API_URL` is set, `src/lib/api.ts` will hit the real backend instead.

## Scripts
| script        | what it does                       |
|---------------|------------------------------------|
| `npm run dev` | start dev server on :3000          |
| `npm run build` | production build                 |
| `npm start`   | serve the production build         |
| `npm run lint` | eslint                            |
| `npm run typecheck` | tsc --noEmit                  |

## Project layout
```
src/
  app/                # routes (App Router)
  components/         # layout, home, product, cart, ui
  context/            # CartContext
  hooks/              # useCart, useAuth
  lib/                # api, payments, utils, fixtures
  types/              # shared TS types
```

## Design tokens
- `circuit-900` deep racing-green base
- `mauli-500` mauli-gold accent
- `vermillion-500` vermillion-red accent
- `chrome-{200,400,600}` metal details
- `ivory` body text, `ink` deepest contrast
# rakhi-racing
