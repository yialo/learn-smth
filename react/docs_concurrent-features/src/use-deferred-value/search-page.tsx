import * as React from 'react';

import { HeavyThing } from '../slow-things/heavy-thing';
import { SlowList } from '../slow-things/slow-list';

import './search-page.css';

const showHeavyThing = true;

export const SearchPage: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const deferredQuery = React.useDeferredValue(query);

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
      </label>

      <div className="row">
        <span>deferredQuery:</span>
        <output>{deferredQuery}</output>
      </div>

      <hr />

      {showHeavyThing ? (
        <HeavyThing text={deferredQuery} />
      ) : (
        <SlowList text={deferredQuery} />
      )}
    </div>
  );
};
