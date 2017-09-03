import React, { Component, PropTypes } from 'react';
import styles from './SideHeader.scss';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CSSModules from 'react-css-modules';

class SideHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(props) {
    return (
      <ReactCSSTransitionGroup transitionName = "side-header"
        transitionAppear = {this.props.active} transitionAppearTimeout = {500}
        transitionEnter = {false} transitionLeave = {false}>
      <div className={"header-container active"}>
        <p key="new" className="login-header">
        <span className={this.props.active ? "login active" : "login"} onClick={ () => this.props.toggleLogin(true)}>Login</span>|
        <span className={this.props.active ? "signup" : "signup active"} onClick={ () => this.props.toggleLogin(false)}>Register</span>
        </p>
      </div>
      </ReactCSSTransitionGroup>
    );
  }
}
export default CSSModules(SideHeader, styles);
