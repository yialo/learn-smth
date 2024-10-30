import { describe, test, expect } from 'vitest';

import { checkSpam } from './check-spam';

test.each([
  ['buy ViAgRA now', true],
  ['free xxxxx', true],
  ['innocent rabbit', false],
])('should check for spam string "%s"', (str, expected) => {
  expect(checkSpam(str)).toBe(expected);
});
