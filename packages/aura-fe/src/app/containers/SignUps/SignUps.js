import React, { Component } from 'react';
import GridLoader from 'halogen/GridLoader'
import './SignUps.css'

export default class SignUps extends Component {
  constructor(props) {
    super(props)
    this.displayServerMessage = this.displayServerMessage.bind(this)
    this.sendAPIMutation = this.sendAPIMutation.bind(this)
    this.chooseDisplay = this.chooseDisplay.bind(this)
    this.getQueryParams = this.getQueryParams.bind(this)
    this.state = { loading: true }
  }

  displayServerMessage({err, response}) {
    return (
      <div>
        <span id='response'>{response}</span>
      </div>
    )
  }

  displayLoading() {
    return (
      <div style={{}}><GridLoader color={'#74b1e6'}/></div>
    )
  }

  componentDidMount() {
    this.sendAPIMutation()
  }

  getQueryParams() {
    const paramObject = new URLSearchParams(this.props.location.search)
    const params  = {}
    for(let x of paramObject.keys()) {
      params[x] = paramObject.get(x)
    }
    return params
  }

  async sendAPIMutation() {
    const params = { ...this.getQueryParams(), url: `${window.location.href.match(/^.*\//)[0]}signups` }
    try {
      var res = { err: true, response: 'Link invalid!' }
      if(params.resend) {
        if(params.type == 'newsletterSignUp') {
          res = await this.props.verifyNewsletterSignUp(params)
        } else {
          res = await this.props.verifySignUp(params)
        }
      }
      if(params.verify) {
        res = await this.props.verifySignUp(params)
      }
      if(params.newsletter) {
        res = await this.props.verifyNewsletterSignUp(params)
      }
      res = res.data.verifyNewsletterEmail
      this.setState({loading: false, res})
    } catch(e) {
      console.error(e)
      const res = { err: true, response: 'Whoops! Something went wrong.' }
      this.setState({ loading: false, res })
    }
  }
  chooseDisplay() {
    if(this.state.loading) {
      return (this.displayLoading())
    }
    return (this.displayServerMessage(this.state.res))
  }
  render(props) {
    return(<div id='responseDisplay'>
      {this.chooseDisplay()}
    </div>)
  }
}

