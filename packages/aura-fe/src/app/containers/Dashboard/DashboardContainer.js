import React, { Component } from 'react';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin () {
    //manages the state of login validation from the server should go here
    this.setState( { loggedIn: true } );
  }

  render(props) {

    return (
      <div>
      </div>
    );
  }
}

