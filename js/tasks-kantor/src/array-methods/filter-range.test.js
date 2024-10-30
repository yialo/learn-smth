import { expect, describe, test } from 'vitest';

import { filterRange } from './filter-range';

describe('filterRange', () => {
  test('just works', () => {
    const result = filterRange([5, 3, 8, 1], 1, 4);
    const expected = [3, 1];
    expect(result).toEqual(expected);
  });
});
