import { test, expect } from 'vitest';

import { uniqueSlow } from './array-unique';

const setup = () => {
  const input = [
    'кришна',
    'кришна',
    'харе',
    'харе',
    'харе',
    'харе',
    'кришна',
    'кришна',
    ':-O',
  ];
  const expected = ['кришна', 'харе', ':-O'];
  return { input, expected };
};

test('uniqueSlow', () => {
  const { input, expected } = setup();
  const result = uniqueSlow(input);
  expect(result).toEqual(expect.arrayContaining(expected));
});

test('uniqueFast', () => {
  const { input, expected } = setup();
  const result = uniqueSlow(input);
  expect(result).toEqual(expect.arrayContaining(expected));
});
