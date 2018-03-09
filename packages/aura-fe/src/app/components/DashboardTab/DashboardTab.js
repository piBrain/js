import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card.js';

export default class DashboardTab extends Component {

  render(props) {
    const DashboardTab = styled.div`
      width: 100%;
      overflow:hidden;
    `;

    const UsersWrapper = ({users}) => (
      <div>
        {this.props.users.map(user => (
          <Card dark={true} grid={true} name={user.name} location={user.location} profileImg={user.profileImg} />
        ))}
      </div>
    );
    return (
      <DashboardTab className={this.props.label}>
        <UsersWrapper/>
      </DashboardTab>
    );
  }
}
