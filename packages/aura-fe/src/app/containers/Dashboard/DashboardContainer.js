import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Tray from '../../components/Tray/Tray.js';
import DashboardTab from '../../components/DashboardTab/DashboardTab.js';

const auraTheme = {
  auraBlue: 'rgb(103,151,208)',
  gray: '#CCC',
  cloudy:'#F5F5F5',
  darkGray:'#757575',
  black: '#262626'
};

class DashboardContainer extends React.Component {
  render(props) {

    const Dashboard = styled.div`
      background-color: ${props => props.theme.cloudy };
      width: 100%;
      height: 100%;
      overflow:hidden;
    `;

    const UsersContainer = styled.div`
      position:relative;
      float:left;
      width: 77%;
      height: 100%;
      bottom: 0;
    `;

    return (
      <ThemeProvider theme={auraTheme}>
        <Dashboard className="dashboard-wrapper">
          <Tray orientation={"left"} />
          <UsersContainer className="users-wrapper">
            <DashboardTab tabTitle={"Staff"} users={{}} />
            <DashboardTab tabTitle={"Patients"} users={{}} />
          </UsersContainer>
        </Dashboard>
      </ThemeProvider>
    );
  }
}

export default withTheme(DashboardContainer);
