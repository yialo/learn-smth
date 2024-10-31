import { test, expect } from 'vitest';

import { copySorted } from './copy-sort-array';

test('just works', () => {
  const input = ['HTML', 'JavaScript', 'CSS'];
  const result = copySorted(input);
  const expected = ['CSS', 'HTML', 'JavaScript'];
  expect(result).toEqual(expected);
  expect(input).not.toBe(result);
});
