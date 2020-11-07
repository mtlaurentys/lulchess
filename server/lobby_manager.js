/*
 *
 */

const EventEmitter = require("events");

const RoomManager = require("./room_manager");
const clientMessageTypes = require("./constants").clientMessageTypes;
const print = console.log;

class LobbyManager {
    constructor(eventHandler) {
        this.roomsEmitter = new EventEmitter();
        this.roomManager = new RoomManager(this.roomsEmitter);
        this.eventHandler = eventHandler;
        this.HandleClientMessage = this.HandleClientMessage.bind(this);
        this.eventHandler.on("client_message", (a, b, c) => {
            this.HandleClientMessage(a, b, c);
        });
        this.CreateMatch = this.CreateMatch.bind(this);
    }

    CreateMatch(uID, params) {
        let result = this.roomManager.TryJoin(params);
        if (result) {
            console.log("Joined existing match");
            return;
        }
        let room = this.roomManager.CreateRoom(params, uID);
    }

    SupplyActiveRooms(cID) {
        console.log("SUPPLIED!");
        this.eventHandler.emit("rooms_info", cID, this.roomManager.GetInfo());
    }

    HandleClientMessage(clientID, messType, params) {
        switch (messType) {
            case clientMessageTypes.createMatch:
                this.CreateMatch(clientID, params);
            case clientMessageTypes.joinMatch:
                break;
            case clientMessageTypes.endMatch:
                break;
            case clientMessageTypes.getActiveRooms:
                this.SupplyActiveRooms(clientID);
            default:
        }
    }
}

module.exports = LobbyManager;
