import * as React from 'react';

import { throwOverTime, fetchData } from './utils';

export const ItemList: React.FC = () => {
  return (
    <React.Suspense fallback="Loading...">
      <Internal />
    </React.Suspense>
  );
};

// const data = { results: [{ uid: '1', name: 'Luke Skywalker' }] };

const dataPromise = fetchData();
// const rejectedPromise = throwOverTime();

const Internal: React.FC = () => {
  /* const dataPromise = React.useMemo(() => {
    console.log('useMemo called');
    return fetchData();
  }, []);

  const previousDataPromise = usePrevious(dataPromise);

  console.log(
    'dataPromise === dataPromise',
    dataPromise === previousDataPromise,
  ); */

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

const usePrevious = <T,>(value: T) => {
  const ref_previous = React.useRef<T | undefined>(undefined);

  React.useEffect(() => {
    ref_previous.current = value;
  }, [value]);

  return ref_previous.current;
};
