import React, { Component, PropTypes } from 'react';
import styles from './MessageList.scss';
import Message from '../Message/Message.jsx';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import CSSModules from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MessageList extends Component {
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
export default CSSModules(MessageList, styles);


