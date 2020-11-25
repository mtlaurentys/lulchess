/*
 * This file defines and implements the LobbyManager class.
 * The LobbyManager is the initial point that client requests, with respect to
 *  rooms, are dealt with.
 */

const EventEmitter = require("events");
const RoomManager = require("./room_manager");

const clientMessageTypes = require("./constants").clientMessageTypes;
const roomsMessageTypes = require("./constants").roomsMessageTypes;
const appEmitterMTypes = require("./constants").appEmitterMTypes;
const print = console.log;

class LobbyManager {
    constructor(appEmitter) {
        this.lobbyEmitter = new EventEmitter();
        this.roomManager = new RoomManager(this.lobbyEmitter);
        this.appEmitter = appEmitter;
        // Functions binding
        this.HandleClientMessage = this.HandleClientMessage.bind(this);
        this.HandleRoomMessage = this.HandleRoomMessage.bind(this);
        this.CreateMatch = this.CreateMatch.bind(this);
        // Standard messages
        this.lobbyEmitter.on("rooms_message", this.HandleRoomMessage);
        this.lobbyEmitter.on(roomsMessageTypes.playerRemoved, (uID) => {
            this.appEmitter.emit(appEmitterMTypes.leftRoom, uID);
        });
        this.appEmitter.on(appEmitterMTypes.createdRoom, () => {
            print("funcionou!!!");
        });
        this.appEmitter.on("client_message", this.HandleClientMessage);
        this.appEmitter.on("user_disconnected", this.roomManager.RemoveUser);
    }

    CreateMatch(uID, params) {
        let result = this.roomManager.TryJoin(uID, null, params);
        if (result) {
            console.log("Joined existing match");
            return;
        }
        let room = this.roomManager.CreateRoom(params, uID);
    }

    HandleRoomMessage(messType, info) {
        switch (messType) {
            case roomsMessageTypes.createdRoom:
                this.appEmitter.emit(
                    appEmitterMTypes.createdRoom,
                    info.uid,
                    info.rid
                );
                break;
            case roomsMessageTypes.playerRemoved:
                this.appEmitter.emit(appEmitterMTypes.createdRoom, info.uid);
                break;
            default:
                print("Unknown rooms message type. Ignoring...");
        }
    }

    HandleClientMessage(uID, messType, params) {
        switch (messType) {
            case clientMessageTypes.createMatch:
                this.CreateMatch(uID, params);
                break;
            case clientMessageTypes.getActiveRooms:
                this.appEmitter.emit(
                    appEmitterMTypes.activeRooms,
                    uID,
                    this.roomManager.GetInfo()
                );
                break;
            case clientMessageTypes.leaveRoom:
                this.roomManager.RemoveUser(uID);
                break;
            case clientMessageTypes.tryJoin:
                this.appEmitter.emit(
                    appEmitterMTypes.joinedStatus,
                    uID,
                    this.roomManager.TryJoin(uID, params.rID),
                    params.rID
                );
                break;
            default:
                print("Erro");
        }
    }
}

module.exports = LobbyManager;
