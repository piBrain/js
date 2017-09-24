import React, { Component } from 'react';
import './NewsletterForm.css';
import { connect } from 'react-redux';
import { Errors, Field, Form, Control, actions } from 'react-redux-form';
import InputField from '../../InputField/InputField.jsx';

const isEmail = (value) => {
  //email regex
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
}

const isRequired = (value) => ( value.length > 0 ? true : false )

const isLongEnough = (minLength, value) => {
  if(value.length == 0) { return true }
  return value.length >= minLength ? true : false
}

const newsletterFields = [
  { errorAttribs: {
      length: "Minimum length is 2.",
      required: "Your first name is a required field.",
    },
    fieldAttribs: {
      model: 'newsletter.firstName',
      placeholder: 'First Name',
      validators: { required: isRequired, length: isLongEnough.bind(null, 2) },
    },
    uniqueName: 'newsletter-input-firstname', },
  { errorAttribs: {
      length: "Minimum length is 2.",
      required: "Your last name is a required field.",
    },
    fieldAttribs: {
      model: 'newsletter.lastName',
      placeholder: 'Last Name',
      validators: { required: isRequired, length: isLongEnough.bind(null, 2) },
    },
    uniqueName: 'newsletter-input-lastname', },
  { errorAttribs: {
      email: "Please check that this is a valid email.",
      length: "Minium length is 5.",
      required: "Your email is a required field.",
    },
    fieldAttribs: {
      model: 'newsletter.email',
      placeholder: 'Email',
      validators: { required: isRequired, email: isEmail, length: isLongEnough.bind(null, 5) },
    },
    uniqueName: 'newsletter-input-email', },
  { errorAttribs: {
      length: "Minimum length is 2."
    },
    fieldAttribs: {
      model: 'newsletter.organization',
      placeholder: 'Organization (Optional)',
      validators: { length: isLongEnough.bind(null, 2) },
    },
    uniqueName: 'newsletter-input-organization',},
]



export default class NewsletterForm extends Component {

  constructor(props) {
    super(props);
  }

  async handleSubmit( newsletter, values ) {
    this.props.setPending('newsletter', true)
    try {
      const params = { ...values, url: `${window.location.href.match(/^.*\//)[0]}signups` }
      const res = await newsletter.newsletterSignUp(params)
      this.props.setSubmitted('newsletter', true)
      this.props.reset('newsletter')
      this.props.displaySubmitMessage(res.data.newsletterSignUp)
    } catch(e) {
      console.error(e)
      this.props.setSubmitFailed('newsletter')
      this.props.displaySubmitMessage({err: true, response: 'Whoops! Something went wrong.'})
    }
  }

  inputFields() {
    const constructInputField = (props) => (<InputField {...props}/>)
    return newsletterFields.map((fields) => {
      return (<div key={fields.uniqueName}>
        <Control.text
          {...fields.fieldAttribs}
          updateOn='change'
          validateOn='blur'
        />
        <Errors
          model={fields.fieldAttribs.model}
          messages={fields.errorAttribs}
          show='touched'
        />
        <br></br>
      </div>)
    })
  }

  messageDisplay(message) {
    return (
      <div className='newsletter-display'>
        <span className='newsletterSubmitResponse'>{message}</span>
      </div>
    )
  }


  render(props) {
    let newsletter = this.props;
    if(this.props.submitMessage) {
      return this.messageDisplay(this.props.submitMessage)
    }

    return (
      <Form model="newsletter" className="newsletter-form" onSubmit={(values) => this.handleSubmit(newsletter, values)}>
          {this.inputFields()}
          <button className="submit-btn" type="submit" value="Submit">Sign Up!</button>
      </Form>
    );
  }
}
