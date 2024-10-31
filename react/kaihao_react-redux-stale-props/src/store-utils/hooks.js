import * as React from 'react';

import { StoreContext } from './store-context';

const reducer = (x) => !x;

export const useSelector = (selector) => {
  const store = React.useContext(StoreContext);

  const forceUpdate = React.useReducer(reducer, false)[1];

  const stateDataRef = React.useRef();
  const stateData = selector(store.getState());

  React.useEffect(() => {
    stateDataRef.current = stateData;
  });

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      try {
        const nextStateData = selector(store.getState());

        if (nextStateData === stateDataRef.current) {
          return;
        }
      } catch {
        console.warn('Stale props error caught!');
      }

      forceUpdate();
    });

    return unsubscribe;
  }, [store, selector, forceUpdate]);

  return stateData;
};

export const useDispatch = () => React.useContext(StoreContext).dispatch;
