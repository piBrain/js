import { combineForms } from 'react-redux-form'

const chatFormInitialState= {
  message: "",
  author: "Ian Butler" //hardcoded for demo purposes
}

const loginInitialState = {
  email: "",
  password: "",
}

const registerInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

export default combineForms({
  chatbox: chatFormInitialState,
  login: loginInitialState,
  register: registerInitialState
}, 'forms')

