// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// Create random color
function createColor() {
  let hexcodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let color = [0, 0, 0, 0, 0, 0];
  color = color.map((element) => {
    return hexcodes[Math.floor(Math.random() * 16)];
  });
  return `#${color.join('')}`;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const connectedUsers = {type: "connected", onlineUsers: wss.clients.size};
  wss.broadcast(JSON.stringify(connectedUsers));
  let userColor = {type: "userColor", color: createColor()};
  ws.send(JSON.stringify(userColor));


  ws.on('message', function incoming(message) {
    let recievedMsg = JSON.parse(message);
    recievedMsg.id = uuidv4();
    if (recievedMsg.type === "postNotification") {
      recievedMsg.type = "incomingNotification";
    }
    if (recievedMsg.type === "postMessage") {
      recievedMsg.type = "incomingMessage";
    }
    let data = JSON.stringify(recievedMsg);
    wss.broadcast(data);

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    connectedUsers.onlineUsers = wss.clients.size;
    wss.broadcast(JSON.stringify(connectedUsers));
  });
});
