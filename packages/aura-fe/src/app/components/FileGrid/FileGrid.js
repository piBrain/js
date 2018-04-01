import React from 'react';
import styled from 'styled-components';
import {Motion, spring} from 'react-motion';

export default class FileGrid extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderFiles() {

    const File = styled.div`
      display:grid;
      cursor:pointer;
      text-align:center;
      transition: 0.2s background ease-in-out;
      background: transparent;

      &:hover {
        background: ${props => props.theme.gray};
      }
    `;

    const FileImage = styled.img`
      margin: 1em auto;
      width: 60px;
      height: 80px;
      text-align:center;
    `;

    const files_array = this.props.files;

    const FileComponents = files_array.map( (file, idx) => {
      return (
        <Motion key={idx} defaultStyle={{o:0, w: 0}} style={{o: spring(1), w:spring(100, {precision:0.01})}}>
        {
          (interpolatingStyle) =>

          <File style={{ opacity: interpolatingStyle.o, width: interpolatingStyle.w + '%'}} key={idx}>
          <FileImage key={idx} src={file.fileType} alt={file.fileName} />
            {file.fileName}
          </File>
        }
        </Motion>
      );
    });

    const FileGrid = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 77%;
      height: 100%;
      float:left;
      display:grid;
      grid-template-columns: repeat(4,1fr);
      grid-auto-rows: 225px;
      overflow:hidden;
    `;

    return (
      <FileGrid className="file-grid-w">
        {FileComponents}
      </FileGrid>
    );
  }

  render(props) {
    const GridWrapper = styled.div`
    `;

    return (
      <GridWrapper>
        {this._renderFiles()}
      </GridWrapper>
    );
  }
}
