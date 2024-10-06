'use strict';

const randomInteger = require('./random-int-min-max');

describe('Random integer min-max', () => {
  test('should return random integer', () => {
    const result = randomInteger(1, 1.5);
    const expected = 1;

    expect(result).toBe(expected);
  });
})
