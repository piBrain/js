import React, { Component } from 'react';
import styled from 'styled-components';

export default class DashboardTab extends Component {
  render(props) {
    const TrayWrapper = styled.div`
      background-color: ${props => props.theme.black};
      width: 23%;
      height: 100%;
      margin:0;
      padding: 0;
      overflow:hidden;
      float: ${props => this.props.orientation };
    `;

    return (
      <div></div>
    );
  }
}
