import React, { Component } from 'react';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu.jsx';
import './Contact.css';
import Particles from 'react-particles-js';

export default class Contact extends Component {

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
        "photo": "../../../assets/ian.JPG",
        "name": "IAN BUTLER",
        "title": "CEO & FOUNDER",
        "description": "After not finding what he was looking for in his home town or in college at NYU Ian was a bit lost. Always flirting with entrepreneurship Ian submitted one of his ideas to an accelerator to see what would happen. He made it to the final rounds and that sparked something in him. Fast forward a little while later Ian met with his two co-founders and piBrain and Aura were born."
      },
      {
        "key": 1,
        "photo": "../../../assets/cory.JPG",
        "name": "CORY DICKSON",
        "title": "CPO & FOUNDER",
        "description": "Starting as a Web Developer at Pentagram Design, Cory launched his career as a front-end developer. Wanting to do more with his new found design skills, he decided that he was ready to build a product in an emerging field such as AI."
      },
      {
        "key": 2,
        "photo": "../../../assets/watson.JPG",
        "name": "WATSON MARKSON",
        "title": "CTO & FOUNDER",
        "description": "Before co-founding piBriain, Watson was studying Mathematics at NYU's Polytechnic Institute, pursuing a lifelong passion for abstraction. After the various dramatic deep learning expositions of 2014/15, Watson was enticed away from further academic studies to explore the exciting space of applications made accessible through modern machine learning techniques."
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
        var ian = require("../../../assets/ian.JPG");
        var cory = require("../../../assets/cory.JPG");
        var watson = require("../../../assets/watson.JPG");
        var divStyles= [
          {
            backgroundImage: 'url(' + ian + ')',
          },
          {
            backgroundImage: 'url(' + cory + ')',
            backgroundPosition: '35%',
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
              {members}
            </div>
          </div>
        );
      }
    });

    return (
      <div id="contact">
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

