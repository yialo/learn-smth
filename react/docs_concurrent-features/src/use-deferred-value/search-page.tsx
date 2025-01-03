import * as React from 'react';

import { HeavyThing } from '../slow-things/heavy-thing';
import { SlowList } from '../slow-things/slow-list';

import './search-page.css';

const applyDeferring = true;
const showHeavyThing = true;

export const SearchPage: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const deferredQuery = React.useDeferredValue(query);

  const appliedQuery = applyDeferring ? deferredQuery : query;
  const isQueryPending = deferredQuery !== query;

  return (
    <div>
      <label className="row">
        <span>query</span>
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isQueryPending && <span>Updating...</span>}
      </label>

      <div className="row">
        <span>deferredQuery:</span>
        <output>{appliedQuery}</output>
      </div>

      <hr />

      {showHeavyThing ? (
        <HeavyThing text={appliedQuery} />
      ) : (
        <SlowList text={appliedQuery} />
      )}
    </div>
  );
};
