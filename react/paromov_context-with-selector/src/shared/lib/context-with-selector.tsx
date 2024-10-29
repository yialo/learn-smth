import * as React from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import { useStrictContext } from './strict-context';
import { Store, createStore } from './store';

type ContextWithSelector<T> = React.Context<Store<T> | undefined> & {
  useSelector: <R>(selector: (state: T) => R) => R;
};

export const createContextWithSelector = <T,>(
  displayName?: string,
): ContextWithSelector<T> => {
  const Context = React.createContext<Store<T> | undefined>(undefined);

  const Provider = ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: T;
  }) => {
    const [store] = React.useState(() => createStore(value));

    React.useLayoutEffect(() => {
      store.setState(value);
    }, [store, value]);

    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  const useSelector = <R,>(selector: (state: T) => R) => {
    const store = useStrictContext(Context);

    /*
      const getState = () => selector(store.getState());
      return React.useSyncExternalStore(store.subscribe, getState, getState);
    */

    return useSyncExternalStoreWithSelector(
      store.subscribe,
      store.getState,
      null,
      selector,
    );
  };

  Context.Provider = Provider as ContextWithSelector<T>['Provider'];
  (Context as ContextWithSelector<T>).useSelector = useSelector;
  Context.displayName = displayName;

  return Context as ContextWithSelector<T>;
};
