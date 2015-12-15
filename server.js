import express from 'express';

const app = express();
const port = process.env.PORT || 8080;
const io = require('socket.io').listen(app.listen(port));

let users;

app.use(express.static(__dirname + '/public/__build__/'));

io.on('connection', (socket) => {
	socket.on('handleRotation', (data) => {
		data.headers.from = 'server';
		console.log(data);
		socket.broadcast.emit('handleRotation', data);
	});

	socket.on('createUser', (data) => {
		users = [...users, data];
	});
});

console.log('Your server is running on http://localhost:' + port);

// http://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender-socket-io
