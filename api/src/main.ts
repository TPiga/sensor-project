import http from 'http';
import socketIO from 'socket.io';

var server = http.createServer();
server.listen(8080);
var io = socketIO(server, { path: '/websocket', pingTimeout: 60000 });

// Device namespace
const deviceNamespace = io.of('/devices');
deviceNamespace.on('connection', socket => {
  setInterval(() => socket.emit('message', Math.random() * 100), 1000);
});
