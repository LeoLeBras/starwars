var socket = io();
socket.emit('question', {
    key: '???'
});

socket.on('answer', (data) => {
    console.log(data);
});
