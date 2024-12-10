"use strict";

var io = require('socket.io')(8000, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true // Optional, if you want to allow cookies

  }
});

var users = {};
io.on('connection', function (socket) {
  socket.on('new-user-joined', function (name) {
    console.log('New user:', name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });
  socket.on('send', function (message) {
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id]
    });
  });
  socket.on('disconnect', function (message) {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});