import React, { Component } from 'react';
import styled from 'styled-components';

export default class Card extends Component {
  render(props) {
    const CardWrapper = styled.div`
      background-color: ${props => this.props.dark ? props.theme.darkGray : props.theme.gray };
      width: ${props => props.grid ? '33.3%' : "100%"};
      height: 25%;
      float:left;
    `;

    return (
        <CardWrapper className="card-wrapper">
          dr. cory dickson
        </CardWrapper>
    );
  }
}
