import React from 'react';
import { apolloClient, store } from './store.js';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import DashboardContainer from './containers/Dashboard/DashboardContainer';
import DocumentsContainer from './containers/Documents/DocumentsContainer';
import FileExplorerContainer from './containers/FileExplorer/FileExplorerContainer';
import ChatWindow from './containers/ChatWindow/ChatWindow';
import { withTheme } from 'styled-components';

class App extends React.Component {

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
      <ApolloProvider store={store} client={apolloClient} >
          <div>
            <Switch>
                <Route exact path='/' component={DashboardContainer} theme={this.props.theme}/>
                <Route exact path='/chat' component={ChatWindow} theme={this.props.theme}/>
                <Route exact path='/docs' component={DocumentsContainer} theme={this.props.theme}/>
                <Route exact path='/transcripts' component={FileExplorerContainer} theme={this.props.theme}/>
              </Switch>
          </div>
		  </ApolloProvider>
    );
  }
}

export default withTheme(App);
