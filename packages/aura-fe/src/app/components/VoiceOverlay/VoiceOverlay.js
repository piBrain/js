import styled from 'styled-components';
import  { ReactMic } from 'react-mic'
import React from 'react'

export const withUnconnectedVoice = (WrappedComponent) => {
    return class VoicedComponent extends React.Component {
        render(props) {
            const OverlayWrapper = styled.div`
                width: 100%;
                height: 100%;
                overflow: hidden;
            `
            const StyledMic  = styled(ReactMic)`
                visibility: ${ this.props.recording ? 'visible' : 'hidden' }
                width: 300px;
                height: 5%;
                position: absolute;
                left: 60%;
                top: 85%;
                transform: translate(-50%, -60%);
                border-radius: 40px;
                margin-top: 2.5%;
            `
            return (
                <OverlayWrapper>
                    <WrappedComponent {...this.props} />
                    <StyledMic
                        record={this.props.recording}
                        className='recording-wave'
                        strokeColor={this.props.theme.auraBlue}
                    />
                </OverlayWrapper>
            )
        }
    }
}
