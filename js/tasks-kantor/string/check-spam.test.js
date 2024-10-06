'use strict';

const checkSpam = require('./check-spam');

describe('checkSpam', () => {
  test.each([
    ['buy ViAgRA now', true],
    ['free xxxxx', true],
    ['innocent rabbit', false],
  ])('should check for spam string "%s"', (str, expected) => {
    expect((checkSpam(str))).toBe(expected);
  });
});
