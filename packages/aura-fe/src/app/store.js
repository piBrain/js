import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import {
  combineForms,
} from 'react-redux-form';
import { newsletterFormReducer, newsletterModelReducer, newsletterStateReducer } from './reducer/newsletterFormReducer'
import thunk from 'redux-thunk';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import getConfigs from '../../config'
const { apiUrl } = getConfigs()
const networkInterface = createNetworkInterface({ uri: `${apiUrl}/graphql` })
const apolloClient = new ApolloClient({
  networkInterface
})

const combinedReducers = combineReducers({
  newsletterForm: newsletterFormReducer,
  newsletter: newsletterModelReducer,
  newsletterState: newsletterStateReducer,
  apollo: apolloClient.reducer(),
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combinedReducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));
export { store, apolloClient }
