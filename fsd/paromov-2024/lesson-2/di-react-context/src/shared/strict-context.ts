import * as React from 'react';

export const createStrictContext = <V>() => {
  return React.createContext<V | undefined>(undefined);
};

export const useStrictContext = <V>(Context: React.Context<V>) => {
  const value = React.useContext(Context);

  if (value === undefined) {
    throw new Error(
      `Hook must be used within a ${Context.displayName || 'Context'}.Provider`,
    );
  }

  return value;
};
