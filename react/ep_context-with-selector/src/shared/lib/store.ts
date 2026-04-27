export type Store<T> = {
  subscribe: (onStoreUpdate: () => void) => () => void;
  getState: () => T;
  setState: (nextState: T) => void;
};

export const createStore = <T>(initialState: T): Store<T> => {
  let state = initialState;

  const listeners = new Set<() => void>();

  return {
    subscribe: (onStoreUpdate: () => void) => {
      listeners.add(onStoreUpdate);
      return () => listeners.delete(onStoreUpdate);
    },
    getState: () => state,
    setState: (nextState: T) => {
      state = nextState;
      listeners.forEach((listener) => listener());
    },
  };
};
