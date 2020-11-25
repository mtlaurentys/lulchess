/*
 * This file defines the constants used in the server application.
 * There is a map of constants for each eventEmitter type. The name of each
 *  map of constant is based on the eventEmitter name.
 */

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
    });
}

// Map of handled client messages.
const clientMTypes = {
    getPieces: 0,
    createMatch: 1,
    getActiveRooms: 2,
    leaveRoom: 3,
    tryJoin: 4,
};

const appEmitterMTypes = {
    getPieces: 0,
    createMatch: 1,
    getActiveRooms: 2,
    leaveRoom: 3,
    tryJoin: 4,
    createdRoom: 5,
    leftRoom: 6,
    joinedStatus: 7,
    activeRooms: 8,
    userDisconnected: 9,
};

const lobbyEmitterMTypes = {
    createdRoom: 0,
    madeMove: 1,
    leftRoom: 2,
    playerRemoved: 3,
};

const createRoomErrors = {
    overMax: 0,
    roomFull: 1,
};

const createMatchFields = [
    "teamSize",
    "timeSelection",
    "powerAmt",
    "boards",
    "boardPlay",
    "winCondition",
    "powerType",
    "powerSelection",
    "fixedPowers",
];

define("clientMTypes", clientMTypes);
define("lobbyEmitterMTypes", lobbyEmitterMTypes);
define("createRoomErrors", createRoomErrors);
define("createMatchFields", createMatchFields);
define("appEmitterMTypes", appEmitterMTypes);
define("webSocketsServerPort", 8000);
