import React, { Component } from 'react';
import styles from './NewsletterForm.scss';
import InputField from '../../InputField/InputField.jsx';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, Form, actions } from 'react-redux-form';

class NewsletterForm extends Component {

  constructor(props) {
    super(props);
    this.state = { name: "", email:"" };
  }
  commonValidate() {
    return true;
  }

  setValue(field, event) {
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  }

  handleSubmit( newsletter ) {
		let { dispatch } = this.props;
    //e.preventDefault();
    //var email = this.state.email.trim();
    //var name = this.state.name;
    //if (!email || !name) {
    //  return;
    //}

    //this.props.onSubmit({email: email, name: name });
    //this.setState({
    //  email: '',
    //  name: ''
    //});
  }

  validateEmail(value) {
    //email regex
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  render(props) {
		let newsletter = this.props;

    return (
      <Form model="newsletter" className="newsletter-form">
          <Field model="user.firstName">
              <InputField
                type={"text"}
                className={"input name"}
                value={this.state.name}
                uniqueName="name_field"
                text="Full Name"
                textArea={false}
                required={true}
                minCharacters={6}
                validate={this.commonValidate}
                onChange={this.setValue.bind(this, 'name')}
                errorMessage="Your name is a required field"
                emptyMessage="Your name is a required field" />
          </Field>
          <br></br>
          <Field model="user.firstName">
              <InputField
                type={"text"}
                className={"input email"}
                value={this.state.email}
                uniqueName="email_field"
                text="Email Addresss"
                textArea={false}
                required={true}
                minCharacters={6}
                validate={this.validateEmail()}
                onChange={this.setValue.bind(this, 'email')}
                errorMessage="Your email is a required field"
                emptyMessage="Your email is a required field" />
          </Field>
          <br></br>
          <button className="submit-btn" type="submit" value="Submit"></button>
        </Form>
    );
  }
}

function mapStateToProps(state) {
  return { first_name: state.first_name };
}

CSSModules( NewsletterForm, styles );
export default connect(mapStateToProps)(NewsletterForm);
