import * as React from 'react';

import { HeavyThing } from '../slow-things/heavy-thing';

import './search-page.css';

const applyTransition = true;
const applyTransitionHook = true;

export const SearchPage: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [isQueryPending, startQueryTransition] = React.useTransition();

  const getQueryTransition = (newQuery: string) => () => {
    setQuery(newQuery);
  };

  const updateQuery = (newQuery: string) => {
    if (!applyTransition) {
      setQuery(newQuery);
    } else if (applyTransitionHook) {
      startQueryTransition(getQueryTransition(newQuery));
    } else {
      React.startTransition(getQueryTransition(newQuery));
    }
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

      <hr />

      <HeavyThing text={query} />
    </div>
  );
};
