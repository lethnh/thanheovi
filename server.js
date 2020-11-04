'use strict';

const express = require('express');
var app = express();
var path = require('path');
const socketIO = require('socket.io');
var server = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
// const INDEX = 'index.html';

app.use(express.static(path.join(__dirname, 'public')));

// const server = express()
//   // .use((req, res) => res.sendFile(INDEX, {
//   //   root: __dirname
//   // }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

server.listen(PORT, () => {
  console.log('Server listening at port %d', PORT);
});

const io = socketIO(server);
var clients = 0;
var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;
  clients++;
  console.log('Client connected');
  io.sockets.emit('broadcast', {
    description: clients + ' clients connected!'
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
    io.emit('new message', data);
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
    clients--;
    console.log('Client disconnected');
    io.sockets.emit('broadcast', {
      description: clients + ' clients connected!'
    });
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);