import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import stores from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/index.scss';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
serviceWorker.unregister();
