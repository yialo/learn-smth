import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';

import { ConnectedApp } from './app_connected';
import { HookedApp } from './app_hooked';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <h1>Understanding React-Redux binding</h1>
      <p>Let's dive into stale props problem deeply</p>

      <ConnectedApp />
      <HookedApp />
    </div>
  </StrictMode>,
);
