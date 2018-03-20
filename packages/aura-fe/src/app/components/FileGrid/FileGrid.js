import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';

export default class FileGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render(props) {

    const FileGrid = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 77%;
      height: 100%;
      float:left;
      overflow:hidden;
      font-family: 'Noto Sans', sans-serif;
    `;

    return (
      <FileGrid>
        <div></div>
      </FileGrid>
    );
  }
}
