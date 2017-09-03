import React, { Component, PropTypes } from 'react';
import styles from './Automation.scss';
import CSSModules from 'react-css-modules';

class Automation extends Component {
	render(props) {
		return (
      <div>
				<div className="automation-command">
					<p className="title">{this.props.name}</p>
					<div className="controls">
						<img className="edit"  role="presentation" src={require("../../../assets/edit.svg")}></img>
						<img className="delete" role="presentation" src={require("../../../assets/close.png")}></img>
					</div>
				</div>
				<div className="expanded-menu hide">
					<p className="interval">{this.props.interval}</p>
					<p className="interval">{this.props.execTime}</p>
				</div>
			</div>

		);
	}
}
export default CSSModules(Automation, styles);
