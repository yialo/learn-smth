import { expect, describe, test } from 'vitest';

import { ArgListIterator } from './arg-list-iterator.ts';

describe('ArgListTracker', () => {
  test('empty list', () => {
    const argList: string[] = [];
    const iterator = new ArgListIterator(argList);

    expect(iterator.current()).toBeUndefined();

    expect(iterator.hasPrevious()).toBe(false);
    expect(iterator.previousIndex()).toBe(-1);
    expect(iterator.previous()).toBe(iterator.current());

    expect(iterator.hasNext()).toBe(false);
    expect(iterator.nextIndex()).toBe(-1);
    expect(iterator.next()).toBe(iterator.current());
  });

  test('non-empty list', () => {
    const argList = ['a', 'b', 'c'];
    const iterator = new ArgListIterator(argList);

    expect(iterator.current()).toBeUndefined();

    expect(iterator.hasPrevious()).toBe(false);
    expect(iterator.previousIndex()).toBe(-1);
    expect(iterator.previous()).toBe(iterator.current());

    expect(iterator.hasNext()).toBe(true);
    expect(iterator.nextIndex()).toBe(0);

    expect(iterator.next()).toBe('a');
    expect(iterator.next()).toBe('b');
    expect(iterator.next()).toBe('c');
    expect(iterator.hasNext()).toBe(false);
    expect(iterator.nextIndex()).toBe(iterator.currentIndex());
    expect(iterator.next()).toBe(iterator.current());

    expect(iterator.previous()).toBe('b');
    expect(iterator.previous()).toBe('a');
    expect(iterator.hasPrevious()).toBe(false);
    expect(iterator.previousIndex()).toBe(0);
    expect(iterator.previous()).toBe(iterator.current());
  });
});
