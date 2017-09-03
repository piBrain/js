import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
})

const initialState = {
  visibilityFilter: [],
  todos: []
}

function mockReducer(state = initialState, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}
