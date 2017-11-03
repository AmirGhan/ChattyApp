import React, {Component} from 'react';

class Message extends Component {
  render() {
    const {username, content, userColor} = this.props;
    console.log("Rendering <Message/>");
    return (
      <div className="message">
        <span className="message-username" style={{color: userColor}}>{username}</span>
        <span className="message-content">{content}</span>
      </div>

    );
  }
}
export default Message;
