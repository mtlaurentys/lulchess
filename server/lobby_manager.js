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
        this.lobbyEmitter = new EventEmitter();
        this.roomManager = new RoomManager(this.lobbyEmitter);
        this.serverEmitter = serverEmitter;
        // Functions binding
        this.HandleClientMessage = this.HandleClientMessage.bind(this);
        this.HandleRoomMessage = this.HandleRoomMessage.bind(this);
        this.RemoveUser = this.RemoveUser.bind(this);
        this.CreateMatch = this.CreateMatch.bind(this);
        this.LeaveRoom = this.LeaveRoom.bind(this);
        // Standard messages
        this.serverEmitter.on("client_message", (a, b, c) => {
            this.HandleClientMessage(a, b, c);
        });
        this.lobbyEmitter.on("rooms_message", this.HandleRoomMessage);
        this.lobbyEmitter.on(roomsMessageTypes.playerRemoved, (uID) => {
            this.serverEmitter.emit(serverEmitterMTypes.leftRoom, uID);
        });
        this.serverEmitter.on("user_disconnected", this.RemoveUser);
    }

    RemoveUser(uID) {
        this.roomManager.RemoveUser(uID);
    }

    CreateMatch(uID, params) {
        let result = this.roomManager.TryJoin(uID, null, params);
        if (result) {
            console.log("Joined existing match");
            return;
        }
        let room = this.roomManager.CreateRoom(params, uID);
    }

    LeaveRoom(uID) {
        console.log("aqui");
        this.roomManager.RemoveUser(uID);
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
        switch (messType) {
            case roomsMessageTypes.createdRoom:
                this.serverEmitter.emit(
                    serverEmitterMTypes.createdRoom,
                    info.uid,
                    info.rid
                );
                break;
            case roomsMessageTypes.playerRemoved:
                this.serverEmitter.emit(
                    serverEmitterMTypes.createdRoom,
                    info.uid
                );
                break;
            default:
                print("Unknown rooms message type. Ignoring...");
        }
    }

    HandleClientMessage(uID, messType, params) {
        switch (messType) {
            case clientMessageTypes.createMatch:
                this.CreateMatch(uID, params);
            case clientMessageTypes.joinMatch:
                break;
            case clientMessageTypes.endMatch:
                break;
            case clientMessageTypes.getActiveRooms:
                this.SupplyActiveRooms(uID);
                break;
            case clientMessageTypes.leaveRoom:
                this.LeaveRoom(uID);
                break;
            case clientMessageTypes.tryJoin:
                this.serverEmitter.emit(
                    serverEmitterMTypes.joinedStatus,
                    uID,
                    this.roomManager.TryJoin(uID, params.rID),
                    params.rID
                );
                break;
            default:
        }
    }
}

module.exports = LobbyManager;
