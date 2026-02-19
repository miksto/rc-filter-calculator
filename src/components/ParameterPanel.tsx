import type { SolveFor } from '../types';
import { ParameterField } from './ParameterField';
import { formatResistance, formatCapacitance, formatFrequency } from '../utils/formatters';
import { parseEngNotation } from '../utils/parseEngNotation';
import './ParameterPanel.css';

interface Props {
  rInput: string;
  cInput: string;
  fcInput: string;
  solveFor: SolveFor;
  computedValue: number | null;
  onRChange: (v: string) => void;
  onCChange: (v: string) => void;
  onFcChange: (v: string) => void;
  onFieldFocus: (field: SolveFor) => void;
}

export function ParameterPanel({
  rInput,
  cInput,
  fcInput,
  solveFor,
  computedValue,
  onRChange,
  onCChange,
  onFcChange,
  onFieldFocus,
}: Props) {
  const rValid = !rInput || !isNaN(parseEngNotation(rInput));
  const cValid = !cInput || !isNaN(parseEngNotation(cInput));
  const fcValid = !fcInput || !isNaN(parseEngNotation(fcInput));

  const computedR = solveFor === 'R' && computedValue !== null ? `= ${formatResistance(computedValue)}` : null;
  const computedC = solveFor === 'C' && computedValue !== null ? `= ${formatCapacitance(computedValue)}` : null;
  const computedFc = solveFor === 'fc' && computedValue !== null ? `= ${formatFrequency(computedValue)}` : null;

  return (
    <div className="param-panel">
      <div className="param-panel__title">Parameters</div>
      <ParameterField
        label="R"
        unit="Ω"
        value={rInput}
        computedDisplay={computedR}
        placeholder="e.g. 1k, 4.7M"
        hint="Resistance — e.g. 100, 1k, 4.7M"
        isError={rInput !== '' && !rValid && solveFor !== 'R'}
        onChange={onRChange}
        onFocus={() => onFieldFocus('R')}
      />
      <ParameterField
        label="C"
        unit="F"
        value={cInput}
        computedDisplay={computedC}
        placeholder="e.g. 100n, 10p"
        hint="Capacitance — e.g. 10n, 100p, 4.7u"
        isError={cInput !== '' && !cValid && solveFor !== 'C'}
        onChange={onCChange}
        onFocus={() => onFieldFocus('C')}
      />
      <ParameterField
        label="f꜀"
        unit="Hz"
        value={fcInput}
        computedDisplay={computedFc}
        placeholder="e.g. 1k, 159.15"
        hint="Cutoff frequency — e.g. 1k, 455k"
        isError={fcInput !== '' && !fcValid && solveFor !== 'fc'}
        onChange={onFcChange}
        onFocus={() => onFieldFocus('fc')}
      />
    </div>
  );
}
