import { describe, it, expect } from 'vitest';
import { normalizeName } from '../normalizeName';

describe('normalizeName', () => {
  it('returns "—" when name is "Unknown"', () => {
    expect(normalizeName('Unknown')).toBe('—');
  });

  it('returns the same string when name is not "Unknown"', () => {
    expect(normalizeName('Allegro')).toBe('Allegro');
    expect(normalizeName('Shoper')).toBe('Shoper');
  });

  it('is not case sensitive', () => {
    expect(normalizeName('unknown')).toBe('—');
    expect(normalizeName('UNKNOWN')).toBe('—');
  });
});
