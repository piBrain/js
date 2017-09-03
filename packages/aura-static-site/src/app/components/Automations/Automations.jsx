import React, { Component, PropTypes } from 'react';
import './Automations.css';
import Automation from '../Automation/Automation.jsx';
import {TransitionMotion, StaggeredMotion, spring} from 'react-motion';
import Transition from 'react-motion-ui-pack';

export default class Automations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{automations:[]}],
      mounted: false
    }

  }

  componentDidMount() {
    setTimeout(()=>{this.setState({ data: this.props.data, mounted: this.props.active});},2000);
  }

  render(props) {
    const AutomationsList = ({automations}) => (
      <div id={"automations"} className="automation-wrapper">
      <StaggeredMotion
      defaultStyles={ Array.from(automations, () => { return { h:0 }; })}
      styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
        return i === 0
          ? {h: 1}
          : {h: spring(prevInterpolatedStyles[i - 1].h)}
      })}>
      {interpolatingStyles =>
        <div>
        {interpolatingStyles.map((style, i) =>
          <div key={automations[i].key} style={{opacity: style.h}}>
            <Automation name={automations[i].name} interval={automations[i].interval} execTime={automations[i].time} />
          </div>
        )
        }
        </div>
      }
      </StaggeredMotion>
      </div>
    );

    //const AutomationsList = ({automations}) => (
    //  <div id={"automations"} className="automation-container">
    //  {automations.map((automation, i) => (
    //    <div key={i++}>
    //        <Automation name={automation.name} interval={automation.interval} execTime={automation.time} />
    //    </div>
    //  ))}
    //	</div>
    //);

    return (
      <div className={this.props.active ? 'automations-container active' : 'automations-container'} >
      <p className="automation-header">A u t o m a t i o n s</p>
      {this.state.mounted ? <AutomationsList automations={this.state.data} /> : null}
      </div>
  );
  }
}
