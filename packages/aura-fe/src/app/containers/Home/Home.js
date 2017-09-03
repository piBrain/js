import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu.jsx';
import Chatbox from '../../components/Chatbox/Chatbox.jsx';
import styles from './Home.scss';
import CSSModules from 'react-css-modules';
import Particles from 'react-particles-js';
var data = [
    {
        "id": 1388534400000,
        "author": "Pete Hunt",
        "text": "Hey there!"
    },
    {
        "id": 1420070400000,
        "author": "Paul O’Shannessy",
        "text": "React is *great*!"
    },
]

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
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
        <div className='app-container'>
          <SidebarMenu handleLogin={this.handleLogin} active={this.props.sidebar_active} />
          <div className={this.props.sidebar_active ? 'aura-container pushed' : 'aura-container' }>
          <p className="wc-title">Welcome to Aura</p>
          <Particles className="particle-canvas" width={'100%'} height={'125vh'} params={{
        particles: {
          number: {
            value: 400,
            enable: false,
            value_area:800
          },
          color: {
            value: '#000000'
          },
          opacity: {
              value: 1
          },
          shape: {
            polygon: {
              nb_sides: 12
            }
          },
          line_linked: {
            enable: true,
            color: "#000000",
          },
          move: {
            enable: true,
              speed: 1.3,
              direction: 'top-right',
              mode: 'out'
          }
        }
      }} />
<Hero data={data} />
          </div>
        </div>
      </div>
    );
  }
}

export default CSSModules( Home, styles )
