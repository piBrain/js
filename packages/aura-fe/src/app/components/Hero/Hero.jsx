import React, { Component } from 'react';
import './Hero.css';
import ConnectedNewsletterForm from './NewsletterForm/ConnectedNewsletterForm.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Hero extends Component {

  constructor(props) {
    super(props);
  }

render(props) {
    return (
      <ReactCSSTransitionGroup transitionName = "hero-fade"
      transitionAppear = {true} transitionAppearTimeout = {250}
      transitionEnter = {false} transitionLeave = {false}>
      <div id="hero">
      <div className="center-container">
        <p className="hero-text">
      <span className="byline">Artificial assistant, speeding up and simplifying tedious tasks so you or your employees can worry about the real work.</span><br></br><br></br>
          <span className="byline">Get updates about the development and release of Aura. Sign-up to receive updates about the development, release and milestones for Aura.</span>
      </p>
      <div>
      <ConnectedNewsletterForm />
      </div>
      </div>
    </div>
  </ReactCSSTransitionGroup>
  );
}
}

