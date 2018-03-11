import React, { Component, PropTypes } from 'react';
import './InputBox.css';
import { Errors, Field, Form, Control, actions } from 'react-redux-form';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    return (
      <Form model="forms.chatbox" className="inputbox-form" onSubmit={this.handleSubmit} >
        <span> <div/> </span>
        <Control.text model='.message' />
      </Form>
    );
  }
}
