import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card.js';
import Stagger from 'react-css-stagger';
import {StaggeredMotion, spring, presets } from 'react-motion';

export default class DashboardTab extends Component {

  render(props) {
    const DashboardTab = styled.div`
      width: 100%;
      overflow:hidden;
    `;

    const _defaultStyles = [];
    const users = this.props.users;

    for (let i = 0; i < users.length; i++) {
      _defaultStyles.push({ o: 0 })
    }

    return (
      <DashboardTab className={this.props.label}>
      <StaggeredMotion
        defaultStyles={_defaultStyles}
        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
          return i === 0
          ? {o: spring(1, presets.gentle)}
          : {o: spring(prevInterpolatedStyles[i - 1].o)}
        })}>{ (interpolatingStyles)=>
            <div>
              {interpolatingStyles.map((style, i) =>
                <Card key={i} dark={false} grid={true} name={users[i].name} location={users[i].location} profileImg={users[i].profileImg} style={{opacity: style.o}} />)
              }
            </div>
          }</StaggeredMotion>
      </DashboardTab>
    );
  }
}
