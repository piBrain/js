import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card.js';
import ListItem from '../ListItem/ListItem.js';
import NavButton from '../NavButton/NavButton.js';
import SpeechButton from '../SpeechButton/SpeechButton.js';

export default class Tray extends Component {
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

    const ListWrapper = styled.div`
      width: 100%;
      overflow:hidden;
      margin: 0 auto;
      display:block;
      padding-top: 40px;
    `;

    const BotContainer = styled.div`
      position:relative;
      margin-top: 25%;
    `;

    const orientation  = this.props.orientation;
    return (
      (orientation === "left" ?

        <TrayWrapper className="tray-wrapper">
        <Card dark={true} name={"Dr. Keeting"} location={"San Diego, CA"} profileImg={require('../../../assets/ian.JPG')}></Card>
          <ListWrapper className="doctor-info-w">
            <ListItem columnKey={"first"} columnValue={"cory"} />
            <ListItem columnKey={"last"} columnValue={"d"} />
            <ListItem columnKey={"last"} columnValue={"d"} />
            <ListItem columnKey={"last"} columnValue={"d"} />
            <ListItem columnKey={"last"} columnValue={"d"} />
            <NavButton linkTitle={"Options"} />
          </ListWrapper>
          <BotContainer>
            <SpeechButton toggleSpeech={this.props.toggleSpeech.bind(this)} />
          </BotContainer>
        </TrayWrapper>

        :

        <TrayWrapper></TrayWrapper>
      )
    );
  }
}
