import type { ChartOptions } from 'chart.js';
import { formatFrequencyTick } from './formatters';

const GRID_COLOR = 'rgba(255, 255, 255, 0.15)';
const TICK_COLOR = '#c9d1d9';
const FONT_FAMILY = "'IBM Plex Mono', monospace";

function baseOptions(yLabel: string, yMin: number, yMax: number): ChartOptions<'line'> {
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
          color: TICK_COLOR,
          font: { family: FONT_FAMILY, size: 12 },
        },
        grid: { color: GRID_COLOR },
        ticks: {
          color: TICK_COLOR,
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
          color: TICK_COLOR,
          font: { family: FONT_FAMILY, size: 12 },
        },
        min: yMin,
        max: yMax,
        grid: { color: GRID_COLOR },
        ticks: {
          color: TICK_COLOR,
          font: { family: FONT_FAMILY, size: 11 },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(14, 17, 23, 0.9)',
        titleFont: { family: FONT_FAMILY },
        bodyFont: { family: FONT_FAMILY },
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      },
    },
  };
}

export function magnitudeChartOptions(fc: number | null): ChartOptions<'line'> {
  const opts = baseOptions('Magnitude (dB)', -60, 6);

  if (fc !== null) {
    opts.plugins = {
      ...opts.plugins,
      annotation: {
        annotations: {
          fcLine: {
            type: 'line' as const,
            xMin: fc,
            xMax: fc,
            borderColor: 'rgba(0, 255, 136, 0.7)',
            borderWidth: 1,
            borderDash: [6, 4],
            label: {
              display: true,
              content: 'f_c',
              position: 'start' as const,
              color: '#00ff88',
              font: { family: FONT_FAMILY, size: 11 },
              backgroundColor: 'transparent',
            },
          },
          minus3dB: {
            type: 'line' as const,
            yMin: -3,
            yMax: -3,
            borderColor: 'rgba(255, 255, 255, 0.35)',
            borderWidth: 1,
            borderDash: [4, 4],
            label: {
              display: true,
              content: '-3 dB',
              position: 'end' as const,
              color: 'rgba(255, 255, 255, 0.7)',
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

export function phaseChartOptions(fc: number | null): ChartOptions<'line'> {
  const opts = baseOptions('Phase (°)', -100, 100);

  if (fc !== null) {
    opts.plugins = {
      ...opts.plugins,
      annotation: {
        annotations: {
          fcLine: {
            type: 'line' as const,
            xMin: fc,
            xMax: fc,
            borderColor: 'rgba(0, 255, 136, 0.7)',
            borderWidth: 1,
            borderDash: [6, 4],
            label: {
              display: true,
              content: 'f_c',
              position: 'start' as const,
              color: '#00ff88',
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
