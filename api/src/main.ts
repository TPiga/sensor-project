import http from 'http';
import socketIO from 'socket.io';
import Satellite from './satellite';

const NUMBER_OF_SATELLITES = 4;

var server = http.createServer();
server.listen(8080);
var io = socketIO(server, { path: '/websocket', pingTimeout: 60000 });

// Device namespace
const deviceNamespace = io.of('/devices');
deviceNamespace.on('connection', socket => {
  for (var i = 0; i < NUMBER_OF_SATELLITES; i++) new Satellite(socket, i);
});
