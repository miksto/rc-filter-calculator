import type { FilterType } from '../types';
import './FilterToggle.css';

interface Props {
  value: FilterType;
  onChange: (type: FilterType) => void;
}

export function FilterToggle({ value, onChange }: Props) {
  const toggle = () => onChange(value === 'lowpass' ? 'highpass' : 'lowpass');

  return (
    <div className="filter-toggle" onClick={toggle}>
      <div
        className={`filter-toggle__slider${value === 'highpass' ? ' filter-toggle__slider--highpass' : ''}`}
      />
      <button
        className={`filter-toggle__btn${value === 'lowpass' ? ' filter-toggle__btn--active' : ''}`}
      >
        Low-Pass
      </button>
      <button
        className={`filter-toggle__btn${value === 'highpass' ? ' filter-toggle__btn--active' : ''}`}
      >
        High-Pass
      </button>
    </div>
  );
}
