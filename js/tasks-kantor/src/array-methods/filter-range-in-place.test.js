import { expect, describe, test } from 'vitest';

import { filterRangeInPlace } from './filter-range-in-place';

test('viaCounter', () => {
  const inputArray = [5, 3, 8, 1];
  const result = filterRangeInPlace.viaCounter(inputArray, 1, 4);
  const expected = [3, 1];
  expect(result).toEqual(expected);
  expect(inputArray).toBe(result);
});

test('viaWhile', () => {
  const inputArray = [5, 3, 8, 1];
  const result = filterRangeInPlace.viaWhile(inputArray, 1, 4);
  const expected = [3, 1];
  expect(result).toEqual(expected);
  expect(inputArray).toBe(result);
});

test('viaForLoop', () => {
  const inputArray = [5, 3, 8, 1];
  const result = filterRangeInPlace.viaForLoop(inputArray, 1, 4);
  const expected = [3, 1];
  expect(result).toEqual(expected);
  expect(inputArray).toBe(result);
});
