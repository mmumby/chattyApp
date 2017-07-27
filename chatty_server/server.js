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

//once connected, do things
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.onmessage = (message) => {
    console.log('received: %s', message.data);

    //override imcoming message ID and set a new ID
    let messageData = JSON.parse(message.data);
    messageData.id = uuid();
    let dataString = JSON.stringify(messageData);
    // Broadcast message to everyone else (not sender)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(dataString);
      }
    });
  };
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});