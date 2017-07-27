import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    currentUser: {name: "Bob"},
    messages: []
    };
  }
//function to turn new message into a string
  sendNewMessage(newMessage) {
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
  //connecting to chatty-server
    this.socket = new WebSocket("ws://localhost:3001");
//sending data to the server
    this.socket.onopen = () => {
      console.log("Connected to the Server!!")
    };

    this.socket.onmessage = (event) => {
      this.addNewMessage(JSON.parse(event.data));
    };
  }
 // Add a new message to the list of messages in the data store
  addNewMessage(newMessage) {
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({
      messages: newMessages
    });
  }

// show html divs on the page
  render() {
    return (
      <div>
        <NavBar/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser}
          sendMessage={this.sendNewMessage.bind(this)}
          addMessage={this.addNewMessage.bind(this)}/>
      </div>
    );
  }
}
export default App;
