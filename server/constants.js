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
    createMatch: 1,
    getActiveRooms: 2,
    leaveRoom: 3,
    tryJoin: 4,
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
