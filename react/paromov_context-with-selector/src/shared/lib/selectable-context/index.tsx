import * as React from 'react';

type SelectableContext<T> = React.Context<Store<T> | undefined> & {
  useSelector: <R>(selector: (state: T) => R) => R;
};

export const createSelectableContext = <V,>() => {
  const Context = React.createContext<V | undefined>(undefined);

  const Provider = () => {};

  return Context;
};

export const useContextSelector = () => {};

export const useSelectableContext = () => {};
