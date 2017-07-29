// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//check how many users are online
//send info to client when function called.
function onlineUserCount() {
    let connectedUser = {type: 'usersOnline',
      users: wss.clients.size
      }
    let onlineUserData = JSON.stringify(connectedUser);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(onlineUserData);
      }
    });
  }
//once connected, do things
wss.on('connection', (ws) => {
  console.log('Client connected');
  onlineUserCount();

  ws.onmessage = (message) => {
    //override imcoming message ID and set a new ID
    let messageData = JSON.parse(message.data);
    messageData.id = uuid();
    //change message type from post to incoming
    switch(messageData.type) {
      case "postNotification":
        messageData.type = "incomingNotification";
        break;
      case "postMessage":
        messageData.type = "incomingMessage";
        break;
      default:
      }
    let dataString = JSON.stringify(messageData);
    // Broadcast message to everyone except the sender.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(dataString);
      }
    });
  };
  //callback for when a client closes the socket.
  //update online user count
  ws.on('close', () => {
    console.log('Client disconnected');
    onlineUserCount();
  });
});
