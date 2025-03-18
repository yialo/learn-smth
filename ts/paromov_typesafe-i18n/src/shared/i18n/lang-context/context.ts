import * as React from 'react';

export const LangContext = React.createContext<string | undefined>(undefined);
LangContext.displayName = 'LangContext';

export const useLang = () => {
  const context = React.useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};
