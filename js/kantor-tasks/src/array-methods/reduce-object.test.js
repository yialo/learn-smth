import { test, expect } from 'vitest';

import { groupById } from './reduce-object';

test('just works', () => {
  const input = [
    { id: 'john', name: 'John Smith', age: 20 },
    { id: 'ann', name: 'Ann Smith', age: 24 },
    { id: 'pete', name: 'Pete Peterson', age: 31 },
  ];
  const result = groupById(input);
  const expected = {
    john: { id: 'john', name: 'John Smith', age: 20 },
    ann: { id: 'ann', name: 'Ann Smith', age: 24 },
    pete: { id: 'pete', name: 'Pete Peterson', age: 31 },
  };
  expect(result).toEqual(expected);
});
