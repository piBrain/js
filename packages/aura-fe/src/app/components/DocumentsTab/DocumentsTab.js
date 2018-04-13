import React, { Component } from 'react';
import styled from 'styled-components';
import {StaggeredMotion, spring, presets } from 'react-motion';

export default class DocumentsTab extends Component {

  constructor(props) {
    super(props);
    this._renderFiles= this._renderFiles.bind(this);
  }

  _renderFiles() {
    const DocumentRow = styled.div`
      width: 100%;
      float:left;
      height: 60px;
      border: 1px solid white;
      background: #333;
    `;

    const FileName = styled.p`
      float:left;
    `;

    const ForwardButton = styled.img`
      float:right;
    `;

    const files = this.props.files;

    const Files = files.map((file, idx) => {

      return(
        <DocumentRow key={idx} >
          <FileName key={idx} >{file.name}</FileName>
          <ForwardButton />
        </DocumentRow>
      );
    });

    return(Files);
  }


  render(props) {
    const DocumentsTab = styled.div`
      width: 100%;
      overflow:hidden;
    `;

    const _defaultStyles = [];
    const files = this.props.files;

    for (let i = 0; i < files.length; i++) {
      _defaultStyles.push({ y: 20, o: 0 })
    }

    return (
      <DocumentsTab className={this.props.label}>
        {this._renderFiles()}
      </DocumentsTab>
    );
  }
}
