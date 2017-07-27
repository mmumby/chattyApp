import React, {Component} from 'react';
import Message from './Message.jsx'
import ChatBar from './ChatBar.jsx'

class MessageList extends Component {

   render() {
    return (
      <div className="messages">
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