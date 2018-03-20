import React, { Component, PropTypes } from 'react';
import { Errors, Field, Form, Control, actions } from 'react-redux-form';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components';

export default class InputBox extends Component {
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(val) {
    const message = { ...val  }
    this.props.handleMessageSubmit(message);
  }
  render(props) {

    const InputForm = styled.form`
      position: absolute;
      bottom: -8px;
      width: 100%;

      > input[type=text] {
        width: 100%;
        padding: 20px;
        /* margin: 8px 50px; */
        box-sizing: border-box;
        border: 3px solid #d8d6e2;
        -webkit-transition: 0.5s;
        font: 16px 'PT Mono', monospace;
        transition: 0.5s;
        outline: none;

        &:hover {
          border: 3px solid ${props => props.theme.black};
        }
      }
    `;
    return (
      <InputForm model="forms.chatbox" className="inputbox-form" onSubmit={this.handleSubmit} >
        <span> <div/> </span>
        <Control.text model='.message' />
      </InputForm>
    );
  }
}
