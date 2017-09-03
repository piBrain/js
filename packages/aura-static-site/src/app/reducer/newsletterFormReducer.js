import { formReducer, modelReducer } from 'react-redux-form'
import { DISPLAY_SUBMIT_MESSAGE } from '../actions'

const initialState= {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
}

const componentInitialState = {
  displaySubmitMessage: null,
}

const displaySubmitMessage = (action, state) => {
  return {
    ...state,
    displaySubmitMessage: action.res.response,
  }
}
export const newsletterStateReducer = (state=componentInitialState, action) => {
  const actions = {
    DISPLAY_SUBMIT_MESSAGE: displaySubmitMessage
  }
  if(typeof actions[action.type] === 'undefined') { return state }
  return actions[action.type](action)
}
export const newsletterFormReducer = formReducer('newsletter', initialState)
export const newsletterModelReducer = modelReducer('newsletter', initialState)
