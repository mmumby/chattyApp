import React, {Component} from 'react';
import uuid from 'uuid'

class ChatBar extends Component {
  //create new state for username
  constructor(props) {
    super(props);
    this.state = { username: props.currentUser.name}
    //bind this to specific handle events.
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }


//keydown event to add input when enter is clicked
handleKeyDown(event){
  if (event.key === 'Enter') {
    const newMessage = {
      id: uuid(),
      username: this.state.username,
      content: event.target.value
    };

    this.props.addMessage(newMessage);
    this.props.sendMessage(newMessage);
    event.target.value = '';
  }
}
// update username if state is changed
handleUsernameChange(event){
  console.log(this.state.username);
  this.setState({
    username: event.target.value
  })
}

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} onChange={this.handleUsernameChange} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.handleKeyDown}/>
      </footer>

    );
  }
}
export default ChatBar;