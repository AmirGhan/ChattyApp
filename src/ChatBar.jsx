import React, {Component} from 'react';

class ChatBar extends Component {

  constructor (props) {
    super(props),
    this.state = {
      username: '',
      content: '',
      type: ''
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"  onKeyPress={this._handleUsernameChange} defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._createMessage}/>
      </footer>

    );
  }


  _handleUsernameChange = (event) => {
    if (event.key === 'Enter') {
      let newUser = event.target.value;
      let previousUser = this.state.username;
      if (newUser !== previousUser) {
        this.setState({type: "postNotification", content: `${previousUser} has changed their name to ${newUser}.`, username: newUser})
      }
      setTimeout(() => { this.props.messageCreated(this.state) }, 1);
    }
  }


  _createMessage = (event) => {
    if (event.key === 'Enter') {
    this.setState({content: event.target.value, type: "postMessage"})

    if (!this.state.username) {
      this.setState({username: this.props.currentUser})
    }
    setTimeout(() => { this.props.messageCreated(this.state) }, 1);
  }
  }

}
export default ChatBar;
