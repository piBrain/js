import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Tray from '../../components/Tray/Tray.js';
import DashboardTab from '../../components/DashboardTab/DashboardTab.js';
import Tabs from '../../components/Tabs/Tabs.js';
import AuraPrompt from '../../components/AuraPrompt/AuraPrompt.js';

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

const staff_table = [
  {
    name: 'Dr. Manager',
    location: 'New York, NY',
    profileImg: require('../../../assets/cory.JPG')
  },
  {
    name: 'Dr. Nietzche',
    location: 'New York, NY',
    profileImg: require('../../../assets/wam.jpg')
  },
  {
    name: 'Dr. Fo',
    location: 'New York, NY',
    profileImg: require('../../../assets/itb.jpg')
  },
  {
    name: 'Dr. Dealbreaker',
    location: 'New York, NY',
    profileImg: require('../../../assets/wam.jpg')
  },
  {
    name: 'Dr. Hellmann',
    location: 'New York, NY',
    profileImg: require('../../../assets/itb.jpg')
  }
];

class DashboardContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      speechActive: false
    }

    this.toggleSpeech = this.toggleSpeech.bind(this);
  }

  toggleSpeech(e) {
    e.preventDefault();
    this.setState({speechActive: !this.state.speechActive})
  }


  render(props) {

    const Dashboard = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 100%;
      height: 100%;
      overflow:hidden;
      font-family: 'Noto Sans', sans-serif;
    `;

    return (
      <ThemeProvider theme={auraTheme}>
        <Dashboard className="dashboard-wrapper">
          <Tray toggleSpeech={this.toggleSpeech} orientation={"left"} />
          <AuraPrompt isActive={this.state.speechActive} />
            <Tabs>
              <DashboardTab label={"Staff"} users={staff_table} />
              <DashboardTab label={"Patients"} users={patient_table} />
            </Tabs>
        </Dashboard>
      </ThemeProvider>
    );
  }
}

export default withTheme(DashboardContainer);
