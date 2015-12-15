// http://socket.io/docs/#using-with-express-3/4

var express = require('express'),
	app = express();

var port = process.env.PORT || 8080;
var io = require('socket.io').listen(app.listen(port));

app.use(express.static(__dirname + '/public/__build__/'));

io.on('connection', function(socket) {
	socket.on('question', function(data){
		socket.emit('answer', {
			status: 'ok',
			data
		});
	});
});

console.log('Your server is running on http://localhost:' + port);
