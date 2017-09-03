import React, { Component, PropTypes } from 'react';
import styles from './Login.scss';
import InputField from '../InputField/InputField.jsx';
import CSSModules from 'react-css-modules';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email:"", password: "" };
  }
  handleSubmit(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.amount;
    if (!email || !password) {
      return;
    }

    this.props.onSubmit({email: email, password: password });
    this.setState({
      email: '',
      password: ''
    });
  }

  validateEmail(value) {
    //email regex
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  validatePassword( value ) {
    return true;
  }
  commonValidate() {
    return true;
  }
  setValue(field, event) {
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  }

  render(props) {
    return (
      <div id="login" className={this.props.active ? "login-container active" : "login-container" }>
      <form className="login-form">
      <InputField
      type={"email"}
      className={"input email"}
      value={this.state.email}
      uniqueName="email"
      text="Email Address"
      textArea={false}
      required={true}
      minCharacters={6}
      validate={this.validateEmail}
      onChange={this.setValue.bind(this, 'email')}
      errorMessage="Sorry, the email you've entered is invalid"
      emptyMessage="Email is required field" />
      <br></br>
      <InputField
      type={"password"}
      className={"input password"}
      value={this.state.email}
      uniqueName="email"
      text="Password"
      textArea={false}
      required={true}
      minCharacters={6}
      validate={this.validatePassword}
      onChange={this.setValue.bind(this, 'password')}
      errorMessage="Sorry, your email/password combinations is not correct"
      emptyMessage="Password is required field" />
      <p className="forgot-password">Forgot your passsword? Click <span className="link">here</span>!</p>
      <input className="submit-btn" type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}
export default CSSModules(Login, styles);
