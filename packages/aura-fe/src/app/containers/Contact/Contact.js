import React, { Component } from 'react';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu.jsx';
import styles from './Contact.scss';
import CSSModules from 'react-css-modules';
import Particles from 'react-particles-js';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render(props) {
    var mockBackend = [
      {
        "key": 0,
        "photo": "../../../assets/itb.jpg",
        "name": "IAN BUTLER",
        "title": "CEO & FOUNDER",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut scelerisque ex. Nam quis viverra mi. Integer vel mauris interdum, dignissim est non, condimentum libero. Maecenas gravida non lectus ac varius. Nulla sagittis sodales ante ac suscipit. Maecenas sodales interdum erat at fermentum. Nunc a sagittis nisi. Proin non diam ultricies, hendrerit tellus quis, facilisis sem. Cras ac tortor velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce tempor diam id tempor lobortis. Nunc tincidunt dolor in orci sollicitudin viverra. Mauris et arcu ornare, pulvinar mi a, auctor lectus. Donec condimentum leo ligula, finibus convallis quam varius quis. Duis vitae efficitur ligula."
      },
      {
        "key": 1,
        "photo": "../../../assets/itb.jpg",
        "name": "CORY DICKSON",
        "title": "CPO & FOUNDER",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut scelerisque ex. Nam quis viverra mi. Integer vel mauris interdum, dignissim est non, condimentum libero. Maecenas gravida non lectus ac varius. Nulla sagittis sodales ante ac suscipit. Maecenas sodales interdum erat at fermentum. Nunc a sagittis nisi. Proin non diam ultricies, hendrerit tellus quis, facilisis sem. Cras ac tortor velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce tempor diam id tempor lobortis. Nunc tincidunt dolor in orci sollicitudin viverra. Mauris et arcu ornare, pulvinar mi a, auctor lectus. Donec condimentum leo ligula, finibus convallis quam varius quis. Duis vitae efficitur ligula."
      },
      {
        "key": 2,
        "photo": "../../../assets/wam.jpg",
        "name": "WATSON MARKSON",
        "title": "CTO & FOUNDER",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut scelerisque ex. Nam quis viverra mi. Integer vel mauris interdum, dignissim est non, condimentum libero. Maecenas gravida non lectus ac varius. Nulla sagittis sodales ante ac suscipit. Maecenas sodales interdum erat at fermentum. Nunc a sagittis nisi. Proin non diam ultricies, hendrerit tellus quis, facilisis sem. Cras ac tortor velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce tempor diam id tempor lobortis. Nunc tincidunt dolor in orci sollicitudin viverra. Mauris et arcu ornare, pulvinar mi a, auctor lectus. Donec condimentum leo ligula, finibus convallis quam varius quis. Duis vitae efficitur ligula."
      }
    ];

    var TeamMember = React.createClass ({
      getInitialState: function () {
        return {
          open: false
        }
      },
      toggleOpen: function () {
        this.setState ({
          open: !(this.state.open)
        });
      },
      render: function () {
        var ian = require("../../../assets/itb.jpg");
        // var cory = require("../../../assets/");
        var watson = require("../../../assets/wam.jpg");
        var divStyles= [
          {
            backgroundImage: 'url(' + ian + ')',
          },
          {
            backgroundImage: 'url(' + ian + ')',
          },
          {
            backgroundImage: 'url(' + watson + ')',
          }
        ];

        return (
          <div className= { this.props.data.key == 2 ? "team-wrapper bottom" : "team-wrapper" }>
            <div onClick={this.toggleOpen} className="team-c" style={divStyles[this.props.data.key]}>
              <img src=""></img>
              <div className={this.state.open ? "expand-c active": "expand-c"}><p className={this.state.open ? "description active" : "description" }>{this.props.data.description}</p></div>
            </div>
            <p className="title-w"><span className="name">{this.props.data.name}</span><span className="title">{this.props.data.title}</span></p>
          </div>
        );
      }
    });

    var TeamContainer = React.createClass ({
      buildTeam: function ( teamData ) {
        var members = teamData.map(function(member, index){
          return <TeamMember key={index} data={member} />
        })
        return members;
      },

      render: function () {
        var members = this.buildTeam(this.props.data);
        return (
          <div className="team-container">
            <div className="row">
              {members[0]}
              {members[1]}
            </div>
            <div className="row">
              {members[2]}
            </div>
          </div>
        );
      }
    });

    return (
      <div id="contact" className="page-container">
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
        <div className="page-header">
          <p>Meet the Team</p>
        </div>
        <TeamContainer data={mockBackend} />
        <div className="jobs-container">
        </div>
        <div className="contact-us">
          <p className="contact-header">Contact Us</p>
          <div className="contact-row">
            <div className="contact-info press">
              <p className="contact-title">PRESS</p>
              <p className="info-text">Are you a member of the press? Contact us <a className="contact-link" href={"mailto:" + this.props.contactEmail}>here</a>. </p>
            </div>
            <div className="contact-info jobs">
              <p className="contact-title">JOIN US</p>
              <p className="info-text">Want to join the team? We would love to have you! But unfortunately, we do not have any open positions at the moment...</p>
            </div>
            <div className="contact-info misc">
              <p className="contact-title">STILL HAVE QUESTIONS?</p>
              <p className="info-text">Shoot us an email at: <a className="contact-link" href="mailto:dev@pibrain.io">dev@pibrain.io</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSSModules( Contact, styles )
