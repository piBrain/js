import React, { Component } from 'react';
import styled from 'styled-components';

export default class AuraPrompt extends Component {
  render(props) {
    const PromptWrapper = styled.div`
        width: 540px;
        position:absolute;
        overflow:hidden;
        top:2vh;
        left: 50%;
      }
    `;
    const BoxShadow = styled.div`
        box-shadow: 0 2px 2px 1px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        overflow:hidden;
    `;
    const AuraLogo = styled.div`
        width: 60px;
        height: 60px;
        text-align:center;
        vertical-align: middle;
        color:white;
        font-size: 36px;
        line-height: 60px;
        float:left;
        display:block;
        background: ${props => props.theme.auraBlue};
      }
    `;
    const AuraText = styled.p`
        float:left;
        width: calc(100% - 84px);
        line-height: 60px;
        padding: 0 12px;
        height: 60px;
        margin: 0;
        background: ${props => props.theme.gray};
        font-size: 21px;
        display:block;
      }
    `;
    return (
      <PromptWrapper className="prompt-wrapper">
        {this.props.isActive ? <BoxShadow><AuraLogo>A</AuraLogo><AuraText>hello</AuraText></BoxShadow>: ''}
      </PromptWrapper>
    );
  }
}
