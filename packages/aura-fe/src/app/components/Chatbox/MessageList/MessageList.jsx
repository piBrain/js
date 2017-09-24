import React, { Component, PropTypes } from 'react';
import './MessageList.css';
import Message from '../Message/Message.jsx';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class MessageList extends Component {
  render(props) {
    var messages = this.props.data.map((message)=>{
      return ( <Message author={message.author} key={message.id} >{message.text}</Message>);
    })

    return (
      <div className={"messages-container"}>
        {messages}
      </div>
    );
  }
}


