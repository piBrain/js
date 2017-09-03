import React, { Component, PropTypes } from 'react';
import styles from './Chatbox.scss';
import MessageList from './MessageList/MessageList.jsx';
import InputBox from './InputBox/InputBox.jsx';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import CSSModules from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{message:[]}],
    }

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }
  componentDidMount() {
    setInterval(()=>{this.setState({ data: this.props.data});},2000);
  }

  handleMessageSubmit (e) {
    //redux
    data.push(e);
  }

  render(props) {
    return (
      <div id="chatbox" className={"chatbox-container"}>
        <MessageList data={this.state.data}/>
        <InputBox handleMessageSubmit={this.handleMessageSubmit}/>
      </div>
    );
  }
}
export default CSSModules(Chatbox, styles);

