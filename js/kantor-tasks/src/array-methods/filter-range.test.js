import { expect, describe, test } from 'vitest';

import { filterRange } from './filter-range';

test('just works', () => {
  const inputArray = [5, 3, 8, 1];
  const result = filterRange(inputArray, 1, 4);
  const expected = [3, 1];
  expect(result).toEqual(expected);
  expect(inputArray).not.toBe(result);
});
