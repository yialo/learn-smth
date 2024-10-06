'use strict';

const { createArray } = require('./create-array');

describe('Create array', () => {
  test('should just work', () => {
    const result = createArray();
    const expected = ['Рэп', 'Регги', 'Классика', 'Рок-н-ролл'];
    expect(result).toEqual(expected);
  });
});
