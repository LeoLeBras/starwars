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
			users = users.slice(index, 1); // Remove user
			io.emit('connectDevice', {
				client: data.key,
				data: {
					key: data.key
				}
			});
		}
	});

    // Handle rotation of the device
	socket.on('handle', (data) => {
        socket.broadcast.emit('handle', data);
	});

	// Find a planet
	socket.on('findPlanet', (data) => {
        socket.broadcast.emit('findPlanet', data);
	});

	// Explore a planet
	socket.on('explore', (data) => {
		console.log(data);
        socket.broadcast.emit('explore', data);
	});

});

console.log('Your server is running on http://localhost:' + port);
