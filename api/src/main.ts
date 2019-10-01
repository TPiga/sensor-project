import http from 'http';
import socketIO from 'socket.io';

var server = http.createServer();
server.listen(8080);
var io = socketIO(server, { path: '/websocket', pingTimeout: 60000 });
