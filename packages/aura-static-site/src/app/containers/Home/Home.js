import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx';
import About from '../../containers/About/About.js'
import Contact from '../../containers/Contact/Contact.js'
import Hero from '../../components/Hero/Hero.jsx';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu.jsx';
import Chatbox from '../../components/Chatbox/Chatbox.jsx';
import './Home.css';
import Particles from 'react-particles-js';
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function Desktop(props) {
  return(
      <div>
        <About />
        <Contact />
      </div>
  );
}

function HomepageCont(props) {

  const isMobile = props.isMobile;
  let button = null;

  if (!isMobile) {
    button = <Desktop isMobile={isMobile} />

  }

  else {
    button = null;
  }

  return (
    <div>
      {button}
    </div>
  );
}

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isMobile: isMobile.any()
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
        <Particles className="particle-canvas" width={'100%'} height={'100%'} params={{
        particles: {
          number: {
            value: 200,
            enable: true,
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
            speed: 1.3
          }
        }
      }} />
    <div className='app-container'>
      <Particles className="particle-canvas" width={'100%'} height={'125vh'} params={{
        particles: {
          number: {
            value: 125,
            enable: true,
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
            speed: 1.3
          }
        }
      }} />
          <SidebarMenu handleLogin={this.handleLogin} active={this.props.sidebar_active} />
          <div className={this.props.sidebar_active ? 'aura-container pushed' : 'aura-container' }>
          <p className="wc-title">Sign up for Aura platform updates!</p>
          <Hero />
          </div>
        </div>
        <HomepageCont isMobile={this.state.isMobile } />
      </div>
    );
  }
}

