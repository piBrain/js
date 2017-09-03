import React, { Component, PropTypes } from 'react';
import styles from './Message.scss';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import CSSModules from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Message extends Component {
  render(props) {
    return (
      <div className="message-container">
        <h2 className="author">{this.props.author}</h2>
            <p className="message">:      {this.props.children}</p>
      </div>
    );
  }
}
export default CSSModules(Message, styles);
