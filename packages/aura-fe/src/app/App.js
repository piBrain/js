import React, { Component } from 'react';
import Header from './components/Header/Header.jsx';
import SidebarMenu from './components/SidebarMenu/SidebarMenu.jsx';
import './App.css';
import { Provider } from 'react-redux';
import { apolloClient, store } from './store.js';
import Home from './containers/Home/Home.js';
import ConnectedSignUps from './containers/SignUps/ConnectedSignUps.js';
import { Switch, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar_active: false,
      loggedIn: false
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleSidebar ( bool ) {
    //manages the state of the side menu expanding
    this.setState( { sidebar_active: bool } );
  }

  handleLogin () {
    //manages the state of login validation from the server should go here
    this.setState( { loggedIn: true } );
  }
  render(props) {
    return (
			<ApolloProvider store= { store } client = { apolloClient } >
      <div>
        <Header sidebar_active={this.state.sidebar_active} toggleSidebar={this.toggleSidebar} />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/signups" component={ConnectedSignUps} />
        </Switch>
      </div>
			</ApolloProvider>
    );
  }
}

//<Header sidebar_active={this.state.sidebar_active} toggleSidebar={this.toggleSidebar} />
//<div className='app-container'>
//<SidebarMenu handleLogin={this.handleLogin} active={this.state.sidebar_active} />
//<div className={this.state.sidebar_active ? 'aura-container pushed' : 'aura-container' }><p>Welcome to Aura</p></div>
      //todo
//</div>
