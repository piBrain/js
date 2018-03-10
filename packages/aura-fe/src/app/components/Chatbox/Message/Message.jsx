import React, { Component, PropTypes } from 'react';
import './Message.css';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Timestamp from 'react-timestamp';

export default class Message extends Component {
  render(props) {
    let className = 'other'
    if(this.props.author == 'Aura') {
      className = 'self'
    }
    const firstLetter = this.props.author[0].toUpperCase()
    return (
      <li className={className}>
          <div className="top-c">
            <div className="avatar">
              <img src={require(`../../../../assets/material-letters/${firstLetter}.svg`)} alt={firstLetter} />
            </div>
          </div>
          <div className="messages">
            <p className="message">{this.props.children}</p>
            <p className="timestamp">{this.props.author} <Timestamp time={this.created_at} format='time' /></p>
          </div>
      </li>

    );
  }
}
