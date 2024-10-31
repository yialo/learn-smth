import { describe, test, expect } from 'vitest';

import { randomInteger } from './random-int-min-max';

test('should throw if arguments are not integer', () => {
  expect(() => randomInteger(1, 2.5)).toThrowError();
  expect(() => randomInteger(1.2, 4)).toThrowError();
});

test('should return random integer', () => {
  const result = randomInteger(1, 3);

  expect(result).toBeGreaterThanOrEqual(1);
  expect(result).toBeLessThanOrEqual(3);
});
