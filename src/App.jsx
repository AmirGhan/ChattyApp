import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        currentUser: {
          name: "Anonymous",
          userColor: '#000000'
        }, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [], // messages coming from the server will be stored here as they arrive
        onlineUsers: 0,

      };
    }

  componentDidMount() {
    const ws = new WebSocket("ws://localhost:3001");
    this.setState({ws: ws});

    ws.onopen = (event) => {
      console.log('Connected to server');

      ws.onmessage = (event) => {
        let receivedMsg = JSON.parse(event.data);
        switch(receivedMsg.type) {
          case "incomingMessage":
            // handle incoming message
            const messages = this.state.messages.concat(receivedMsg);
            this.setState({messages: messages});
            break;
          case "incomingNotification":
            // handle incoming notification
            const notification = this.state.messages.concat(receivedMsg);
            this.setState({messages: notification});
            break;
          case "connected":
            // handle connected users
            this.setState({onlineUsers: receivedMsg.onlineUsers});
            break;
          case "userColor":
            // handle user color
            let currentUser = this.state.currentUser;
            currentUser.userColor = receivedMsg.color;
            this.setState({currentUser: currentUser});
            break;
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + receivedMsg.type);
        }
      };
    };
    console.log("componentDidMount <App />");
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="counter">{this.state.onlineUsers} user(s) online</p>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser.name} userColor={this.state.currentUser.userColor} messageCreated={this._handleNewMessage}/>
      </div>
    );
  }


  _handleNewMessage = (data) => {
      this.state.ws.send(JSON.stringify(data));
  }
 }
export default App;
