import './ParameterField.css';

interface Props {
  label: string;
  unit: string;
  value: string;
  computedDisplay: string | null; // non-null when this field is being computed
  placeholder: string;
  hint: string;
  isError: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
}

export function ParameterField({
  label,
  unit,
  value,
  computedDisplay,
  placeholder,
  hint,
  isError,
  onChange,
  onFocus,
}: Props) {
  const isComputed = computedDisplay !== null;

  return (
    <div className="param-field">
      <label className="param-field__label">
        {label}
        {isComputed && <span className="param-field__badge">calculated</span>}
      </label>
      <div className="param-field__input-wrap">
        {isComputed ? (
          <input
            className="param-field__input param-field__input--computed"
            type="text"
            value={computedDisplay}
            placeholder={placeholder}
            readOnly
            onFocus={onFocus}
          />
        ) : (
          <input
            className={`param-field__input${isError ? ' param-field__input--error' : ''}`}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        <span className="param-field__unit">{unit}</span>
      </div>
      <span className="param-field__hint">{hint}</span>
    </div>
  );
}
