import { useState, useMemo, useCallback, useRef } from 'react';
import type { FilterType, SolveFor } from './types';
import { parseEngNotation } from './utils/parseEngNotation';
import { solveFc, solveC, solveR } from './utils/filterMath';
import { toEngResistance, toEngCapacitance, toEngFrequency } from './utils/formatters';
import { FilterToggle } from './components/FilterToggle';
import { ParameterPanel } from './components/ParameterPanel';
import { CircuitDiagram } from './components/CircuitDiagram';
import { BodePlot } from './components/BodePlot';
import { PhasePlot } from './components/PhasePlot';
import './App.css';

export default function App() {
  const [filterType, setFilterType] = useState<FilterType>('lowpass');
  const [rInput, setRInput] = useState('1k');
  const [cInput, setCInput] = useState('100n');
  const [fcInput, setFcInput] = useState('');
  const [solveFor, setSolveFor] = useState<SolveFor>('fc');

  // Track edit order to determine which field to solve for.
  // editOrder[0] is most recently edited, editOrder[1] is second most recent.
  const editOrder = useRef<SolveFor[]>(['C', 'R']);

  const markEdited = useCallback((field: SolveFor) => {
    editOrder.current = [field, ...editOrder.current.filter((f) => f !== field)].slice(0, 2);
    // The field NOT in the last-two-edited becomes the solve target
    const allFields: SolveFor[] = ['R', 'C', 'fc'];
    const newSolveFor = allFields.find((f) => !editOrder.current.includes(f)) ?? 'fc';
    setSolveFor(newSolveFor);
  }, []);

  const handleRChange = useCallback(
    (v: string) => {
      setRInput(v);
      markEdited('R');
    },
    [markEdited],
  );

  const handleCChange = useCallback(
    (v: string) => {
      setCInput(v);
      markEdited('C');
    },
    [markEdited],
  );

  const handleFcChange = useCallback(
    (v: string) => {
      setFcInput(v);
      markEdited('fc');
    },
    [markEdited],
  );

  // Compute the solved value
  const { computedValue, resolvedFc } = useMemo(() => {
    const r = parseEngNotation(rInput);
    const c = parseEngNotation(cInput);
    const fc = parseEngNotation(fcInput);

    let computed: number | null = null;
    let resFc: number | null = null;

    switch (solveFor) {
      case 'fc':
        if (!isNaN(r) && r > 0 && !isNaN(c) && c > 0) {
          computed = solveFc(r, c);
          resFc = computed;
        }
        break;
      case 'C':
        if (!isNaN(r) && r > 0 && !isNaN(fc) && fc > 0) {
          computed = solveC(r, fc);
          resFc = fc;
        }
        break;
      case 'R':
        if (!isNaN(c) && c > 0 && !isNaN(fc) && fc > 0) {
          computed = solveR(c, fc);
          resFc = fc;
        }
        break;
    }

    return { computedValue: computed, resolvedFc: resFc };
  }, [rInput, cInput, fcInput, solveFor]);

  // When the computed field is focused, populate it with the computed value
  // as a parseable string and shift the solve target.
  const handleFieldFocus = useCallback(
    (field: SolveFor) => {
      if (computedValue !== null) {
        if (field === 'R') setRInput(toEngResistance(computedValue));
        else if (field === 'C') setCInput(toEngCapacitance(computedValue));
        else setFcInput(toEngFrequency(computedValue));
      }
      markEdited(field);
    },
    [markEdited, computedValue],
  );

  return (
    <>
      <header className="header">
        <h1>RC Filter Calculator</h1>
        <FilterToggle value={filterType} onChange={setFilterType} />
      </header>

      <div className="top-section">
        <ParameterPanel
          rInput={rInput}
          cInput={cInput}
          fcInput={fcInput}
          solveFor={solveFor}
          computedValue={computedValue}
          onRChange={handleRChange}
          onCChange={handleCChange}
          onFcChange={handleFcChange}
          onFieldFocus={handleFieldFocus}
        />
        <CircuitDiagram filterType={filterType} />
      </div>

      <BodePlot fc={resolvedFc} filterType={filterType} />
      <PhasePlot fc={resolvedFc} filterType={filterType} />
    </>
  );
}
