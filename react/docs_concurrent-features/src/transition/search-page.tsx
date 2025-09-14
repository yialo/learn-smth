import * as React from 'react';

import { HeavyThing } from '../slow-things/heavy-thing';
import { SlowList } from '../slow-things/slow-list';

import './search-page.css';

const applyTransition = true;
const applyTransitionHook = true;
const showHeavyThing = true;

export const SearchPage: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [query_nonBlocking, setQuery_nonBlocking] = React.useState('');
  const [isQueryPending, startQueryTransition] = React.useTransition();

  const getQueryTransition = (newQuery: string) => () => {
    setQuery_nonBlocking(newQuery);
  };

  const updateQuery = (newQuery: string) => {
    if (!applyTransition) {
      setQuery(newQuery);
      setQuery_nonBlocking(newQuery);
    } else if (applyTransitionHook) {
      setQuery(newQuery);
      startQueryTransition(getQueryTransition(newQuery));
    } else {
      setQuery(newQuery);
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
        {isQueryPending && <span>Updating...</span>}
      </label>

      <hr />

      {showHeavyThing ? (
        <HeavyThing text={query_nonBlocking} />
      ) : (
        <SlowList text={query_nonBlocking} />
      )}
    </div>
  );
};
