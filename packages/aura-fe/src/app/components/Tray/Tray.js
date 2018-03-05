import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card.js';

export default class Tray extends Component {
  render(props) {
    const TrayWrapper = styled.div`
      background-color: ${props => props.theme.black};
      width: 23%;
      height: 100%;
      overflow:hidden;
      float: ${props => this.props.orientation };
    `;

    const orientation  = this.props.orientation;
    return (
      (orientation === "left" ?

        <TrayWrapper className="tray-wrapper">
          <Card dark={true}></Card>
        </TrayWrapper>

        :

        <TrayWrapper></TrayWrapper>
      )
    );
  }
}
