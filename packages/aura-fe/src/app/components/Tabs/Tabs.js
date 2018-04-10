import React, { Component } from 'react';
import styled from 'styled-components';
import {Motion, spring} from 'react-motion';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: (this.props.selected ? this.props.selected : 0 )
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
        background: ${props => props.className === 'active' ? props.theme.darkGray : props.theme.gray };
        height: 50px;
        display:block;
        float:left;
        cursor:pointer;
        transition: 0.15s background-color ease-in-out;
        box-shadow: 0 2px 2px 0px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);


        &:hover {
          background: ${props => props.theme.lightGray };
        }
      `;

      const ButtonText = styled.p`
        text-align: center;
        vertical-align: middle;
        color: white;
      `;

      return (
        <Motion defaultStyle={{o:0, w: 0}} style={{o: spring(1), w:spring(200, {precision:0.01})}}>
        {
          interpolatingStyle =>
          <TabButton style={{ opacity: interpolatingStyle.o, width: interpolatingStyle.w + 'px'}} onClick={this.onClick.bind(this, idx)} className={activeClass} role="tab" key={idx} aria-controls={`panel${idx}`}>
            <ButtonText href="#">
              {child.props.label}
            </ButtonText>
          </TabButton>
        }
        </Motion>
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
      padding: 1em;
      `;
    return (
      <Content className="tabs__content">
        {this.props.children[this.state.selected]}
      </Content>
    );
  }

  render(props) {
    const TabsContainer = styled.div`
      position:relative;
      float:left;
      width: 75%;
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
