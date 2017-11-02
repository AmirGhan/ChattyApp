import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const {messages} = this.props;
    const listMessages = messages.map((message) => {
      return (
      <Message key={message.id} username={message.username} content={message.content}/>
    )
  })
    console.log("Rendering <MessageList/>");
    return (
      <main className="messages">
      {listMessages}
        <div className="message system">
        Anonymous changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;
