/*
 *
 */

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
    });
}

serverEmitterMTypes = {
    createdRoom: 0,
    activeRooms: 1,
    leftRoom: 2,
    joinedStatus: 3,
};

const clientMessageTypes = {
    getPieces: 0,
    getInterpreter: 1,
    createMatch: 2,
    joinMatch: 3,
    endMatch: 4,
    getActiveRooms: 5,
    leaveRoom: 6,
    tryJoin: 7,
};

const createRoomErrors = {
    overMax: 0,
    roomFull: 1,
};

const roomsMessageTypes = {
    createdRoom: 0,
    madeMove: 1,
    leftRoom: 2,
    playerRemoved: 3,
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

define("clientMessageTypes", clientMessageTypes);
define("roomsMessageTypes", roomsMessageTypes);
define("createRoomErrors", createRoomErrors);
define("createMatchFields", createMatchFields);
define("serverEmitterMTypes", serverEmitterMTypes);
define("webSocketsServerPort", 8000);
