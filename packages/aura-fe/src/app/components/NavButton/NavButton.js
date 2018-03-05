import React, { Component } from 'react';
import styled from 'styled-components';

export default class NavButton extends Component {
  render(props) {
    const NavButtonWrapper = styled.div`
      font-size: 16px;
      color: white;
      width: 12rem;
      background: ${props => props.theme.auraBlue };
      height: 3.5em;
      margin: 0 auto;
      margin-top: 40px;
      line-height: 3.5em;
      text-align:center;
      cursor:pointer;
      transition: 0.2s all cubic-bezier(0.64, 0.57, 0.67, 1.53);

      &:hover {
        transform: scale(1.1);
      }
    `;

    return (
      <NavButtonWrapper className="nav-btn-w">
        {this.props.linkTitle}
      </NavButtonWrapper>
    );
  }
}
