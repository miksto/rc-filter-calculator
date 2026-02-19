import type { FilterType } from '../types';
import './CircuitDiagram.css';

interface Props {
  filterType: FilterType;
}

function LowPassSVG() {
  return (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      {/* Vin label */}
      <text x="12" y="68" className="label">Vin</text>

      {/* Input wire */}
      <line x1="42" y1="64" x2="80" y2="64" className="wire" />

      {/* Resistor (IEC rectangle) */}
      <rect x="80" y="52" width="60" height="24" className="component" rx="2" />
      <text x="97" y="46" className="label-accent">R</text>

      {/* Wire from resistor to junction */}
      <line x1="140" y1="64" x2="200" y2="64" className="wire" />

      {/* Junction dot */}
      <circle cx="200" cy="64" r="3" fill="var(--text-secondary)" />

      {/* Wire to Vout */}
      <line x1="200" y1="64" x2="260" y2="64" className="wire" />
      <text x="266" y="68" className="label">Vout</text>

      {/* Capacitor (parallel plates) - vertical */}
      <line x1="200" y1="64" x2="200" y2="96" className="wire" />
      <line x1="188" y1="96" x2="212" y2="96" className="component" strokeWidth="2.5" />
      <line x1="188" y1="106" x2="212" y2="106" className="component" strokeWidth="2.5" />
      <text x="216" y="105" className="label-accent">C</text>
      <line x1="200" y1="106" x2="200" y2="130" className="wire" />

      {/* Ground symbol */}
      <line x1="188" y1="130" x2="212" y2="130" className="ground" />
      <line x1="192" y1="136" x2="208" y2="136" className="ground" />
      <line x1="196" y1="142" x2="204" y2="142" className="ground" />

      {/* Input ground return */}
      <line x1="42" y1="130" x2="42" y2="64" className="wire" strokeDasharray="4 3" strokeOpacity="0.3" />
      <line x1="42" y1="130" x2="200" y2="130" className="wire" strokeDasharray="4 3" strokeOpacity="0.3" />
    </svg>
  );
}

function HighPassSVG() {
  return (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      {/* Vin label */}
      <text x="12" y="68" className="label">Vin</text>

      {/* Input wire */}
      <line x1="42" y1="64" x2="80" y2="64" className="wire" />

      {/* Capacitor (parallel plates) - horizontal */}
      <line x1="80" y1="64" x2="100" y2="64" className="wire" />
      <line x1="100" y1="48" x2="100" y2="80" className="component" strokeWidth="2.5" />
      <line x1="110" y1="48" x2="110" y2="80" className="component" strokeWidth="2.5" />
      <line x1="110" y1="64" x2="130" y2="64" className="wire" />
      <text x="92" y="42" className="label-accent">C</text>

      {/* Wire from capacitor to junction */}
      <line x1="130" y1="64" x2="200" y2="64" className="wire" />

      {/* Junction dot */}
      <circle cx="200" cy="64" r="3" fill="var(--text-secondary)" />

      {/* Wire to Vout */}
      <line x1="200" y1="64" x2="260" y2="64" className="wire" />
      <text x="266" y="68" className="label">Vout</text>

      {/* Resistor (IEC rectangle) - vertical */}
      <line x1="200" y1="64" x2="200" y2="82" className="wire" />
      <rect x="188" y="82" width="24" height="36" className="component" rx="2" />
      <text x="216" y="105" className="label-accent">R</text>
      <line x1="200" y1="118" x2="200" y2="130" className="wire" />

      {/* Ground symbol */}
      <line x1="188" y1="130" x2="212" y2="130" className="ground" />
      <line x1="192" y1="136" x2="208" y2="136" className="ground" />
      <line x1="196" y1="142" x2="204" y2="142" className="ground" />

      {/* Input ground return */}
      <line x1="42" y1="130" x2="42" y2="64" className="wire" strokeDasharray="4 3" strokeOpacity="0.3" />
      <line x1="42" y1="130" x2="200" y2="130" className="wire" strokeDasharray="4 3" strokeOpacity="0.3" />
    </svg>
  );
}

export function CircuitDiagram({ filterType }: Props) {
  return (
    <div className="circuit-diagram">
      <div className="circuit-diagram__title">Circuit</div>
      <div className="circuit-diagram__svg-wrap" key={filterType}>
        {filterType === 'lowpass' ? <LowPassSVG /> : <HighPassSVG />}
      </div>
    </div>
  );
}
