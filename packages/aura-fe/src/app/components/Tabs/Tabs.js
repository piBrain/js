import React, { Component } from 'react';
import styled from 'styled-components';

export default class Tabs extends Component {


  constructor(props) {
    super(props);

    this.state = {
      selected: (this.props.selected != null ? this.props.selected : 0 )
    };

    this._renderTabs = this._renderTabs.bind(this);
    this.onClick = this.onClick.bind(this);
    this._renderTitles = this._renderTitles.bind(this);
  }

  onClick(index, e) {
    e.preventDefault();
    this.setState({ selected: index });
  }

  _renderTitles() {
    function labels(child, idx) {
      let activeClass = (this.state.selected === idx ? 'active' : '');

      const TabButton = styled.div`
        width: 200px;
        background: ${props => props.theme.darkGray };
        height: 50px;
        display:block;
        float:left;
        cursor:pointer;

        &:hover {
          background: ${props => props.theme.gray };
        }
      `;

      const ButtonText = styled.p`
        text-align: center;
        vertical-align: middle;
        color: white;
      `;

      return (
        <TabButton role="tab" key={idx} aria-controls={`panel${idx}`}>
          <ButtonText className={activeClass}  onClick={this.onClick.bind(this, idx)} href="#">
            {child.props.label}
          </ButtonText>
        </TabButton>
      );
    }

    const TabsHeader = styled.div`
      width: 100%;
      overflow:hidden;
      margin-top: 175px;
      display:block;
      `;

   return (
      <TabsHeader className="tabs__labels" role="tablist">
        {this.props.children.map(labels.bind(this))}
      </TabsHeader>
    );
  }

  _renderTabs() {

    const Content = styled.div`
      width: 100%;
      margin: 0;
      padding: 0;
      `;
    return (
      <Content className="tabs__content">
        {this.props.children[this.state.selected]}
      </Content>
    );
  }

  render(props) {
    const Tabs = styled.div`
      width: 100%;
      height: 100%;
      margin:0;
      padding: 0;
      overflow:hidden;
    `;
    const TabsContainer = styled.div`
      position:relative;
      float:left;
      width: 77%;
      height: 100%;
      bottom: 0;
    `;

    return (
      <TabsContainer className="tabs">
        {this._renderTitles()}
        <div>
          {this._renderTabs()}
        </div>
      </TabsContainer>
    );
  }
}
