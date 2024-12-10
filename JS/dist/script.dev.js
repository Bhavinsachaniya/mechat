"use strict";

var socket = io('http://localhost:8000');
var form = document.getElementById('chat-input');
var messageInput = document.getElementById('messageInput'); // Fixed camelCase

var messageContainer = document.querySelector(".chat-messages"); // Fixed camelCase

var rmessage = document.getElementById('message-received');
var smessage = document.getElementById('message-sent');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var message = messageInput.value;
  append("you: ".concat(message), 'right');
  socket.emit('send', message);
  messageInput.value = '';
});

var append = function append(message, task) {
  var messageElement = document.createElement('div'); // Set the class based on the task

  if (task === 'right') {
    messageElement.className = 'message sent';
  } else {
    messageElement.className = 'message received';
  } // Set the text content of the message


  messageElement.innerText = message; // Append the message to the container

  messageContainer.append(messageElement); // Auto-scroll to the bottom

  messageContainer.scrollTop = messageContainer.scrollHeight;
};

var name = prompt('Enter name to join');
socket.emit('new-user-joined', name);
socket.on('user-joined', function (name) {
  append("".concat(name, " joined the chat"), 'left');
});
socket.on('receive', function (data) {
  append("".concat(data.name, ": ").concat(data.message), 'left');
});
socket.on('left', function (name) {
  append("".concat(name, " left the chat"), 'left');
});