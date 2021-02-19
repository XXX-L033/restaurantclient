import React from 'react';
import { Router, HashRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import 'antd/dist/antd.css';

const browserHistory = createBrowserHistory();

export default function App() {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
}
