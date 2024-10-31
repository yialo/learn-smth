import { expect, describe, test } from 'vitest';

import { filterRangeInPlace } from './filter-range-in-place';

test.for([
  ['viaCounter', filterRangeInPlace.viaCounter],
  ['viaWhile', filterRangeInPlace.viaWhile],
  ['viaForLoop', filterRangeInPlace.viaForLoop],
])('%s', ([, fn]) => {
  const inputArray = [5, 3, 8, 1];
  const result = fn(inputArray, 1, 4);
  const expected = [3, 1];

  expect(result).toEqual(expected);
  expect(inputArray).toBe(result);
});
