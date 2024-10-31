import { useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { shallowEqual } from 'shallow-equal';

import { StoreProvider } from '../store-provider/nested-subscription-driven';
import { createSubscription } from '../create-subscription';
import { StoreContext } from '../store-context';

const forceUpdateReducer = (x) => !x;

export const connect = (mapStateToProps) => (WrappedComponent) => {
  const wrappedComponentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const Container = (props) => {
    console.log(`Container of ${wrappedComponentName} is rendering...`);

    const store = useContext(StoreContext);

    const subStore = useMemo(() => {
      const subscription = createSubscription();

      return { ...store, ...subscription };
    }, [store]);

    const [, forceUpdate] = useReducer(forceUpdateReducer, true);

    const stateRef = useRef();
    stateRef.current = mapStateToProps(store.getState(), props);

    const propsRef = useRef();
    propsRef.current = props;

    useEffect(() => {
      console.log(
        `Container of ${wrappedComponentName} makes subscription in useEffect`,
      );

      const unsubscribe = store.subscribe(() => {
        const nextState = mapStateToProps(store.getState(), propsRef.current);

        if (shallowEqual(stateRef.current, nextState)) {
          console.log(
            `Container of ${wrappedComponentName} calls children listeners after shallowEqual returns 'true'`,
          );
          subStore.notifyUpdates();
        } else {
          console.log(
            `Container of ${wrappedComponentName} perform forceUpdate`,
          );
          forceUpdate();
        }
      });

      return unsubscribe;
    }, [store, subStore]);

    useEffect(() => {
      console.log(
        `Container of ${wrappedComponentName} calls children listeners in useEffect`,
      );
      subStore.notifyUpdates();
    });

    return (
      <StoreProvider store={subStore}>
        <WrappedComponent
          {...props}
          {...stateRef.current}
          dispatch={store.dispatch}
        />
      </StoreProvider>
    );
  };

  Container.displayName = `connected(${wrappedComponentName})`;

  return Container;
};
