/*
 * This file defines and implements the LobbyManager class.
 * The LobbyManager is the initial point that client requests, with respect to
 *  rooms, are dealt with.
 */

const EventEmitter = require("events");
const RoomManager = require("./room_manager");

const lobbyEmitterMTypes = require("./constants").lobbyEmitterMTypes;
const appEmitterMTypes = require("./constants").appEmitterMTypes;
const print = console.log;

class LobbyManager {
    constructor(appEmitter) {
        this.lobbyEmitter = new EventEmitter();
        this.roomManager = new RoomManager(this.lobbyEmitter);
        this.appEmitter = appEmitter;
        // Functions binding
        this.CreateMatch = this.CreateMatch.bind(this);
        // Standard messages
        this.lobbyEmitter.on(lobbyEmitterMTypes.playerRemoved, (uID) => {
            this.appEmitter.emit(appEmitterMTypes.leftRoom, uID);
        });
        this.lobbyEmitter.on(lobbyEmitterMTypes.createdRoom, (uID, rID) => {
            this.appEmitter.emit(appEmitterMTypes.createdRoom, uID, rID);
        });
        this.lobbyEmitter.on(lobbyEmitterMTypes.startMatch, (match) => {
            this.appEmitter.emit(appEmitterMTypes.startMatch, match);
        });
        this.appEmitter.on(appEmitterMTypes.createMatch, this.CreateMatch);
        this.appEmitter.on(appEmitterMTypes.getActiveRooms, (uID) => {
            this.appEmitter.emit(
                appEmitterMTypes.activeRooms,
                uID,
                this.roomManager.GetInfo()
            );
        });
        this.appEmitter.on(
            appEmitterMTypes.leaveRoom,
            this.roomManager.RemoveUser
        );
        this.appEmitter.on(appEmitterMTypes.tryJoin, (uID, params) => {
            this.appEmitter.emit(
                appEmitterMTypes.joinedStatus,
                uID,
                this.roomManager.TryJoin(uID, params.rID),
                params.rID
            );
        });
        this.appEmitter.on(
            appEmitterMTypes.userDisconnected,
            this.roomManager.RemoveUser
        );
    }

    CreateMatch(uID, params) {
        print("Entrou para criar");
        print(uID);
        let result = this.roomManager.TryJoin(uID, null, params);
        if (result) {
            console.log("Joined existing match");
            return;
        }
        let room = this.roomManager.CreateRoom(params, uID);
    }
}

module.exports = LobbyManager;
