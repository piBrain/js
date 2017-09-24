import React, { Component, PropTypes } from 'react';
import './Message.css';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Message extends Component {
  render(props) {
    return (
      <div className="message-container">
        <h2 className="author">{this.props.author}</h2>
            <p className="message">:      {this.props.children}</p>
      </div>
    );
  }
}
