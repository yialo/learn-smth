import { test, expect } from 'vitest';

import { sortBack } from './sort-back';

test('just works', () => {
  const result = sortBack([5, 2, 1, -10, 8]);
  const expected = [8, 5, 2, 1, -10];
  expect(result).toEqual(expected);
});
