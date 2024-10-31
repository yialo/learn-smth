import { expect, describe, test } from 'vitest';

import { camelize } from './camelcase.js';

test.for([
  ['background-color', 'backgroundColor'],
  ['list-style-image', 'listStyleImage'],
  ['-webkit-transition', 'WebkitTransition'],
])('camelize(%s) -> %s', ([input, expected]) => {
  const result = camelize(input);
  expect(result).toBe(expected);
});
