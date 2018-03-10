import React, { Component, PropTypes } from 'react';
import './Chatbox.css';
import MessageList from './MessageList/MessageList.jsx';
import InputBox from './InputBox/InputBox.jsx';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { Errors, Field, Form, Control, actions } from 'react-redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  async handleMessageSubmit( values ) {
   this.props.setPending('forms.chatbox', true);
   try {
     const userMessage = { ...values, team: this.props.activeTeam.name }
     this.props.clearForm('forms.chatbox')
     this.props.addMessageToList(userMessage)
     const res = await this.props.chatboxSendRequest(userMessage)
     if(res.data.sendRequest.err) {
       this.props.addPendingMessage({author:'Aura', message:"I'm sorry, something seems to have gone wrong on my end.", team: this.props.activeTeam.name})
     } else {
       this.props.addPendingMessage({author: 'Aura', message: res.data.sendRequest.data, team: this.props.activeTeam.name})
     }
    } catch(e) {
      console.error(e)
      this.props.setSubmitFailed('chatbox')
      this.props.displaySubmitError({err: true, response: 'Whoops! Something went wrong.'})
   }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.pendingMessages.length > 0) {
      nextProps.clearPendingMessages()
    }
  }

  render(props) {
    const messages = this.props.messageList.filter((msg) => msg.team === this.props.activeTeam.name)
    console.log(messages)
    return (
      <div id="chatbox" className={this.props.loggedIn ?  "chatbox-container active" : "chatbox-container"}>
        <MessageList data={messages}/>
        <InputBox handleMessageSubmit={this.handleMessageSubmit}/>
      </div>
    );
  }
}
