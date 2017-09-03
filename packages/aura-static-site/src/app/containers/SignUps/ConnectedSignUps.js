import { connect } from 'react-redux'

import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'

import gql from 'graphql-tag'

import SignUps from './SignUps'
const verifyNewsletter = gql`
  mutation verifyNewsletterSignUp($url: String!, $email: String!, $timestamp: DateTime!, $firstName: String!, $lastName: String!, $organization: String!) {
    verifyNewsletterEmail(url: $url, email: $email, timestamp: $timestamp, firstName: $firstName, lastName: $lastName, organization: $organization)
  }
`

const verifySign = gql`
  mutation verifySignUp($nonce: String!, $url: String!) {
    verifyUserEmail(nonce: $nonce, url: $url)
  }
`

const verifyNewsletterSignUp = graphql(verifyNewsletter, {
  props: ({ mutate }) => ({
    name: 'verifyNewsletterSignUp',
    verifyNewsletterSignUp: ( { firstName, lastName, email, organization, url, expiryTime } ) => {
      return mutate({
        variables: {
          firstName,
          lastName,
          email,
          organization,
          url,
          timestamp: expiryTime,
        },
      })
    }
  }),
})
const verifySignUp = graphql(verifySign, {
  name: 'verifySignUp',
  props: ({ mutate }) => ({
    verifySignUp: ( { firstName, lastName, email, organization } ) => {
      return mutate({
        variables: {
          firstName,
          lastName,
          email,
          organization,
        },
      })
    }
  }),
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { },
    dispatch
  )
}


export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  verifyNewsletterSignUp,
  verifySignUp
)(SignUps)

