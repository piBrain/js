import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card.js';
import ListItem from '../ListItem/ListItem.js';
import NavButton from '../NavButton/NavButton.js';
import SpeechButton from '../SpeechButton/SpeechButton.js';
import {Motion, spring} from 'react-motion';
import Collapse from 'react-collapse';

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
      position:absolute;
      bottom:0;
      width: 23%;
      margin-bottom: 4em;
    `;

    const orientation  = this.props.orientation;

    // I gotta refactor this fucking mess and put some of the elements in functions that return arrays but this will be fine for rn... my b
    return (
      (orientation === "left" ?

        <TrayWrapper className="tray-wrapper">
          <Motion defaultStyle={{w: 0}} style={{w:spring(100, {precision:0.0001})}}>
          {
            interpolatingStyle =>
              <Card style={{width: interpolatingStyle.w + "%"}} dark={true} name={"Dr. Keeting"} location={"San Diego, CA"} profileImg={require('../../../assets/ian.JPG')}></Card>
          }
          </Motion>
          {this.props.chatboxRender ?
            <Motion defaultStyle={{w: 0}} style={{w:spring(100, {precision:0.0001})}}>
            {
              interpolatingStyle =>
                <Card style={{background: '#a1a1a1', width: interpolatingStyle.w + "%"}} dark={true} name={"Dr. Keeting"} location={"San Diego, CA"} profileImg={require('../../../assets/ian.JPG')}></Card>
            }
            </Motion>
            :
            ''
          }
          <ListWrapper className="doctor-info-w">
          {this.props.chatboxRender ?
            [<NavButton key={0} linkTitle={"Transcriptions"} />, <NavButton key={1} linkTitle={"Patient Documents"} />]
            :
            [<ListItem key={0} columnKey={"First"} columnValue={user_data.first_name} />,
            <ListItem key={1} columnKey={"Last"} columnValue={user_data.last_name} />,
            <ListItem key={2} columnKey={"NIP"} columnValue={user_data.id} />,
            <ListItem key={3} columnKey={"Role"} columnValue={user_data.role} />,
            <ListItem key={4} columnKey={"Years"} columnValue={user_data.years} />, <NavButton key={5} linkTitle={"Options"} />]
            }
          </ListWrapper>
          <BotContainer>
            <SpeechButton toggleSpeech={this.props.toggleSpeech.bind(this)} />
          </BotContainer>
        </TrayWrapper>

        :

        <TrayWrapper>
          <Collapse style={{width: 200, border: '1px solid red'}} isOpened={true}>
            <ListWrapper>
              <ListItem key={1} />
              <ListItem key={2} />
              <ListItem key={3} />
            </ListWrapper>
          </Collapse>
        </TrayWrapper>
      )
    );
  }
}
