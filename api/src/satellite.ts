import socketIO from 'socket.io';

const MAX_LATITUDE = 90;
const MAX_LONGITUDE = 180;
const SPEED_MULTIPLIER = 1 / 10000;

class Satellite {
  velocity = null;
  location = null;

  move = () => {
    this.location.lat += this.velocity.lat;
    this.location.long += this.velocity.long;
  };

  constructor(socket: socketIO.Socket) {
    this.velocity = {
      lat: Math.random() * MAX_LATITUDE * SPEED_MULTIPLIER,
      long: Math.random() * MAX_LATITUDE * SPEED_MULTIPLIER,
    };
    this.location = { lat: Math.random() * MAX_LATITUDE, long: Math.random() * MAX_LONGITUDE };

    setInterval(() => {
      this.move();
      socket.emit('message', { id: 1, location: this.location });
    }, 200);
  }
}

export default Satellite;
