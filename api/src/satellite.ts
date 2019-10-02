import socketIO from 'socket.io';

class Satellite {
  velocity = null;
  location = null;
  constructor(socket: socketIO.Socket) {
    const velocity = { lat: 0, long: 1 };
    const location = { lat: 0, long: 0 };

    setInterval(() => {
      location.lat += velocity.lat;
      location.long += velocity.long;

      socket.emit('message', { id: 1, location });
    }, 1000);
  }
}

export default Satellite;
