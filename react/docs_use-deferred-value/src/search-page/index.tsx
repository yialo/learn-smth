import * as React from 'react';
import './styles.css';
import { ErrorBoundary } from 'react-error-boundary';

import { ItemList } from './item-list';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const deferredQuery = React.useDeferredValue(query);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div>
        <label className="row">
          <span>query</span>
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <div className="row">
          <span>deferredQuery</span>
          <output>{deferredQuery}</output>
        </div>

        <hr />

        <ItemList />
      </div>
    </ErrorBoundary>
  );
};
