const EventEmitter = require("events");

class RoomManager extends EventEmitter {
  create_room(room_specs) {
    // creates the room
    // informs game manager
    this.emit("room_created", room_specs);
  }
}

module.exports = RoomManager;
