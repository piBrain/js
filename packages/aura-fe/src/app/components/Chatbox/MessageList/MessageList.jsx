import React, { Component, PropTypes } from 'react';
import './MessageList.css';
import Message from '../Message/Message.jsx';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class MessageList extends Component {
  render(props) {
    var messages = this.props.data.map((message, index) => {
      return ( <Message key={index} show={message.show} author={message.author}>{message.message}</Message>);
    })

    return (
      <ol className={"discussion"}>
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {messages}
        </ReactCSSTransitionGroup>
      </ol>
    );
  }
}

