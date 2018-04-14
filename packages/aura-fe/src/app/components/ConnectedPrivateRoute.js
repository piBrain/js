import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={(props) => {
        return (rest.loggedIn === true && rest.token
          ? <Component {...props} {...rest} />
          : <Redirect to='/login' push />)
      }} />
)}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.session.loggedIn,
        token: state.session.token
    }
}

export default compose(
    connect(mapStateToProps)
)(PrivateRoute)
