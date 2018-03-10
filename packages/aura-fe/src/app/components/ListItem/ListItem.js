import React, { Component } from 'react';
import styled from 'styled-components';
import {Motion, spring, presets } from 'react-motion';

export default class ListItem extends Component {
  render(props) {
    const ListItem = styled.div`
      font-size: 16px;
      color: white;
      height: 3.5em;
      line-height: 3.5em;
      margin: 6px auto;
      text-align:center;
      padding: 0 2em;
      transform: all 0.2s ease-in-out;
    `;

    const Column = styled.div`
      width: calc(25% - 4px);
      display:block;
      float:left;
      background: ${props => props.theme.darkGray };
      margin: 1px;
      height: 100%;
      overflow:hidden;
    `;

    const RightColumn = Column.extend`
      width:75%;
      background: ${props => props.theme.lightGray };
    `;

    return (
      <Motion defaultStyle={{o:0}} style={{o:spring(1, {precision: 0.1})}}>
      {
        interpolatingStyle => <ListItem style={{opacity: interpolatingStyle.o}} className="li-wrapper"><Column>{this.props.columnKey}</Column><RightColumn>{this.props.columnValue}</RightColumn></ListItem>
      }
      </Motion>
    );
  }
}
