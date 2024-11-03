import { test, expect } from 'vitest';

import { shuffle } from './shuffle';

test('just works', () => {
  const input = [1, 2, 3, 4, 5];
  const shuffled = shuffle(input);
  expect(shuffled).toHaveLength(input.length);
  expect(shuffled).toEqual(expect.arrayContaining(input));
});
