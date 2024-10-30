import { expect, describe, test } from 'vitest';

import { filterRangeInPlace } from './filter-range-in-place';

describe('filterRangeInPlace', () => {
  test('withCounter', () => {
    const inputArray = [5, 3, 8, 1];
    const result = filterRangeInPlace.withCounter(inputArray, 1, 4);
    const expected = [3, 1];
    expect(result).toEqual(expected);
    expect(inputArray).toBe(result);
  });

  test('withWhile', () => {
    const inputArray = [5, 3, 8, 1];
    const result = filterRangeInPlace.withWhile(inputArray, 1, 4);
    const expected = [3, 1];
    expect(result).toEqual(expected);
    expect(inputArray).toBe(result);
  });
});
