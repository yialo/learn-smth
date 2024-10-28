import * as React from 'react';

const emptySubscribe = () => () => {};

export const useContextWithSelector = <T, R>(
  Context: React.Context<T>,
  selector: (v: T) => R,
) => {
  const contextValue = React.useContext(Context);

  const store = React.useSyncExternalStore(
    emptySubscribe,
    () => selector(contextValue),
    () => selector(contextValue),
  );

  return store;
};
