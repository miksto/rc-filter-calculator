const SUFFIXES: Record<string, number> = {
  p: 1e-12,
  n: 1e-9,
  u: 1e-6,
  'μ': 1e-6,
  m: 1e-3,
  k: 1e3,
  K: 1e3,
  M: 1e6,
  G: 1e9,
};

/**
 * Parse an engineering notation string into a number.
 * Examples: "100k" → 100000, "10n" → 1e-8, "4.7u" → 4.7e-6, "1.59k" → 1590
 * Returns NaN if the string cannot be parsed.
 */
export function parseEngNotation(input: string): number {
  const trimmed = input.trim();
  if (trimmed === '') return NaN;

  // Try plain number first
  const plain = Number(trimmed);
  if (!isNaN(plain)) return plain;

  // Check if last character is a suffix
  const lastChar = trimmed[trimmed.length - 1];
  const multiplier = SUFFIXES[lastChar];
  if (multiplier === undefined) return NaN;

  const numPart = trimmed.slice(0, -1);
  const num = Number(numPart);
  if (isNaN(num)) return NaN;

  return num * multiplier;
}
