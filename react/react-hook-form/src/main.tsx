import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';

import './index.css';

const documentRoot = document.getElementById('root');

if (documentRoot) {
  createRoot(documentRoot).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
