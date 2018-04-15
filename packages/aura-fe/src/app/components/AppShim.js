import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withConnectedVoice } from './VoiceOverlay/ConnectedVoiceOverlay'
import { withTheme } from 'styled-components';
import PrivateRoute from './ConnectedPrivateRoute'
import DashboardContainer from '../containers/Dashboard/DashboardContainer';
import ConnectedLoginContainer from '../containers/Login/ConnectedLoginContainer';
import DocumentsContainer from '../containers/Documents/DocumentsContainer';
import FileExplorerContainer from '../containers/FileExplorer/FileExplorerContainer';
import TranscriptEditor from '../containers/TranscriptEditor/TranscriptEditor';
import ChatWindow from '../containers/ChatWindow/ChatWindow';

class AppShim extends React.Component {
    constructor(props) {
        super(props)
    }
    render(props) {
        return (
        <div>
        <Switch>
        <Route exact path='/login' component={ConnectedLoginContainer} {...this.props}/>
        <PrivateRoute exact path='/' component={DashboardContainer} {...this.props}/>
        <PrivateRoute exact path='/chat' component={ChatWindow} {...this.props}/>
        <PrivateRoute exact path='/docs' component={DocumentsContainer} {...this.props}/>
        <PrivateRoute exact path='/transcripts' component={FileExplorerContainer} {...this.props}/>
        <PrivateRoute exact path='/editor' component={TranscriptEditor} {...this.props}/>
        </Switch>
        </div>
       )
    }
}

export default withConnectedVoice(withTheme(AppShim))
