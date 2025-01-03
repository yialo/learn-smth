import { describe, test, expect } from 'vitest';

import { ucFirst } from './ucfirst';

test('should return string with first letter capitalized', () => {
  const result = ucFirst('bob');
  const expected = 'Bob';
  expect(result).toBe(expected);
});

test('should return correct result for emptyp string', () => {
  const result = ucFirst('');
  const expected = '';
  expect(result).toBe(expected);
});
