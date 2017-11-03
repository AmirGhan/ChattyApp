import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props),
    this.state = {
      username: '',
      content: '',
      type: '',
      color: '#000000'
    };
  }

  render() {
    console.log("Rendering <ChatBar/>");
    const {currentUser, userColor, messageCreated} = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"  onKeyPress={this._handleUsernameChange} defaultValue={currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._createMessage}/>
      </footer>

    );
  }

// Passing the username to App
  _handleUsernameChange = (event) => {
    if (event.key === 'Enter') {
      let newUser = event.target.value;
      let previousUser = this.state.username;
      let defaultUser = this.props.currentUser;

      if (previousUser === "") {
        previousUser = defaultUser
      }
      if (newUser !== previousUser) {
        this.setState({type: "postNotification", content: `${previousUser} has changed their name to ${newUser}.`, username: newUser})
        setTimeout(() => {this.props.messageCreated(this.state) }, 1);
      }
    }
  }

// Passing the content to App
  _createMessage = (event) => {
    if (event.key === 'Enter') {
    this.setState({content: event.target.value, type: "postMessage", color: this.props.userColor})


    if (!this.state.username) { // Set the username to Anonymous if user don't enter a username
      this.setState({username: this.props.currentUser})
    }
    setTimeout(() => {this.props.messageCreated(this.state) }, 1);
  }
  }

}
export default ChatBar;
