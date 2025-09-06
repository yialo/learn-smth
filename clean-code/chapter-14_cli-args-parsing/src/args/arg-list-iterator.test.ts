import { expect, test } from 'vitest';

import { ArgListIterator } from './arg-list-iterator.ts';

test('ArgListTracker', () => {
  const argList = ['a', 'b', 'c'];
  const argListIterator = new ArgListIterator(argList);

  expect(argListIterator.current()).toBeUndefined();
  expect(argListIterator.next()).toBe('a');
  expect(argListIterator.next()).toBe('b');
  expect(argListIterator.next()).toBe('c');
  expect(argListIterator.next()).toBe('c');
  expect(argListIterator.previous()).toBe('b');
  expect(argListIterator.previous()).toBe('a');
  expect(argListIterator.previous()).toBe('a');
});
