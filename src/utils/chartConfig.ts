import type { ChartOptions } from 'chart.js';
import { formatFrequencyTick } from './formatters';

const FONT_FAMILY = "'IBM Plex Mono', monospace";

interface ChartColors {
  grid: string;
  tick: string;
  tooltipBg: string;
  tooltipBorder: string;
  accent: string;
  accentLabel: string;
  annotationLine: string;
  annotationLabel: string;
}

function getColors(isDark: boolean): ChartColors {
  if (isDark) {
    return {
      grid: 'rgba(255, 255, 255, 0.15)',
      tick: '#c9d1d9',
      tooltipBg: 'rgba(14, 17, 23, 0.9)',
      tooltipBorder: 'rgba(255, 255, 255, 0.1)',
      accent: 'rgba(0, 255, 136, 0.7)',
      accentLabel: '#00ff88',
      annotationLine: 'rgba(255, 255, 255, 0.35)',
      annotationLabel: 'rgba(255, 255, 255, 0.7)',
    };
  }
  return {
    grid: 'rgba(0, 0, 0, 0.08)',
    tick: '#4b5563',
    tooltipBg: 'rgba(255, 255, 255, 0.95)',
    tooltipBorder: 'rgba(0, 0, 0, 0.1)',
    accent: 'rgba(4, 120, 87, 0.7)',
    accentLabel: '#047857',
    annotationLine: 'rgba(0, 0, 0, 0.2)',
    annotationLabel: 'rgba(0, 0, 0, 0.5)',
  };
}

function baseOptions(
  yLabel: string,
  yMin: number,
  yMax: number,
  colors: ChartColors,
): ChartOptions<'line'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 300 },
    interaction: { intersect: false, mode: 'index' },
    elements: {
      point: { radius: 0 },
      line: { borderWidth: 2 },
    },
    scales: {
      x: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Frequency (Hz)',
          color: colors.tick,
          font: { family: FONT_FAMILY, size: 12 },
        },
        grid: { color: colors.grid },
        ticks: {
          color: colors.tick,
          font: { family: FONT_FAMILY, size: 11 },
          callback: function (value: string | number) {
            const v = typeof value === 'number' ? value : Number(value);
            if (isNaN(v) || v <= 0) return '';
            // Only show labels at powers of 10
            const log = Math.log10(v);
            if (Math.abs(log - Math.round(log)) > 0.01) return '';
            return formatFrequencyTick(v);
          },
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
          color: colors.tick,
          font: { family: FONT_FAMILY, size: 12 },
        },
        min: yMin,
        max: yMax,
        grid: { color: colors.grid },
        ticks: {
          color: colors.tick,
          font: { family: FONT_FAMILY, size: 11 },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colors.tooltipBg,
        titleFont: { family: FONT_FAMILY },
        bodyFont: { family: FONT_FAMILY },
        titleColor: colors.tick,
        bodyColor: colors.tick,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
      },
    },
  };
}

export function magnitudeChartOptions(
  fc: number | null,
  isDark: boolean,
): ChartOptions<'line'> {
  const colors = getColors(isDark);
  const opts = baseOptions('Magnitude (dB)', -60, 6, colors);

  if (fc !== null) {
    opts.plugins = {
      ...opts.plugins,
      annotation: {
        annotations: {
          fcLine: {
            type: 'line' as const,
            xMin: fc,
            xMax: fc,
            borderColor: colors.accent,
            borderWidth: 1,
            borderDash: [6, 4],
            label: {
              display: true,
              content: 'f_c',
              position: 'start' as const,
              color: colors.accentLabel,
              font: { family: FONT_FAMILY, size: 11 },
              backgroundColor: 'transparent',
            },
          },
          minus3dB: {
            type: 'line' as const,
            yMin: -3,
            yMax: -3,
            borderColor: colors.annotationLine,
            borderWidth: 1,
            borderDash: [4, 4],
            label: {
              display: true,
              content: '-3 dB',
              position: 'end' as const,
              color: colors.annotationLabel,
              font: { family: FONT_FAMILY, size: 10 },
              backgroundColor: 'transparent',
            },
          },
        },
      },
    };
  }

  return opts;
}

export function phaseChartOptions(
  fc: number | null,
  isDark: boolean,
): ChartOptions<'line'> {
  const colors = getColors(isDark);
  const opts = baseOptions('Phase (\u00B0)', -100, 100, colors);

  if (fc !== null) {
    opts.plugins = {
      ...opts.plugins,
      annotation: {
        annotations: {
          fcLine: {
            type: 'line' as const,
            xMin: fc,
            xMax: fc,
            borderColor: colors.accent,
            borderWidth: 1,
            borderDash: [6, 4],
            label: {
              display: true,
              content: 'f_c',
              position: 'start' as const,
              color: colors.accentLabel,
              font: { family: FONT_FAMILY, size: 11 },
              backgroundColor: 'transparent',
            },
          },
        },
      },
    };
  }

  return opts;
}
