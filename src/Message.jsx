import React, {Component} from 'react';

class Message extends Component {
  render() {
    const {username, content} = this.props
    console.log("Rendering <Message/>");
    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>

    );
  }
}
export default Message;
