import React, { Component } from 'react';
import styles from './About.scss';
import CSSModules from 'react-css-modules';
import Particles from 'react-particles-js';

class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render(props) {
    const YouTubeVideo = ({ id }) => (
      <div className="youtube-wrapper">
        <div className="youtube">
          <center>
              <iframe
                  className="youtube-frame"
                  src={`https://www.youtube.com/embed/${id}?autoplay=0`}
                  allowFullScreen
              />
          </center>
        </div>
      </div>
    );
    return (
      <div id="about" className="page-container">
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
      <div className="tray-wrapper">
          <div className="page-header">
            <p>Why Use Aura?</p>
          </div>
          <div className="content-container">
            <div className="column-3">
              <img className={"context"} src={require("../../../assets/context.png")} />
              <p className="col-title">Context Detection</p>
              <p className="col-description">
              Aura pulls context from the command you send it and uses that to access e-mail, calendars, drive, dropbox, etc. Example: "E-mail Jon the quarterly report from last week on dropbox." Aura will detect Jon as the recipient, the time the report was created, and that it needs to get pulled from dropbox and confirm any ambiguities with you before sending Jon the report.
              </p>
            </div>
            <div className="column-3">
              <img className={"selection"} src={require("../../../assets/selection.png")} />
              <p className="col-title">Huge Selection</p>
              <p className="col-description">
              One of Aura's main abilities is its ease of integration with existing services. We use their technology, which is open to developers to have Aura integrate. Which means no development time on our end and wider service selection for all of our users. Just choose the service from our available integrations and link your account with Aura.
              </p>
            </div>
            <div className="column-3">
              <img className={"automation"} src={require("../../../assets/automation.png")} />
              <p className="col-title">Automation</p>
              <p className="col-description">
              There are many tasks that you have to do everyday, download an updated file from here, send an e-mail to there, etc. You can set up these tasks with Aura on a recurring schedule so you don't have to worry about doing them yourself.
              </p>
            </div>
            <div className="center-container">
              <p className="title">Now You Have More Than Two Hands</p>
              <YouTubeVideo id={"gfjMe5jVsYI"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSSModules(About, styles)
