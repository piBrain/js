import React, { Component } from 'react';
import styled from 'styled-components';
import {StaggeredMotion, spring, presets } from 'react-motion';

export default class DocumentsTab extends Component {

  render(props) {
    const DashboardTab = styled.div`
      width: 100%;
      overflow:hidden;
    `;

    const _defaultStyles = [];
    const files = this.props.files;

    for (let i = 0; i < files.length; i++) {
      _defaultStyles.push({ y: 20, o: 0 })
    }

    return (
      <DashboardTab className={this.props.label}>
      </DashboardTab>
    );
  }
}
