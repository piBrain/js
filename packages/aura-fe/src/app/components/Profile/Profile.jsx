import React, { Component, PropTypes } from 'react';
import styles from './Profile.scss';
import Automations from '../Automations/Automations.jsx';
import CSSModules from 'react-css-modules';

class Profile extends Component {
  render(props) {
    var automation_data = [
      {name:'name one', key:'000', interval: 'day', time: '9:00' },
      {name:'name two', key:'001', interval: 'week', time: '2:00' },
      {name:'name three', key:'002', interval: 'week', time: '12:00' },
      {name:'name four', key:'003', interval: 'week', time: '6:00' },
      {name:'name five', key:'004', interval: 'month', time: '11:00' },
      {name:'name six', key:'005', interval: 'year', time: '8:00' }
		];

    return(
      <div>
      <div className={this.props.active ? "profile-container active" : "profile-container"}>
        <div className={"info-container"}>
          <div className={"profile-img"}>
            <img className={"profile"} src={require("../../../assets/bio.png")} />
          </div>
          <div className="user-info">
            <p className="name"><span className="first">Cory</span><span className="last">&nbsp;Dickson</span></p>
            <p className="company">piBrain Inc.</p>
            <p className="membership">Member Since: Jan 2017</p>
            <div className="icon-tray">
              <span className="edit"><img className={"edit-icon"} src={require("../../../assets/edit.svg")} />Edit Profile</span>
              <span className="picture"><img className={"change-icon"} src={require("../../../assets/camera.svg")} />Change Picture</span>
            </div>
          </div>
        </div>
      </div>
      <Automations active={this.props.active} data={automation_data} />
      </div>
    );
  }
}
export default CSSModules(Profile, styles);
