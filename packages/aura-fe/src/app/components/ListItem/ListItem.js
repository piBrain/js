import React, { Component } from 'react';
import styled from 'styled-components';

export default class ListItem extends Component {
  render(props) {
    const ListItem = styled.div`
      font-size: 16px;
      color: white;
      height: 3.5em;
      line-height: 3.5em;
      margin: 0 auto;
      text-align:center;
      padding: 0 2em;
      overflow:hidden;
    `;

    const Column = styled.div`
      width: calc(25% - 8px);
      display:block;
      float:left;
      background: ${props => props.theme.darkGray };
      margin: 4px 2px;
      height: 100%;
      overflow:hidden;
    `;

    const RightColumn = Column.extend`
      width:75%;
      background: ${props => props.theme.gray };
    `;

    return (
      <ListItem className="li-wrapper">
        <Column>Key</Column>
        <RightColumn>Value</RightColumn>
      </ListItem>
    );
  }
}
