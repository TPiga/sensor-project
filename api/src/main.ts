import http from 'http';
import Koa from 'koa';
import socketIO from 'socket.io';
import Satellite from './satellite';
import { postgresDB } from 'database';

// Constants
const NUMBER_OF_SATELLITES = 4;

// Server
const app = new Koa();
var server = http.createServer(app.callback());

const bootstrap = async () => {
  // Database
  await postgresDB();

  // Sockets
  var io = socketIO(server, { path: '/websocket', pingTimeout: 60000 });

  // Device namespace
  const deviceNamespace = io.of('/devices');
  deviceNamespace.on('connection', socket => {
    for (var i = 0; i < NUMBER_OF_SATELLITES; i++) new Satellite(socket, i);
  });

  server.listen(8080);
};

bootstrap();
