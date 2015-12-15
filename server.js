import express from 'express';

const app = express();
const port = process.env.PORT || 8080;
const io = require('socket.io').listen(app.listen(port));

let users = [];

app.use(express.static(__dirname + '/public/__build__/'));

io.on('connection', (socket) => {

	// Create a user
	socket.on('createUser', (data) => users = [...users, data.key]);

	// Connect the smartphone and the desktop
	socket.on('findConnection', (data) => {
		let index = users.indexOf(parseInt(data.key));
		if(index !== -1) {
			users.slice(index, 1); // Remove user
			console.log(users);
			io.emit('connectDevice', {
				headers: {
					from: 'server',
					client: data.key
				},
				data: {
					key: data.key
				}
			});
		}
	});

	// Handle rotation of the device
	socket.on('handleRotation', (data) => {
		data.headers.from = 'server';
		socket.broadcast.emit('handleRotation', data);
	});

});

console.log('Your server is running on http://localhost:' + port);

// http://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender-socket-io
