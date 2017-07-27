import React, {Component} from 'react';
import uuid from 'uuid'
import MessageList from './MessageList.jsx'

class ChatBar extends Component {
  //create new state for username when changed in chatbar input
  constructor(props) {
    super(props);
    this.state = {
      type: "postMessage",
      username: props.currentUser.name}
    //bind 'this' to specific handle events.
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
  }
//keydown event to add input when 'Enter' is clicked
handleKeyDown(event){
  if (event.key === 'Enter') {
    const newMessage = {
      type: this.state.type,
      id: uuid(),
      username: this.state.username,
      content: event.target.value
    };
    // add message to chatbox and send message to server
    this.props.addMessage(newMessage);
    this.props.sendMessage(newMessage);
    event.target.value = '';
  }
}
// update username if state is changed
// check to see if username actually changes before onBlur event
// onBlur event to send notification message
handleUsernameChange(event){
  if (this.state.username !== event.target.value) {
  this.handleNotification(event);
  this.setState({
    username: event.target.value
  });
}
}
//when username is changed add a notification message
handleNotification(event) {
const newNotification = {id: uuid(),
    type: "postNotification",
    content: this.state.username + " changed their name to " + event.target.value
     };
 // add notification to chatbox and send to server (to broadcast)
this.props.addMessage(newNotification);
this.props.sendMessage(newNotification);
};

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} onBlur={this.handleUsernameChange} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.handleKeyDown}/>
      </footer>
    );
  }
}
export default ChatBar;