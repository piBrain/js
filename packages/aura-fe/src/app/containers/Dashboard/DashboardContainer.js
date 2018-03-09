import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Tray from '../../components/Tray/Tray.js';
import DashboardTab from '../../components/DashboardTab/DashboardTab.js';
import Tabs from '../../components/Tabs/Tabs.js';

const auraTheme = {
  auraBlue: 'rgb(103,151,208)',
  gray: '#CCC',
  cloudy:'#F5F5F5',
  darkGray:'#757575',
  black: '#262626'
};


const patient_table = [
  {
    name: 'Jon Doe',
    location: 'New York, NY',
    profileImg: ''
  },
  {
    name: 'Ian Butler',
    location: 'New York, NY',
    profileImg: ''
  },
  {
    name: 'Cory Dickson',
    location: 'New York, NY',
    profileImg: ''
  }
];

const staff_table = [
  {
    name: 'Dr. M',
    location: 'New York, NY',
    profileImg: ''
  },
  {
    name: 'Dr. N',
    location: 'New York, NY',
    profileImg: ''
  },
  {
    name: 'Dr. F',
    location: 'New York, NY',
    profileImg: ''
  },
  {
    name: 'Dr. D',
    location: 'New York, NY',
    profileImg: ''
  },
  {
    name: 'Dr. H',
    location: 'New York, NY',
    profileImg: ''
  }
];



class DashboardContainer extends React.Component {
  render(props) {

    const Dashboard = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 100%;
      height: 100%;
      overflow:hidden;
    `;

    return (
      <ThemeProvider theme={auraTheme}>
        <Dashboard className="dashboard-wrapper">
          <Tray orientation={"left"} />
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
