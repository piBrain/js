import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card.js';
import ListItem from '../ListItem/ListItem.js';
import NavButton from '../NavButton/NavButton.js';
import SpeechButton from '../SpeechButton/SpeechButton.js';
import {Motion, spring} from 'react-motion';

const user_data = {
  first_name: 'Julia',
  last_name: 'Shao',
  id: '110006656',
  role: 'Admin',
  years: '5yrs',
};

export default class Tray extends Component {
  render(props) {
    const TrayWrapper = styled.div`
      background-color: ${props => props.theme.black};
      width: 23%;
      height: 100%;
      margin:0;
      padding: 0;
      overflow:hidden;
      box-shadow: 0 2px 2px 1px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
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
          <Motion defaultStyle={{w: 0}} style={{w:spring(100, {precision:0.0001})}}>
          {
            interpolatingStyle =>
              <Card style={{width: interpolatingStyle.w + "%"}} dark={true} name={"Dr. Keeting"} location={"San Diego, CA"} profileImg={require('../../../assets/ian.JPG')}></Card>
          }
          </Motion>
          <ListWrapper className="doctor-info-w">
            <ListItem columnKey={"First"} columnValue={user_data.first_name} />
            <ListItem columnKey={"Last"} columnValue={user_data.last_name} />
            <ListItem columnKey={"NIP"} columnValue={user_data.id} />
            <ListItem columnKey={"Role"} columnValue={user_data.role} />
            <ListItem columnKey={"Years"} columnValue={user_data.years} />
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
