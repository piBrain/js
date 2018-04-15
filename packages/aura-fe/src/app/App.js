import React from 'react';
import { apolloClient, store } from './store.js';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import PrivateRoute from './components/ConnectedPrivateRoute'
import DashboardContainer from './containers/Dashboard/DashboardContainer';
import ConnectedLoginContainer from './containers/Login/ConnectedLoginContainer';
import DocumentsContainer from './containers/Documents/DocumentsContainer';
import FileExplorerContainer from './containers/FileExplorer/FileExplorerContainer';
import TranscriptEditor from './containers/TranscriptEditor/TranscriptEditor';
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
    render(props) {
        return (
            <ApolloProvider store={store} client={apolloClient} >
            <div>
            <Switch>
            <Route exact path='/login' component={ConnectedLoginContainer} theme={this.props.theme}/>
            <PrivateRoute exact path='/' component={DashboardContainer} theme={this.props.theme}/>
            <PrivateRoute exact path='/chat' component={ChatWindow} theme={this.props.theme}/>
            <PrivateRoute exact path='/docs' component={DocumentsContainer} theme={this.props.theme}/>
            <PrivateRoute exact path='/transcripts' component={FileExplorerContainer} theme={this.props.theme}/>
            <PrivateRoute exact path='/editor' component={TranscriptEditor} theme={this.props.theme}/>
            </Switch>
            </div>
            </ApolloProvider>
        );
    }
}

export default withTheme(App);
