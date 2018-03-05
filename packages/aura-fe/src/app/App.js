'use strict'
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { apolloClient, store } from './store.js';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import DashboardContainer from './containers/Dashboard/DashboardContainer';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar_active: false,
      loggedIn: false
    };

  }

  handleLogin () {
    //manages the state of login validation from the server should go here
    this.setState( { loggedIn: true } );
  }

  render(props) {
    return (
    	<ApolloProvider store= { store } client = { apolloClient } >
      	<div>
        	<Switch>
          		<Route exact path='/' component={DashboardContainer} />
          	</Switch>
      	</div>
		  </ApolloProvider>
    );
  }
}