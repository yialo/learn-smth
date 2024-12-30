import * as React from 'react';

import { HeavyThing } from '../heavy-thing';

import './search-page.css';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [isQueryPending, startQueryTransition] = React.useTransition();

  const getQueryTransition = (newQuery: string) => () => {
    setQuery(newQuery);
  };

  const updateQuery = (newQuery: string) => {
    React.startTransition(getQueryTransition(newQuery));
    // startQueryTransition(getQueryTransition(newQuery));
  };

  return (
    <div>
      <label className="row">
        <span>query</span>
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
        />
      </label>

      <div className="row">
        <span>deferredQuery</span>
        <output>{query}</output>
      </div>

      <hr />

      <HeavyThing text={query} />
    </div>
  );
};
