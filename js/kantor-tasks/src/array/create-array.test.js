import { describe, test, expect } from 'vitest';

import { createArray } from './create-array';

test('should just work', () => {
  const result = createArray();
  const expected = ['Рэп', 'Регги', 'Классика', 'Рок-н-ролл'];
  expect(result).toEqual(expected);
});
