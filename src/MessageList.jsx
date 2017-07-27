import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render() {
    return (
      <div className="messages">
          <div className="message system">
          </div>
          {
         this.props.messages.map((messages, index) => {
          return (
          <Message key={index} messages={messages}/>
          )
        })
       }
      </div>
    );
  }
}
export default MessageList;