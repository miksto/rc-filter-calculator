export type FilterType = 'lowpass' | 'highpass';

export type SolveFor = 'R' | 'C' | 'fc';

export interface PlotPoint {
  x: number; // frequency in Hz
  y: number; // dB or degrees
}
