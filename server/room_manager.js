const EventEmitter = require("events");
var ReadWriteLock = require("rwlock");
const { setTimeout } = require("timers");

const MatchManager = require("./match_manager");
const createErrors = require("./constants").createRoomErrors;

const ROUGH_MAX_ROOMS = 10;

class RoomManager {
    constructor(lobbyEmitter) {
        this.lobbyEmitter = lobbyEmitter;
        this.TryJoin = this.TryJoin.bind(this);
        this.rooms = [];
        this.availableRooms = [
            ...Array(Math.trunc(1.5 * ROUGH_MAX_ROOMS)).keys(),
        ];
        this.MakeRoomID = this.MakeRoomID.bind(this);
        this.lock = new ReadWriteLock();
    }

    MakeRoomID() {
        return this.availableRooms.pop();
    }

    TryJoin(matchParams) {
        return false;
    }

    CreateRoom(roomSpecs, uID) {
        console.log("chegou room man");
        this.lock.writeLock((release) => {
            // Prevents the server from keeping many rooms over the estimate
            if (this.rooms.length >= ROUGH_MAX_ROOMS) {
                release();
                this.lobbyEmitter.emit(
                    "create_room_error",
                    createErrors.overMax
                );
                return;
            }
            let id = this.MakeRoomID();
            release();
            console.log("ID = " + id);
        });
    }
}

module.exports = RoomManager;
