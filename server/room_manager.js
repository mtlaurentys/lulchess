const EventEmitter = require("events");
const MatchManager = require("./match_manager");

class RoomManager extends EventEmitter {
    CreateRoom(roomSpecs) {
        // creates the room
        // informs game manager
        this.emit("room_created", roomSpecs);
    }
}

module.exports = RoomManager;
