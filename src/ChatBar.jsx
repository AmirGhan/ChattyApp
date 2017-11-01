import React, {Component} from 'react';

class ChatBar extends Component {
  state = {};
  constructor (props) {
    super(props),
    this.state = {
      username: '',
      content: ''
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"  onChange={this._handleUsernameChange} defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._createMessage}/>
      </footer>

    );
  }


  _handleUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }


  _createMessage = (event) => {
    if (event.key === 'Enter') {
    this.setState({content: event.target.value})
    setTimeout(() => { this.props.messageCreated(this.state) }, 1);
  }
  }

}
export default ChatBar;
