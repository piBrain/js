export const DISPLAY_SUBMIT_MESSAGE = 'DISPLAY_SUBMIT_MESSAGE'
export const displaySubmitMessage = (res) => ({ type: DISPLAY_SUBMIT_MESSAGE, res })
export const SHOW_HIDDEN_MESSAGES = 'SHOW_HIDDEN_MESSAGES'
export const TOGGLE_LOGIN_REGISTER = 'TOGGLE_LOGIN_REGISTER'
export const LOAD_STORED_STATE = 'LOAD_STORED_STATE'
export const SET_TOKEN = 'SET_TOKEN'
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN'
export const SET_ACTIVE_TEAM = 'SET_ACTIVE_TEAM'
export const COMPLETE_REGISTRATION = 'COMPLETE_REGISTRATION'

export const toggleLoginRegister = (bool) => ({type: TOGGLE_LOGIN_REGISTER, bool})
export const showHiddenMessages = () => ({type: SHOW_HIDDEN_MESSAGES})
export const setSessionToken = (token) => ({type: SET_TOKEN, token})
export const toggleLogin = () => ({type: TOGGLE_LOGIN})
export const setActiveTeam = (team) => ({type: SET_ACTIVE_TEAM, team})
export const completeRegistration = (msg) => ({type: COMPLETE_REGISTRATION, msg})
