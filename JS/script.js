const socket = io('http://localhost:8000');

const form = document.getElementById('chat-input');
const messageInput = document.getElementById('messageInput'); // Fixed camelCase
const messageContainer = document.querySelector(".chat-messages"); // Fixed camelCase

const rmessage = document.getElementById('message-received');
const smessage = document.getElementById('message-sent')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
})


const append = (message, task) => {
    const messageElement = document.createElement('div');

    // Set the class based on the task
    if (task === 'right') {
        messageElement.className = 'message sent';
    } else {
        messageElement.className = 'message received';
    }

    // Set the text content of the message
    messageElement.innerText = message;

    // Append the message to the container
    messageContainer.append(messageElement);

    // Auto-scroll to the bottom
    messageContainer.scrollTop = messageContainer.scrollHeight;
};






const name = prompt('Enter name to join');
socket.emit('new-user-joined', name);


socket.on('user-joined', name => { 
    append(`${name} joined the chat` , 'left');
})


socket.on('receive', data => { 
    append(`${data.name}: ${data.message}` , 'left');
})

socket.on('left', name => { 
    append(`${name} left the chat` , 'left');
})