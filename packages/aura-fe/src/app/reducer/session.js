import { LOAD_STORED_STATE, SET_TOKEN, TOGGLE_LOGIN, SET_TEAM } from '../actions.js'
const loadStoredState = (action, state) => ({
  ...action.storedState,
  teams: []
})

const setActiveTeam = (action, state) => ({
  ...state,
  activeTeam: action.team
})
const setToken = (action, state) => ({
  ...state,
  token: action.token || ''
})

const setTeam = (action, state) => ({
  ...state,
  team: action.team
})

const toggleLogin = (_, state) => ({
  ...state,
  loggedIn: !state.loggedIn
})
export default (state={ token: '', loggedIn: false, teams: []}, action) => {
  const actions = {
    LOAD_STORED_STATE: loadStoredState,
    SET_TOKEN: setToken,
    TOGGLE_LOGIN: toggleLogin,
    SET_TEAM: setTeam,
  }
  if(typeof actions[action.type] === 'undefined') { return state }
  return actions[action.type](action, state)
}
