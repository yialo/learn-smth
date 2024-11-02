import { test, expect } from 'vitest';

import { sortByAgeAsc } from './sort-objects';

test('just works', () => {
  const input = [
    { name: 'Вася', age: 25 },
    { name: 'Петя', age: 30 },
    { name: 'Маша', age: 28 },
  ];

  const result = sortByAgeAsc(input);
  const expected = [
    { name: 'Вася', age: 25 },
    { name: 'Маша', age: 28 },
    { name: 'Петя', age: 30 },
  ];
  expect(result).toEqual(expected);
  expect(result).not.toBe(input);
});
