import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Tray from '../../components/Tray/Tray.js';
import AuraPrompt from '../../components/AuraPrompt/AuraPrompt.js';
import FileGrid from '../../components/FileGrid/FileGrid.js';

const auraTheme = {
  auraBlue: 'rgb(103,151,208)',
  gray: '#CCC',
  cloudy:'#F5F5F5',
  lightGray: '#a1a1a1',
  darkGray:'#757575',
  black: '#262626'
};

const mock_file_data = [
  {
    fileName: 'transcript.pdf',
    date: '', //if we are going to store this in the backend or have some sort of naming convention??
    author: 'blank',
    fileType: require('../../../assets/pdf.png')
  },
  {
    fileName: 'discussion.pdf',
    date: '', //if we are going to store this in the backend or have some sort of naming convention??
    author: 'blank',
    fileType: require('../../../assets/pdf.png')
  },
  {
    fileName: 'research.pdf',
    date: '', //if we are going to store this in the backend or have some sort of naming convention??
    author: 'blank',
    fileType: require('../../../assets/pdf.png')
  },
  {
    fileName: 'request.pdf',
    date: '', //if we are going to store this in the backend or have some sort of naming convention??
    author: 'blank',
    fileType: require('../../../assets/pdf.png')
  },
  {
    fileName: 'transcript.pdf',
    date: '', //if we are going to store this in the backend or have some sort of naming convention??
    author: 'blank',
    fileType: require('../../../assets/pdf.png')
  },
];

class FileExplorerContainer extends React.Component {

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

    const FileExplorer = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 100%;
      height: 100%;
      overflow:hidden;
      font-family: 'Noto Sans', sans-serif;
    `;

    return (
      <ThemeProvider theme={auraTheme}>
        <FileExplorer className="dashboard-wrapper">
          <Tray fe={true} chatboxRender={true} toggleSpeech={this.toggleSpeech} orientation={"left"} />
          <FileGrid files={mock_file_data} className="fg-w" />
        </FileExplorer>
      </ThemeProvider>
    );
  }
}

export default withTheme(FileExplorerContainer);
