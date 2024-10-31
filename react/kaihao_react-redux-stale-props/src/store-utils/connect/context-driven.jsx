import { useContext } from 'react';

import { StoreContext } from '../store-context';

export const connect = (mapStateToProps) => (WrappedComponent) => {
  const wrappedComponentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const Container = (props) => {
    console.log(`Container of ${wrappedComponentName} is rendering...`);

    const { state, dispatch } = useContext(StoreContext);

    const mappedState = mapStateToProps(state, props);

    return <WrappedComponent {...props} {...mappedState} dispatch={dispatch} />;
  };

  Container.displayName = `connected(${wrappedComponentName})`;

  return Container;
};
