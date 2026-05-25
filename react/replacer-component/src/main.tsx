import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './app.tsx';

const domRoot = document.getElementById('root');

if (domRoot) {
  createRoot(domRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
