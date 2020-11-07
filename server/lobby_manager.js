/*
 *
 */

const EventEmitter = require("events");

const RoomManager = require("./room_manager");
const clientMessageTypes = require("./constants").clientMessageTypes;

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
            console.log("Joined exiting match");
            return;
        }
        console.log("Chegou");
        let room = this.roomManager.CreateRoom(params, uID);
    }

    HandleClientMessage(clientID, messType, params) {
        console.log("Chegou 2 " + messType);
        switch (messType) {
            case clientMessageTypes.createMatch:
                console.log("Chegou 3");
                this.CreateMatch(clientID, params);
            case clientMessageTypes.joinMatch:
                break;
            case clientMessageTypes.endMatch:
                break;
            default:
        }
    }
}

module.exports = LobbyManager;
