import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import App from './app/App.js';
import { Provider } from 'react-redux';

const history = createBrowserHistory()
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>, document.getElementById('root'));
