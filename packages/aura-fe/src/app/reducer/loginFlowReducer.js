import { TOGGLE_PROFILE, TOGGLE_LOGIN_REGISTER } from '../actions.js'

const initialState = {
  displayLogin: true
}

const toggleLoginRegister = (_, state) => {
  return {
    ...state,
    displayLogin: !state.displayLogin
  }
}

export const LoginFlowStateReducer = (state=initialState, action) => {
  const actions = {
    TOGGLE_LOGIN_REGISTER: toggleLoginRegister
  }
  if(typeof actions[action.type] === 'undefined') { return state }
  return actions[action.type](action, state)
}

