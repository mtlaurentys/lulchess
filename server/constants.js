/*
 *
 */

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
    });
}

const clientMessageTypes = {
    getPieces: 0,
    getInterpreter: 1,
    createMatch: 2,
    joinMatch: 3,
    endMatch: 4,
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
define("createMatchFields", createMatchFields);
define("webSocketsServerPort", 8000);
