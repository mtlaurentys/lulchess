/*
 *
 */

const EventEmitter = require("events");

const RoomManager = require("./room_manager");
const clientMessageTypes = require("./constants").clientMessageTypes;
const roomsMessageTypes = require("./constants").roomsMessageTypes;
const serverEmitterMTypes = require("./constants").serverEmitterMTypes;
const print = console.log;

class LobbyManager {
    constructor(serverEmitter) {
        this.roomsEmitter = new EventEmitter();
        this.roomManager = new RoomManager(this.roomsEmitter);
        this.serverEmitter = serverEmitter;
        this.HandleClientMessage = this.HandleClientMessage.bind(this);
        this.HandleRoomMessage = this.HandleRoomMessage.bind(this);
        this.RemoveUser = this.RemoveUser.bind(this);
        this.serverEmitter.on("client_message", (a, b, c) => {
            this.HandleClientMessage(a, b, c);
        });
        this.roomsEmitter.on("rooms_message", this.HandleRoomMessage);
        this.serverEmitter.on("user_disconnected", this.RemoveUser);
        this.CreateMatch = this.CreateMatch.bind(this);
    }

    RemoveUser(uID) {
        this.roomManager.RemoveUser(uID);
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
        this.serverEmitter.emit(
            serverEmitterMTypes.activeRooms,
            cID,
            this.roomManager.GetInfo()
        );
    }

    HandleRoomMessage(messType, info) {
        print("LOBBY MTYPE: " + messType);
        print("LOBBY MTYPE 2: " + roomsMessageTypes.createdRoom);
        switch (messType) {
            case roomsMessageTypes.createdRoom:
                this.serverEmitter.emit(
                    serverEmitterMTypes.createdRoom,
                    info.uid,
                    info.rid
                );
                break;
            default:
                print("Unknown rooms message type. Ignoring...");
        }
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
