import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
//check to see message type and display appropiate message on page.
    switch(this.props.messages.type) {
      case 'postMessage':
      return(
      <div className="message">
        <span className="message-username">{this.props.messages.username}</span>
        <span className="message-content">{this.props.messages.content}</span>
      </div>
      )
      break;
      case 'incomingMessage':
      return(
      <div className="message">
        <span className="message-username">{this.props.messages.username}</span>
        <span className="message-content">{this.props.messages.content}</span>
      </div>
      )
      break;
      case 'postNotification':
      return(<span className="message system">{this.props.messages.content}</span>)
      break;
      case 'incomingNotification':
      return(<span className="message system">{this.props.messages.content}</span>)
      break;
    }
  }
}
export default Message;
