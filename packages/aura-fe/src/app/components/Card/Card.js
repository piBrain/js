import React, { Component } from 'react';
import styled from 'styled-components';

export default class Card extends Component {
  render(props) {
    const CardWrapper = styled.div`
      background-color: ${props => this.props.grid ? props.theme.cloudy : props.theme.gray };
      width: ${props => this.props.grid ? '33.3%' : "100%"};
      height: 225px;
      float:left;
      overflow:hidden;
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
      background: red;
    `;

    const TextArea = styled.p`
      color: ${props => this.props.dark ? 'white' : props.theme.gray };
      text-align:center;
      font-size: 18px;
      display:inline-block;
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
