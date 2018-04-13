import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import AuraPrompt from '../../components/AuraPrompt/AuraPrompt.js';
import Card from '../../components/Card/Card.js';
import Tabs from '../../components/Tabs/Tabs.js';
import DocumentsTab from '../../components/DocumentsTab/DocumentsTab.js';

const auraTheme = {
  auraBlue: 'rgb(103,151,208)',
  gray: '#CCC',
  cloudy:'#F5F5F5',
  lightGray: '#a1a1a1',
  darkGray:'#757575',
  black: '#262626'
};

const files_table = [
  {name:''},
  {name:''},
  {name:''}
];

const patient_table = [
  {
    name: 'Jon Doe',
    location: 'New York, NY',
    profileImg: require('../../../assets/cory.JPG')
  },
  {
    name: 'Ian Butler',
    location: 'New York, NY',
    profileImg: require('../../../assets/itb.jpg')
  },
  {
    name: 'Cory Dickson',
    location: 'New York, NY',
    profileImg: require('../../../assets/wam.jpg')
  }
];

class DocumentsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      speechActive: false
    }

    this.toggleSpeech = this.toggleSpeech.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }

  toggleSpeech(e) {
    e.preventDefault();
    this.setState({speechActive: !this.state.speechActive})
  }


  _renderHeader() {
    const Logo = styled.img`
    `;

    const BackButton = styled.img`
    `;

    const Header = styled.div`
      width: 100%;
      height: 76px;
      background: #202020;
      position:relative;
      top:0;
      left:0;
    `;

    return(
      <Header>
        <Logo/>
        <BackButton/>
      </Header>
    );
  }


  render(props) {

    const Documents = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 100%;
      height: 100%;
      overflow:hidden;
      font-family: 'Noto Sans', sans-serif;

      p {
        color: #202020;
      }

      .tabs__labels {
        margin-top:0;
      }

      .tabs {
        width:100%;
      }

      .tabs__content {
        padding: 0;
      }
    `;

    const CenterContainer = styled.div`
      margin:0 auto;
      text-align:center;
      padding:2em;
      overflow:hidden;
    `;

    return (
      <div>
        {this._renderHeader()}
        <div>
          <CenterContainer>
            <Card dark={false} grid={true} name={patient_table[0].name} location={patient_table[0].location} profileImg={patient_table[0].profileImg} style={{float:'none', margin: '0 auto' }}/>
          </CenterContainer>
          <Documents className="documents-wrapper">
            <Tabs>
              <DocumentsTab key={0} label={"Labs"} files={files_table} />
              <DocumentsTab key={1} label={"Imaging"} files={files_table} />
              <DocumentsTab key={2} label={"Refferals"} files={files_table} />
            </Tabs>
          </Documents>
        </div>
      </div>
    );
  }
}

export default DocumentsContainer;
