import http from 'http';
import socketIO from 'socket.io';
import Satellite from './satellite';

var server = http.createServer();
server.listen(8080);
var io = socketIO(server, { path: '/websocket', pingTimeout: 60000 });

// Device namespace
const deviceNamespace = io.of('/devices');
deviceNamespace.on('connection', socket => {
  new Satellite(socket);
});
