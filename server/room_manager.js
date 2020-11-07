const EventEmitter = require("events");
var ReadWriteLock = require("rwlock");
const { setTimeout } = require("timers");

const MatchManager = require("./match_manager");
const Room = require("./room");
const createErrors = require("./constants").createRoomErrors;

const ROUGH_MAX_ROOMS = 5;
const print = console.log;
class RoomManager {
    constructor(lobbyEmitter) {
        this.lobbyEmitter = lobbyEmitter;
        this.TryJoin = this.TryJoin.bind(this);
        this.rooms = [];
        this.roomsEmitters = []; // EventEmmiters from rooms
        this.availableRooms = [
            ...Array(Math.trunc(1.5 * ROUGH_MAX_ROOMS)).keys(),
        ];
        this.MakeRoomID = this.MakeRoomID.bind(this);
        this.lock = new ReadWriteLock();
        this.GetInfo = this.GetInfo.bind(this);
    }

    GetInfo() {
        let info = [];
        this.rooms.forEach((room) => {
            info.push(room.GetInfo());
        });
        return info;
    }

    MakeRoomID() {
        let id = this.availableRooms.pop();
        print(id);
        return id;
    }

    TryJoin(matchParams) {
        return false;
    }

    CreateRoom(roomSpecs, uID) {
        let rID;
        // Prevents the server from keeping many rooms over the estimate
        if (this.rooms.length >= ROUGH_MAX_ROOMS) {
            this.lobbyEmitter.emit("create_room_error", createErrors.overMax);
            return;
        }
        this.lock.writeLock((release) => {
            if (!this.availableRooms.length) {
                release();
                this.lobbyEmitter.emit(
                    "create_room_error",
                    createErrors.overMax
                );
                return;
            }
            rID = this.MakeRoomID();
            release();
        });
        let em = new EventEmitter();
        let nRoom = new Room(em, roomSpecs, uID, rID);
        this.roomsEmitters.push(em);
        this.rooms.push(nRoom);
    }
}

module.exports = RoomManager;
