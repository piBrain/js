import {
  DISPLAY_RESPONSE_MESSAGE, ADD_MESSAGE_TO_LIST,
  CLEAR_PENDING_MESSAGES, ADD_PENDING_MESSAGE
} from '../actions.js'


const componentInitialState = {
  displayResponseMessage: null,
  setPending: false,
  messageList: [],
  pendingMessages: []
}

const sendRequest = (action, state) => {
  return {
    ...state,
    sendRequest: action.res.response,
  }
}
const addMessageToList = (action,  state) => {
  return {
    ...state,
    messageList: [ ...state.messageList, action.msg ]
  }
}
const addPendingMessage = (action,  state) => {
  return {
    ...state,
    pendingMessages: [ ...state.pendingMessages, action.msg ]
  }
}
const clearPendingMessages = (_, state) => {
  console.log(state)
  const newState = {
    ...state,
    messageList: [...state.messageList, ...state.pendingMessages],
    pendingMessages: []
  }
  console.log(newState)
  return newState
}

const displayResponseMessage = (action, state) => {
  return {
    ...state,
    displayResponseMessage: action.res.response,
  }
}

export const chatboxStateReducer = (state=componentInitialState, action) => {
  const actions = {
    DISPLAY_RESPONSE_MESSAGE: displayResponseMessage,
    ADD_MESSAGE_TO_LIST: addMessageToList,
    CLEAR_PENDING_MESSAGES: clearPendingMessages,
    ADD_PENDING_MESSAGE: addPendingMessage
  }
  if(typeof actions[action.type] === 'undefined') { return state }
  return actions[action.type](action, state)
}
