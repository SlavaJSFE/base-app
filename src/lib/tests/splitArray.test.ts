import { splitArray } from '../splitArray';

describe('splitArray', () => {
  it('splits array evenly when divisible', () => {
    const arr = [1, 2, 3, 4];
    const result = splitArray(arr, 2);

    expect(result.columns).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(result.columnLength).toBe(2);
  });

  it('returns correct columnLength when first chunk is larger', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const result = splitArray(arr, 3);

    expect(result.columns).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    expect(result.columnLength).toBe(3);
  });

  it('works with generic types (string)', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const result = splitArray(arr, 2);

    expect(result.columns).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
    expect(result.columnLength).toBe(2);
  });
});
