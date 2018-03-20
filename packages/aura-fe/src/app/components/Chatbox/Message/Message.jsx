import React, { Component, PropTypes } from 'react';
import './Message.css';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Timestamp from 'react-timestamp';
import styled from 'styled-components';

export default class Message extends Component {
  render(props) {
    let className = 'other'
    if(this.props.author == 'Aura') {
      className = 'self'
    }
    const firstLetter = this.props.author[0].toUpperCase()

    const MessageWrapper = styled.li`
      width: 100%;
      `;

    const TopContainer = styled.div`

      &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border: 5px solid white;
        border-left-color: transparent;
        border-bottom-color: transparent;
      }
    `;

    const Messages = styled.div`
      background: white;
      padding: 10px;
      border-radius: 2px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      width: 100%;
      text-align: center;
    `;

    const Message = styled.p`
      font-size: 0.8rem;
      margin: 0 0 0.2rem 0;
    `;

    const Timestamp = styled.p`
      font-size: 0.6rem;
      color: #ccc;
      text-align: inherit;
    `;

    return (
      <MessageWrapper className={className}>
          <TopContainer className="top-c">
            <div style={{display:'block'}}>
              <img alt={firstLetter} />
            </div>
          </TopContainer>
          <Messages className="messages">
            <Message className="message">{this.props.children}</Message>
            <Timestamp className="timestamp">{this.props.author} <Timestamp time={this.created_at} format='time' /></Timestamp>
          </Messages>
      </MessageWrapper>
    );
  }
}
