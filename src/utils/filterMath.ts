import type { FilterType, PlotPoint } from '../types';

const TWO_PI = 2 * Math.PI;

export function solveFc(r: number, c: number): number {
  return 1 / (TWO_PI * r * c);
}

export function solveC(r: number, fc: number): number {
  return 1 / (TWO_PI * r * fc);
}

export function solveR(c: number, fc: number): number {
  return 1 / (TWO_PI * c * fc);
}

/** Generate logarithmically spaced frequencies: 3 decades below to 3 decades above fc */
function logSpace(fc: number, points: number = 500): number[] {
  const logMin = Math.log10(fc) - 3;
  const logMax = Math.log10(fc) + 3;
  const step = (logMax - logMin) / (points - 1);
  const freqs: number[] = [];
  for (let i = 0; i < points; i++) {
    freqs.push(Math.pow(10, logMin + i * step));
  }
  return freqs;
}

export function computeMagnitude(
  fc: number,
  filterType: FilterType,
): PlotPoint[] {
  const freqs = logSpace(fc);
  return freqs.map((f) => {
    const ratio = f / fc;
    let h: number;
    if (filterType === 'lowpass') {
      h = 1 / Math.sqrt(1 + ratio * ratio);
    } else {
      h = ratio / Math.sqrt(1 + ratio * ratio);
    }
    return { x: f, y: 20 * Math.log10(h) };
  });
}

export function computePhase(fc: number, filterType: FilterType): PlotPoint[] {
  const freqs = logSpace(fc);
  const RAD_TO_DEG = 180 / Math.PI;
  return freqs.map((f) => {
    let phase: number;
    if (filterType === 'lowpass') {
      phase = -Math.atan(f / fc) * RAD_TO_DEG;
    } else {
      phase = Math.atan(fc / f) * RAD_TO_DEG;
    }
    return { x: f, y: phase };
  });
}
