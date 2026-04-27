import * as React from 'react';

import { Lang } from '../types';

export const LangContext = React.createContext<Lang | undefined>(undefined);
LangContext.displayName = 'LangContext';

export const useLang = () => {
  const context = React.useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};
