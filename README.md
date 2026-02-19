# RC Filter Calculator

A single-page RC filter calculator that computes resistor, capacitor, or cutoff frequency values from the standard RC
filter equation **f_c = 1 / (2πRC)**. Supports both lowpass and highpass filter types and renders interactive Bode
magnitude and phase plots.

Enter any two of resistance (R), capacitance (C), and cutoff frequency (f_c), and the app solves for the third. Input
fields accept engineering notation (e.g. `10k`, `100n`, `4.7u`).

## Features

- Solves for R, C, or f_c given the other two parameters
- Engineering notation input with SI suffixes (p, n, u, m, k, M, G)
- Interactive Bode magnitude and phase plots with cutoff frequency annotation
- Lowpass / highpass filter toggle
- Dark oscilloscope-inspired theme

## Tech Stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev server and bundling
- [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.js.org/) for plotting
- Self-hosted fonts via [@fontsource](https://fontsource.org/) (IBM Plex Mono + Sans)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Script                 | Description                         |
|------------------------|-------------------------------------|
| `npm run dev`          | Start the Vite dev server           |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Preview the production build        |
| `npm run format`       | Format source files with Prettier   |
| `npm run format:check` | Check formatting without writing    |

## License

[MIT](LICENSE)
