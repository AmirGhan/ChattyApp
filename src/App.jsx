import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [] // messages coming from the server will be stored here as they arrive
      };
    }

  componentDidMount() {
    const ws = new WebSocket("ws://localhost:3001");
    this.setState({ws: ws});

    ws.onopen = (event) => {
      console.log('Connected to server')

      ws.onmessage = (event) => {
        let recivedMsg = JSON.parse(event.data);
        const messages = this.state.messages.concat(recivedMsg);
        this.setState({messages: messages});

      }
    };

    console.log("componentDidMount <App />");

  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} messageCreated={this._handleNewMessage}/>
      </div>
    );
  }


  _handleNewMessage = (data) => {

    console.log(data)
      this.state.ws.send(JSON.stringify(data));
  }
 }
export default App;
