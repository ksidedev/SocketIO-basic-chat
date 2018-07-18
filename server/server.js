const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Ksidedev',
    text: 'Sent from backend',
    createdAt: moment().format("YYYY-MM-DD")
  });

  socket.on('createMessage', (message) => {
    var date = new Date();
    console.log('createMessage', message);

    //To send to every browser or open socket
    socket.broadcast.emit('updatedMessage', {
      from: message.from,
      text: message.text,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
    });

    //To send back to sending broswer/socket
    socket.emit('updatedMessage', {
      from: message.from,
      text: message.text,
      createdAt: moment().format("HH:mm:a")
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
