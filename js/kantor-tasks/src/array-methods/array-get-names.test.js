import { test, expect } from 'vitest';

import { usersToNames } from './array-get-names';

test('just works', () => {
  const input = [
    { name: 'Вася', age: 25 },
    { name: 'Петя', age: 30 },
    { name: 'Маша', age: 28 },
  ];
  const result = usersToNames(input);
  const expected = ['Вася', 'Петя', 'Маша'];
  expect(result).toEqual(expected);
});
