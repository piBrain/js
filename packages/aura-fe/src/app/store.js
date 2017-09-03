import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import {
  modelReducer,
  formReducer
} from 'react-redux-form';
import thunk from 'redux-thunk';

const initialNewsletterState = {
  firstName: '',
  lastName: '',
	email: ''
};

const store = applyMiddleware(thunk)(createStore)(combineReducers({
  newsletter: modelReducer('newsletter', initialNewsletterState),
  newsletterForm: formReducer('newsletter', initialNewsletterState)
}));

export default store;
