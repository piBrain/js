import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import AuraPrompt from '../../components/AuraPrompt/AuraPrompt.js';
import Card from '../../components/Card/Card.js';

const auraTheme = {
  auraBlue: 'rgb(103,151,208)',
  gray: '#CCC',
  cloudy:'#F5F5F5',
  lightGray: '#a1a1a1',
  darkGray:'#757575',
  black: '#262626'
};

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
    `;

    const CenterContainer = styled.div`
      margin:0 auto;
      text-align:center;
    `;

    return (
      <div>
        {this._renderHeader()}
        <div>
          <CenterContainer>
            <Card dark={false} grid={true} name={patient_table[0].name} location={patient_table[0].location} profileImg={patient_table[0].profileImg} />
          </CenterContainer>
          <Documents className="documents-wrapper"></Documents>
        </div>
      </div>
    );
  }
}

export default DocumentsContainer;
