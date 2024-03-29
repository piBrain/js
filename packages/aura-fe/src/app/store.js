import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import { chatboxFormReducer, chatboxModelReducer, chatboxStateReducer } from './reducer/chatboxFormReducer.js'
import { LoginFlowStateReducer } from './reducer/loginFlowReducer.js'
import sessionReducer from './reducer/session.js'
import formsReducer from './reducer/forms.js'
import voiceReducer from './reducer/voice.js'
import thunk from 'redux-thunk';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import getConfigs from '../../config'
import { createSession } from 'redux-session'


const { apiUrl } = getConfigs()
const networkInterface = createNetworkInterface({ uri: `${apiUrl}/graphql` })
const apolloClient = new ApolloClient({
  networkInterface
})
const session = createSession({
  ns: 'aura-cli',
  throttle: 5000,
  selectState: (state) => ({
    token : state.session.token,
    loggedIn: state.session.loggedIn,
    team: state.session.team
  }),
  adapter: 'localStorage'
})
const combinedReducers = combineReducers({
    chatboxState: chatboxStateReducer,
    apollo: apolloClient.reducer(),
    loginFlowState: LoginFlowStateReducer,
    forms: formsReducer,
    session: sessionReducer,
    voice: voiceReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combinedReducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk, session),
));
export { store, apolloClient }
