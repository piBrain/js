import React, { Component } from 'react';
import styled from 'styled-components';

export default class Card extends Component {
  render(props) {
    const CardWrapper = styled.div`
      background-color: ${props => this.props.grid ? 'white': props.theme.darkGray };
      width: ${props => this.props.grid ? 'calc(33.3% - 12px)' : "100%"};
      margin: ${props => this.props.grid ? '6px' : '0'};
      height: 225px;
      float:left;
      overflow:hidden;
      cursor:pointer;
      transition: 0.15s background-color ease-in-out;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);

      &:hover {
        background-color: ${props => props.theme.lightGray};
      }
    `;
    const CenterBox = styled.div`
      margin: 0 auto;
      display:table;
      padding:2em;
    `;
    const ProfileImage = styled.div`
      margin: 0 auto;
      width: 80px;
      height: 80px;
      border-radius: 40px;
      background-size: cover;
      background-position: center;
      background-image: ${props => 'url(' + this.props.profileImg + ')'};
    `;

    const TextArea = styled.p`
      color: ${props => this.props.dark ? 'white' : props.theme.black };
      text-align:center;
      font-size: 21px;
      display:inline-block;
      line-height: 28px;

      > span {
        font-size: 14px;
        margin: 0.25em;
      }
    `;

    return (
      <CardWrapper className="card-wrapper">
        <CenterBox className="center-c">
          <ProfileImage className="profile-img" src={this.props.profileImg}></ProfileImage>
          <TextArea>{this.props.name}<br></br><span className="location">{this.props.location}</span></TextArea>
        </CenterBox>
      </CardWrapper>
    );
  }
}
