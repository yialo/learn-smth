import * as React from 'react';

import { HeavyThing } from '../heavy-thing';

import './search-page.css';

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
        <span>deferredQuery</span>
        <output>{query}</output>
      </div>

      <hr />

      <HeavyThing text={deferredQuery} />
    </div>
  );
};
