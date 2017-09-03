import React, { Component } from 'react';
import styles from './FAQ.scss';
import CSSModules from 'react-css-modules';
import Particles from 'react-particles-js';

class FAQ extends Component {

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

    var mockBackend = [
      {
        "id": 1,
        "question": "Why Lorem Ipsum?",
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut scelerisque ex. Nam quis viverra mi. Integer vel mauris interdum, dignissim est non, condimentum libero. Maecenas gravida non lectus ac varius. Nulla sagittis sodales ante ac suscipit. Maecenas sodales interdum erat at fermentum. Nunc a sagittis nisi. Proin non diam ultricies, hendrerit tellus quis, facilisis sem. Cras ac tortor velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce tempor diam id tempor lobortis. Nunc tincidunt dolor in orci sollicitudin viverra. Mauris et arcu ornare, pulvinar mi a, auctor lectus. Donec condimentum leo ligula, finibus convallis quam varius quis. Duis vitae efficitur ligula. Pellentesque facilisis sapien lorem, et volutpat nunc bibendum in. Donec odio urna, sodales sed arcu quis, elementum malesuada ipsum. Curabitur laoreet consequat porta. Nam varius ex nibh, tincidunt molestie quam egestas quis. Curabitur egestas ex at justo gravida, id convallis enim luctus. Nulla ut volutpat leo. Aenean molestie consequat ante quis efficitur. Suspendisse ultricies neque fermentum feugiat sagittis. Curabitur tincidunt purus et euismod varius. Nulla sit amet porta ante, consectetur porta elit. Curabitur scelerisque, orci vel cursus hendrerit, arcu risus lacinia sapien, sit amet tristique metus nisl nec nunc."
      },
      {
        "id": 2,
        "question": "Why Lorem Ipsum?",
        "answer": "blah blah blah"
      },
      {
        "id": 3,
        "question": "Why Lorem Ipsum?",
        "answer": "blah blah blah"
      }
    ];

    var Section = React.createClass ({
      getInitialState: function(){
        return {
          open: false
        }
      },
      toggleContent: function(){
        this.setState({
          open: !(this.state.open)
        })
      },
      getContentToggleHeight: function(){
        if(this.state.open){
          return "275px"
        } else {
          return "0"
        }
      },
      render : function () {
        var contentStyle = { height: this.getContentToggleHeight() };
        return (
          <div key={this.props.data.key} className={"question-c " + this.props.key}>
          <p className="question">{this.props.data.question}<span className="arrow"><img className={ this.state.open } onClick={this.toggleContent} src={require('../../../assets/arrow.svg')}></img></span></p>
            <div style={contentStyle} className="question-overflow">
              <div className="copy-c">
                  <p className="answer">{this.props.data.answer}</p>
              </div>
            </div>
          </div>
        );
      }
    });

    var Container = React.createClass ({
      buildQSections: function ( questionList ) {
        var sections = questionList.map(function(section, index){
          return <Section key={index} data={section} />
        })
        return sections;
      },
      render : function () {
        var sections = this.buildQSections(this.props.data);
        return (
          <div className="container">
            {sections}
          </div>
        );
      }
    });

    return (
      <div id="faq" className="page-container">
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
        <div className="faq-hero">
          <div className="hero"></div>
        </div>
        <div className="tabs-container">
          <p className="tbs-header">FAQ Categories</p>
          <div className="tbs-c">
            <p className="tbs-section active">What's our copyright policy?</p>
            <p className="tbs-section">Application Support</p>
            <p className="tbs-section">Suggestions / Feedback</p>
          </div>
        </div>
        <div className="section-container">
          <p className="section-header">Frequently Asked Questions</p>
          <p className="section-title">General copyright/terms of service questions</p>
          <Container data={mockBackend} />
          <div className="feedback-container">
            <p className="h-text">WAS THIS HELPFUL?</p>
            <div className="faq-btn yes">YES</div>
            <div className="faq-btn no">NO</div>
          </div>
      </div>
      </div>
    );
  }
}

export default CSSModules( FAQ, styles )
