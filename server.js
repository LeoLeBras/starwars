import express from 'express';

const app = express();
const port = process.env.PORT || 8080;
const io = require('socket.io').listen(app.listen(port));

app.use(express.static(__dirname + '/public/__build__/'));

io.on('connection', (socket) => {
	socket.on('question', (data) => {
		socket.emit('answer', {
			status: 'ok',
			data
		});
	});
});

console.log('Your server is running on http://localhost:' + port);
