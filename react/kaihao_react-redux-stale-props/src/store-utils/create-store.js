export const createStore = (reducer, preloadedState = {}) => {
  let state = preloadedState;

  const listeners = [];

  return {
    getState() {
      return state;
    },

    subscribe(listener) {
      listeners.push(listener);

      return () => {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    },

    dispatch(action) {
      state = reducer(state, action);

      listeners.forEach((listener) => {
        listener();
      });
    },
  };
};
