import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { actions as formActions } from 'react-redux-form'
import LoginContainer from './LoginContainer'
import {
    toggleLogin,
    setSessionToken, setTeam,
} from '../../actions'

const mapStateToProps = (state) => {
    return {
        loggedIn: state.session.loggedIn,
        token: state.session.token,
        team: state.session.team,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        toggleLogin,
        setSessionToken,
        setTeam,
        clearForm: formActions.reset,
        setFormErrors: formActions.setErrors,
        resetFormValidity: formActions.resetValidity
  }, dispatch)
}

export default withApollo(compose(
    connect( mapStateToProps, mapDispatchToProps ),
)(LoginContainer))
