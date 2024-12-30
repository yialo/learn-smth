import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './search-page.css';

import { ItemList } from '../use/item-list';

export const SearchPage: React.FC = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ItemList />
    </ErrorBoundary>
  );
};
