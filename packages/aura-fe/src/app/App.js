import React from 'react';
import { apolloClient, store } from './store.js';
import { ApolloProvider } from 'react-apollo';
import AppShim from './components/AppShim'
import { withTheme } from 'styled-components';
class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <ApolloProvider store={store} client={apolloClient} >
                <div>
                    <AppShim {...props} theme={this.props.theme} />
                </div>
            </ApolloProvider>
        );
    }
}

export default withTheme(App);
