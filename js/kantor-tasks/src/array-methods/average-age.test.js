import { test, expect } from 'vitest';

import { getAverageAge } from './average-age';

test('just works', () => {
  const input = [
    { name: 'Вася', age: 25 },
    { name: 'Петя', age: 30 },
    { name: 'Маша', age: 29 },
  ];
  const result = getAverageAge(input);
  const expected = 28;
  expect(result).toBe(expected);
});
