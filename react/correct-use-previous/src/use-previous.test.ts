import { describe, test, expect } from 'vitest';
import { waitFor, renderHook } from '@testing-library/react';

import { usePreviousStandard, usePreviousPersistent } from './use-previous';

test('usePreviousStandard', async () => {
  const { result, rerender } = renderHook(
    ({ value }) => usePreviousStandard(value),
    {
      initialProps: {
        value: 100,
      },
    },
  );
  expect(result.current).toBe(undefined);

  rerender({ value: 300 });
  await waitFor(() => expect(result.current).toBe(100));

  rerender({ value: 200 });
  await waitFor(() => expect(result.current).toBe(300));

  rerender({ value: 200 });
  await waitFor(() => expect(result.current).toBe(200));
});

describe('usePreviousPersistent', () => {
  test('should work with primitives', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePreviousPersistent(value),
      {
        initialProps: {
          value: 100,
        },
      },
    );
    expect(result.current).toBe(undefined);

    rerender({ value: 300 });
    await waitFor(() => expect(result.current).toBe(100));

    rerender({ value: 200 });
    await waitFor(() => expect(result.current).toBe(300));

    rerender({ value: 200 });
    await waitFor(() => expect(result.current).toBe(300));
  });

  test('should work with objects', async () => {
    type Person = {
      name: string;
      age: number;
    };
    const arePersonsEqual = (prev: Person | undefined, next: Person) =>
      prev?.name === next.name && prev?.age === next.age;

    const bob: Person = {
      name: 'Bob',
      age: 30,
    };
    const alice: Person = {
      name: 'Alice',
      age: 25,
    };
    const john: Person = {
      name: 'John',
      age: 40,
    };

    const { result, rerender } = renderHook(
      ({ value }) => usePreviousPersistent(value, arePersonsEqual),
      {
        initialProps: {
          value: bob,
        },
      },
    );
    expect(result.current).toBe(undefined);

    rerender({
      value: alice,
    });
    await waitFor(() => expect(result.current).toBe(bob));

    rerender({
      value: john,
    });
    await waitFor(() => expect(result.current).toBe(alice));
  });
});
