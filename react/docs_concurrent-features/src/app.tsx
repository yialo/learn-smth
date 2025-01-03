import { SearchPage as SearchPageWithUse } from './use';
import { SearchPage as SearchPageWithTransition } from './transition';
import { SearchPage as SearchPageWithDeferredValue } from './use-deferred-value';

import './app.css';

export function App() {
  return {
    use: <SearchPageWithUse />,
    transition: <SearchPageWithTransition />,
    deferredValue: <SearchPageWithDeferredValue />,
  }['deferredValue'];
}
