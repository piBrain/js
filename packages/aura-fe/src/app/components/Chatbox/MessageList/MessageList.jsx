import React, { Component, PropTypes } from 'react';
import './MessageList.css';
import Message from '../Message/Message.jsx';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components';

export default class MessageList extends Component {
  render(props) {
    var messages = this.props.data.map((message, index) => {
      return ( <Message key={index} show={message.show} author={message.author}>{message.message}</Message>);
    })

    const Discussion = styled.ol`
      list-style: none;
      background: #e5e5e5;
      margin: 0;
      padding: 100px 100px 100px 100px;
      font: 12px 'PT Mono', monospace;
      height: 60%;
      position: relative;
      height: 80%;

      > li {
        padding: 0.5rem;
        overflow: hidden;
        display: flex;
      }

      > div > img {
        display: block;
        width: 100%;
        margin: 0;
      }
    `;

    return (
      <Discussion>
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {messages}
        </ReactCSSTransitionGroup>
      </Discussion>
    );
  }
}

