import React, { Component } from 'react';
import styled from 'styled-components';
import microphoneIcon from '../../../assets/microphone.svg';

export default class SpeechButton extends Component {
  render(props) {
    const SpeechButtonWrapper = styled.div`
      width: 80px;
      height: 80px;
      background: ${props => props.theme.auraBlue }; margin: 0 auto;
      cursor:pointer;
      border-radius: 50%;
      transition: 0.2s all cubic-bezier(0.64, 0.57, 0.67, 1.53);

      &:hover {
        transform: scale(1.2);
      }
    `;

    return (
      <SpeechButtonWrapper onClick={this.props.toggleSpeech.bind(this)} className="speech-btn-w">
        <img className="icon" src={microphoneIcon} style={{ margin: '1em' }}></img>
      </SpeechButtonWrapper>
    );
  }
}
