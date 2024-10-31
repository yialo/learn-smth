import { test, expect } from 'vitest';

import { Calculator } from './calculator-extendable';

test('calculates', () => {
  const calc = new Calculator();

  expect(calc.calculate('2 + 3')).toBe(5);
  expect(calc.calculate('8 - 2')).toBe(6);

  calc.addMethod('*', (a, b) => a * b);
  expect(calc.calculate('7 * 8')).toBe(56);

  calc.addMethod('/', (a, b) => a / b);
  expect(calc.calculate('45 / 9')).toBe(5);

  calc.addMethod('**', (a, b) => a ** b);
  expect(calc.calculate('3 ** 4')).toBe(81);

  expect(() => calc.calculate('2 ! 3')).toThrow();
  expect(() => calc.calculate('2 + a')).toThrow();
  expect(() => calc.calculate('cs + 4')).toThrow();
  expect(() => calc.calculate('1 + 2 - 4')).toThrow();
});
