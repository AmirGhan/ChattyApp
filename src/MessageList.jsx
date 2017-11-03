import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const {messages} = this.props;
    const listMessages = messages.map((message) => {
      if (message.type === "incomingMessage") {
        return (
        <Message key={message.id} username={message.username} content={message.content} userColor={message.color}/>
        )
      } else {
        return (
          <div  className="message system" key={message.id}>{message.content}</div>
        )
      }
    })

    console.log("Rendering <MessageList/>");
    return (
      <main className="messages">
      {listMessages}
      </main>
    );
  }
}
export default MessageList;
