import { expect, test } from 'vitest';

import {
  ArgListIterator,
  NoSuchElementException,
} from './arg-list-iterator.ts';

test('ArgListIterator', () => {
  const argList = ['a', 'b', 'c'];
  const iterator = new ArgListIterator(argList);

  expect(iterator.hasPrevious()).toBe(false);
  expect(iterator.previousIndex()).toBe(-1);
  assertPreviousElementException(iterator);

  expect(iterator.hasNext()).toBe(true);
  expect(iterator.nextIndex()).toBe(0);

  expect(iterator.next()).toBe('a');
  expect(iterator.next()).toBe('b');
  expect(iterator.next()).toBe('c');
  expect(iterator.hasNext()).toBe(false);
  expect(iterator.nextIndex()).toBe(-1);
  assertNextElementException(iterator);

  expect(iterator.previous()).toBe('b');
  expect(iterator.previous()).toBe('a');
  expect(iterator.hasPrevious()).toBe(false);
  expect(iterator.previousIndex()).toBe(-1);
  assertPreviousElementException(iterator);
});

const assertPreviousElementException = (iterator: ArgListIterator) => {
  try {
    iterator.previous();
  } catch (error) {
    expect(error).toBeInstanceOf(NoSuchElementException);
    if (error instanceof NoSuchElementException) {
      expect(error.message).toMatch('previous');
    }
  }
};

const assertNextElementException = (iterator: ArgListIterator) => {
  try {
    iterator.next();
  } catch (error) {
    expect(error).toBeInstanceOf(NoSuchElementException);
    if (error instanceof NoSuchElementException) {
      expect(error.message).toMatch('next');
    }
  }
};
