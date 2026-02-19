import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import type { FilterType, PlotPoint } from '../types';
import { computePhase } from '../utils/filterMath';
import { phaseChartOptions } from '../utils/chartConfig';
import { useIsDarkMode } from '../hooks/useIsDarkMode';
import './PhasePlot.css';

interface Props {
  fc: number | null;
  filterType: FilterType;
}

export function PhasePlot({ fc, filterType }: Props) {
  const isDark = useIsDarkMode();

  const data = useMemo(() => {
    if (fc === null) return null;
    const points: PlotPoint[] = computePhase(fc, filterType);
    return {
      datasets: [
        {
          data: points.map((p) => ({ x: p.x, y: p.y })),
          borderColor: isDark ? '#ff8c42' : '#ea580c',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0,
        },
      ],
    };
  }, [fc, filterType, isDark]);

  const options = useMemo(() => phaseChartOptions(fc, isDark), [fc, isDark]);

  return (
    <div className="chart-container">
      <h3>Phase Response</h3>
      {data ? (
        <div className="chart-wrapper">
          <Line data={data} options={options} />
        </div>
      ) : (
        <div className="chart-empty">
          Enter two parameters to see the phase plot
        </div>
      )}
    </div>
  );
}
