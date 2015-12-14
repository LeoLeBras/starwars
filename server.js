import express from 'express';

const app = express();
const port = process.env.PORT || 8080;
const io = require('socket.io').listen(app.listen(port));

app.use(express.static(__dirname + '/public/__build__/'));

app.listen(3000, () => {
  console.log('Server running at localhost:3000/');
});
