interface UnitBreakpoint {
  threshold: number;
  suffix: string;
  divisor: number;
}

const FREQ_UNITS: UnitBreakpoint[] = [
  { threshold: 1e9, suffix: 'GHz', divisor: 1e9 },
  { threshold: 1e6, suffix: 'MHz', divisor: 1e6 },
  { threshold: 1e3, suffix: 'kHz', divisor: 1e3 },
  { threshold: 1, suffix: 'Hz', divisor: 1 },
  { threshold: 1e-3, suffix: 'mHz', divisor: 1e-3 },
  { threshold: 1e-6, suffix: 'μHz', divisor: 1e-6 },
  { threshold: 1e-9, suffix: 'nHz', divisor: 1e-9 },
  { threshold: 0, suffix: 'pHz', divisor: 1e-12 },
];

const RESISTANCE_UNITS: UnitBreakpoint[] = [
  { threshold: 1e9, suffix: 'GΩ', divisor: 1e9 },
  { threshold: 1e6, suffix: 'MΩ', divisor: 1e6 },
  { threshold: 1e3, suffix: 'kΩ', divisor: 1e3 },
  { threshold: 1, suffix: 'Ω', divisor: 1 },
  { threshold: 1e-3, suffix: 'mΩ', divisor: 1e-3 },
  { threshold: 1e-6, suffix: 'μΩ', divisor: 1e-6 },
  { threshold: 1e-9, suffix: 'nΩ', divisor: 1e-9 },
  { threshold: 0, suffix: 'pΩ', divisor: 1e-12 },
];

const CAPACITANCE_UNITS: UnitBreakpoint[] = [
  { threshold: 1e9, suffix: 'GF', divisor: 1e9 },
  { threshold: 1e6, suffix: 'MF', divisor: 1e6 },
  { threshold: 1e3, suffix: 'kF', divisor: 1e3 },
  { threshold: 1, suffix: 'F', divisor: 1 },
  { threshold: 1e-3, suffix: 'mF', divisor: 1e-3 },
  { threshold: 1e-6, suffix: 'μF', divisor: 1e-6 },
  { threshold: 1e-9, suffix: 'nF', divisor: 1e-9 },
  { threshold: 0, suffix: 'pF', divisor: 1e-12 },
];

function formatWithUnit(value: number, units: UnitBreakpoint[]): string {
  for (const { threshold, suffix, divisor } of units) {
    if (Math.abs(value) >= threshold) {
      const scaled = value / divisor;
      // Use up to 4 significant digits
      const formatted = parseFloat(scaled.toPrecision(4)).toString();
      return `${formatted} ${suffix}`;
    }
  }
  // Fallback
  const last = units[units.length - 1];
  const scaled = value / last.divisor;
  const formatted = parseFloat(scaled.toPrecision(4)).toString();
  return `${formatted} ${last.suffix}`;
}

export function formatFrequency(hz: number): string {
  return formatWithUnit(hz, FREQ_UNITS);
}

export function formatResistance(ohms: number): string {
  return formatWithUnit(ohms, RESISTANCE_UNITS);
}

export function formatCapacitance(farads: number): string {
  return formatWithUnit(farads, CAPACITANCE_UNITS);
}

/** Format values as parseable engineering notation (e.g. "1.591k", "100n") */

interface EngBreakpoint {
  threshold: number;
  suffix: string;
  divisor: number;
}

const ENG_GENERAL: EngBreakpoint[] = [
  { threshold: 1e9, suffix: 'G', divisor: 1e9 },
  { threshold: 1e6, suffix: 'M', divisor: 1e6 },
  { threshold: 1e3, suffix: 'k', divisor: 1e3 },
  { threshold: 1, suffix: '', divisor: 1 },
  { threshold: 1e-3, suffix: 'm', divisor: 1e-3 },
  { threshold: 1e-6, suffix: 'u', divisor: 1e-6 },
  { threshold: 1e-9, suffix: 'n', divisor: 1e-9 },
  { threshold: 1e-12, suffix: 'p', divisor: 1e-12 },
];

function toEng(value: number, breakpoints: EngBreakpoint[]): string {
  for (const { threshold, suffix, divisor } of breakpoints) {
    if (Math.abs(value) >= threshold) {
      const scaled = parseFloat((value / divisor).toPrecision(4));
      return `${scaled}${suffix}`;
    }
  }
  const last = breakpoints[breakpoints.length - 1];
  const scaled = parseFloat((value / last.divisor).toPrecision(4));
  return `${scaled}${last.suffix}`;
}

export function toEngResistance(ohms: number): string {
  return toEng(ohms, ENG_GENERAL);
}

export function toEngCapacitance(farads: number): string {
  return toEng(farads, ENG_GENERAL);
}

export function toEngFrequency(hz: number): string {
  return toEng(hz, ENG_GENERAL);
}

/** Format frequency for chart axis ticks */
export function formatFrequencyTick(hz: number): string {
  if (hz >= 1e9) return `${hz / 1e9}G`;
  if (hz >= 1e6) return `${hz / 1e6}M`;
  if (hz >= 1e3) return `${hz / 1e3}k`;
  if (hz >= 1) return `${hz}`;
  if (hz >= 1e-3) return `${hz * 1e3}m`;
  return hz.toExponential(0);
}
