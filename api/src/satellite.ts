import socketIO from 'socket.io';

class Satellite {
  velocity = null;
  location = null;

  move = () => {
    this.location.lat += this.velocity.lat;
    this.location.long += this.velocity.long;
  };

  constructor(socket: socketIO.Socket) {
    this.velocity = { lat: 0, long: 0.01 };
    this.location = { lat: 0, long: 90 };

    setInterval(() => {
      this.move();
      socket.emit('message', { id: 1, location: this.location });
    }, 200);
  }
}

export default Satellite;
