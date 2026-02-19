import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import type { FilterType, PlotPoint } from '../types';
import { computeMagnitude } from '../utils/filterMath';
import { magnitudeChartOptions } from '../utils/chartConfig';
import { useIsDarkMode } from '../hooks/useIsDarkMode';
import './BodePlot.css';

interface Props {
  fc: number | null;
  filterType: FilterType;
}

export function BodePlot({ fc, filterType }: Props) {
  const isDark = useIsDarkMode();

  const data = useMemo(() => {
    if (fc === null) return null;
    const points: PlotPoint[] = computeMagnitude(fc, filterType);
    return {
      datasets: [
        {
          data: points.map((p) => ({ x: p.x, y: p.y })),
          borderColor: isDark ? '#4dabf7' : '#2563eb',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0,
        },
      ],
    };
  }, [fc, filterType, isDark]);

  const options = useMemo(
    () => magnitudeChartOptions(fc, isDark),
    [fc, isDark],
  );

  return (
    <div className="chart-container">
      <h3>Magnitude Response</h3>
      {data ? (
        <div className="chart-wrapper">
          <Line data={data} options={options} />
        </div>
      ) : (
        <div className="chart-empty">
          Enter two parameters to see the Bode plot
        </div>
      )}
    </div>
  );
}
