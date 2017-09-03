import { connect } from 'react-redux'

import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'

import { actions } from 'react-redux-form'

import gql from 'graphql-tag'

import NewsletterForm from './NewsletterForm'

import { displaySubmitMessage } from '../../../actions.js'

const signUp = gql`
  mutation($firstName: String!, $lastName: String!,  $email: String!, $url: String!, $organization: String) {
    newsletterSignUp(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      organization: $organization,
      url: $url
    )
  }
`
const newsletterSignUp = graphql(signUp, {
  name: 'newsletterSignUp',
  props: ({ newsletterSignUp }) => ({
    newsletterSignUp: ( { firstName, lastName, email, url, organization } ) => {
      return newsletterSignUp({
        variables: {
          firstName,
          lastName,
          email,
          url,
          organization,
        },
      })
    }
  }),
})

const mapStateToProps = (state) => ({ submitMessage: state.newsletterState.displaySubmitMessage })

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setSubmitted: actions.setSubmitted,
      setSubmitFailed: actions.setSubmitFailed,
      setPending: actions.setPending,
      reset: actions.reset,
      displaySubmitMessage
    },
    dispatch
  )
}


export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  newsletterSignUp,
)(NewsletterForm)


