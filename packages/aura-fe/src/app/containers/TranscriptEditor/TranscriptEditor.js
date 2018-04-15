import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import AuraPrompt from '../../components/AuraPrompt/AuraPrompt.js';
import Tray from '../../components/Tray/Tray.js';
import {Editor, EditorState} from 'draft-js';


const auraTheme = {
  auraBlue: 'rgb(103,151,208)',
  gray: '#CCC',
  cloudy:'#F5F5F5',
  lightGray: '#a1a1a1',
  darkGray:'#757575',
  black: '#262626'
};

class TranscriptEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  render(props) {

    const EditorWrapper = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 100%;
      height: 100%;
      overflow:hidden;
      font-family: 'Noto Sans', sans-serif;
    `;

    return (
      <ThemeProvider theme={auraTheme}>
        <EditorWrapper className="editor-wrapper">
          <Tray chatboxRender={true} toggleSpeech={this.props.toggleVoice} orientation={"left"} />
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
        </EditorWrapper>
      </ThemeProvider>
    );
  }
}

export default withTheme(TranscriptEditor);
