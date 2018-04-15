import {
    TOGGLE_VOICE
} from '../actions'
const componentInitialState = {
    recording: false
}
const toggleVoice = (_, state) => {
    return { ...state, recording: !state.recording }
}
export default (state=componentInitialState, action) => {
  const actions = {
      TOGGLE_VOICE: toggleVoice
  }
  if(typeof actions[action.type] === 'undefined') { return state }
  return actions[action.type](action, state)
}
