import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Tray from '../../components/Tray/Tray.js';
import AuraPrompt from '../../components/AuraPrompt/AuraPrompt.js';
import Chatbox from '../../components/Chatbox/Chatbox.jsx';

const auraTheme = {
  auraBlue: 'rgb(103,151,208)',
  gray: '#CCC',
  cloudy:'#F5F5F5',
  lightGray: '#a1a1a1',
  darkGray:'#757575',
  black: '#262626'
};

class ChatWindow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      speechActive: false
    }

    this.toggleSpeech = this.toggleSpeech.bind(this);
  }

  toggleSpeech(e) {
    e.preventDefault();
    this.setState({speechActive: !this.state.speechActive})
  }


  render(props) {

    const Chat = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 100%;
      height: 100%;
      overflow:hidden;
      font-family: 'Noto Sans', sans-serif;
    `;

    return (
      <ThemeProvider theme={auraTheme}>
        <Chat className="dashboard-wrapper">
          <Tray chatboxRender={true} toggleSpeech={this.toggleSpeech} orientation={"left"} />
          <div>
            <Chatbox messageList={[]}/>
          </div>
          <Tray toggleSpeech={this.toggleSpeech} orientation={"right"} />
        </Chat>
      </ThemeProvider>
    );
  }
}

export default withTheme(ChatWindow);
