import * as React from 'react';

export const useStrictContext = <V>(
  Context: React.Context<V>,
  errorMessage?: string,
) => {
  const value = React.useContext(Context);

  if (value === undefined) {
    throw new Error(
      errorMessage || 'Hook must be used within a ContextProvider',
    );
  }

  return value;
};
