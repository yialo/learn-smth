import { describe, test, expect } from 'vitest';

import { truncate } from './truncate';

test('should NOT throw if no args presented', () => {
  const expected = truncate();
  expect(expected).toBeUndefined();
});

test.each([
  ['Вот что мне хотелось бы сказать на эту тему:', 20, 'Вот что мне хотелос…'],
  ['Всем привет!', 20, 'Всем привет!'],
])('should correctly truncate string "%s"', (str, maxlength, expected) => {
  expect(truncate(str, maxlength)).toBe(expected);
});
