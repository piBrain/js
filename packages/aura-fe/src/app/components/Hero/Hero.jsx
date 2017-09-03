import React, { Component } from 'react';
import styles from './Hero.scss';
import InputField from '../InputField/InputField.jsx';
import NewsletterForm from './NewsletterForm/NewsletterForm.jsx';
import CSSModules from 'react-css-modules';


class Hero extends Component {

  constructor(props) {
    super(props);
    this.state = { name: "", email:"" };
  }

render(props) {
    return (
      <div id="hero">
      <div className="center-container">
        <p className="hero-text">
      <span className="byline">Artificial assistant, speeding up and simplifying tedious tasks so you or your employees can worry about the real work.</span><br></br><br></br>
          <span className="byline">Get updates about the development and release of Aura. Sign-up to receive updates about the development, release and milestones for Aura.</span>
      </p>
      <div>
      <NewsletterForm />
      </div>
      </div>
    </div>
  );
}
}

export default CSSModules( Hero, styles )
