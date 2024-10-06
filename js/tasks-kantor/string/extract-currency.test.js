'use strict';

const extractCurrencyValue = require('./extract-currency');

describe('extractCurrencyValue', () => {
  test('should return extracted currency value as number', () => {
    const result = extractCurrencyValue('$120.5');
    const expected = 120.5;
    expect(result).toBe(expected);
  });
});
