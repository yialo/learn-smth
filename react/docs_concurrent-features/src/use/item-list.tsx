import * as React from 'react';

import { throwOverTime, fetchData } from './utils';

const dataPromise = fetchData();
const rejectedPromise = throwOverTime();

export const ItemList: React.FC = () => {
  return (
    <React.Suspense fallback="Loading...">
      <Internal />
    </React.Suspense>
  );
};

const Internal: React.FC = () => {
  const data: {
    results: {
      uid: string;
      name: string;
    }[];
  } = React.use(dataPromise);
  // React.use(rejectedPromise);

  return (
    <ul>
      {data.results.map((result) => (
        <li key={result.uid}>{result.name}</li>
      ))}
    </ul>
  );
};
