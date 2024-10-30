import React from 'react';
import ReactDOM from 'react-dom';

import Game from './components/Game/index.jsx';

export default () => {
  const app = (
    <React.StrictMode>
      <Game />
    </React.StrictMode>
  );
  const $root = document.getElementById('root');
  ReactDOM.render(app, $root);
};
