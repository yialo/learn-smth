export const createSubscription = () => {
  const listeners = [];

  return {
    subscribe(listener) {
      listeners.push(listener);

      const unsubscribe = () => {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };

      return unsubscribe;
    },

    notifyUpdates() {
      listeners.forEach((listener) => {
        listener();
      });
    },
  };
};
