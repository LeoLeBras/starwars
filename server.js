var express = require('express'),
	app = express();

var port = process.env.PORT || 8080;
var io = require('socket.io').listen(app.listen(port));

app.use(express.static(__dirname + '/public/'));

io.on('connection', function() {
    console.log('hello');
});

console.log('Your server is running on http://localhost:' + port);
