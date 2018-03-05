import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import App from './app/App.js';

const auraTheme = {
  auraBlue: 'rgb(103,151,208)',
  gray: '#CCCCC',
  cloudy:'#F5F5F5',
  darkGray:'757575',
  black: '262626'
};

const history = createBrowserHistory()
ReactDOM.render(
  <Router history={history}>
    <App theme={auraTheme} />
  </Router>, document.getElementById('root'));
