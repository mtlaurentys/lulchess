/*
 *
 */

const RoomManager = require("./room_manager");
const clientMessageTypes = require("./constants").clientMessageTypes;

class LobbyManager {
    constructor(eventHandler) {
        this.roomManager = new RoomManager();
        this.eventHandler = eventHandler;
        this.HandleClientMessage = this.HandleClientMessage.bind(this);
        this.eventHandler.on("client_message", (a, b, c) => {
            this.HandleClientMessage(a, b, c);
        });
    }
    HandleClientMessage(clientID, messType, params) {
        switch (messType) {
            case clientMessageTypes.createMatch:
                break;
            case clientMessageTypes.joinMatch:
                break;
            case clientMessageTypes.endMatch:
                break;
            default:
        }
    }
}

module.exports = LobbyManager;
