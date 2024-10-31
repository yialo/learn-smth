import { useEffect, useMemo, useState } from 'react';

import { StoreContext } from '../store-context';

export const StoreProvider = ({ children, store }) => {
  const [state, setState] = useState(() => store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });

    return unsubscribe;
  }, [store]);

  const context = useMemo(() => ({ ...store, state }), [store, state]);

  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
};
