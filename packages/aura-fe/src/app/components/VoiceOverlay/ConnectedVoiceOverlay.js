import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { bindActionCreators } from 'redux'
import {
    toggleVoice,
} from '../../actions'
import { withUnconnectedVoice } from './VoiceOverlay'

const mapStateToProps = (state) => {
    return {
        recording: state.voice.recording
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        toggleVoice,
  }, dispatch)
}

export const withConnectedVoice = (WrappedComponent) => {
    return compose(
        connect(mapStateToProps, mapDispatchToProps)
    )(withUnconnectedVoice(WrappedComponent))
}
