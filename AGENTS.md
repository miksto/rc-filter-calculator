# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build` (runs `tsc -b && vite build`)
- **Preview production build:** `npm run preview`
- **Format:** `npx prettier --write src/`

No linter or test runner is configured.

## Architecture

Single-page RC filter calculator built with React 19 + TypeScript + Vite. Given any two of R, C, f_c, it computes the third and renders Bode magnitude/phase plots.

### Data flow

All state lives in `App.tsx`: three raw input strings (`rInput`, `cInput`, `fcInput`), a `solveFor` enum, and `filterType` (lowpass/highpass). A `useRef` tracks the **last two edited fields**; the remaining field becomes the computed output. `useMemo` derives the computed value and resolved f_c, which feed into the chart components.

### Key modules

- **`utils/parseEngNotation.ts`** — Parses engineering notation strings ("100k" → 100000, "10n" → 1e-8). Supports suffixes: p, n, u/μ, m, k/K, M, G.
- **`utils/formatters.ts`** — Two formatter families: display formatters (`formatFrequency` → "1.592 kHz") and round-trip formatters (`toEngFrequency` → "1.592k") that `parseEngNotation` can parse back.
- **`utils/filterMath.ts`** — Three solvers (f_c, C, R from the 1/(2πRC) relation) and transfer function generators that produce 500 log-spaced points across 6 decades.
- **`utils/chartConfig.ts`** — Chart.js options factories with log x-axis, annotation lines at f_c and −3 dB. Colors are hardcoded (not CSS variables) since Chart.js renders to canvas.

### Component pattern

Each component has a paired `.css` file. Components are purely presentational — no local state, all props from App.tsx. CSS theming uses custom properties defined in `App.css` (dark oscilloscope theme). Chart.js is registered globally in `main.tsx`.

## Conventions

- Prettier with `singleQuote: true` (see `.prettierrc`)
- Strict TypeScript (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- Fonts are self-hosted via `@fontsource` packages (IBM Plex Mono + Sans), not loaded from Google Fonts
