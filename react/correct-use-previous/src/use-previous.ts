import * as React from 'react';

export const usePreviousStandard = <V>(value: V) => {
  const ref = React.useRef<V>(undefined);

  React.useEffect(() => {
    console.log('[usePreviousStandard] effect fires, value:', value);

    ref.current = value;
  }, [value]);

  // eslint-disable-next-line react-hooks/refs
  return ref.current;
};

export const usePreviousPersistent = <V>(
  value: V,
  equalityFn: (prev: V | undefined, next: V) => boolean = (prev, next) =>
    prev === next,
) => {
  const [state, setState] = React.useState<{
    value: V;
    prev: V | undefined;
  }>({
    value,
    prev: undefined,
  });

  const current = state.value;

  if (!equalityFn(current, value)) {
    setState({
      value,
      prev: current,
    });
  }

  return state.prev;
};

// Fairly tracks EVERY render

export const usePrevious = <T>(value: T) => {
  const previousRef = React.useRef<T | undefined>(undefined);
  const [previous, setPrevious] = React.useState<T | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    const oldValue = previousRef.current;
    previousRef.current = value;
    setPrevious(oldValue);
  });

  return previous;
};

const useIsomorphicLayoutEffect =
  typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;
