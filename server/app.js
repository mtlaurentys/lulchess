/*
 * Initial point of the server application
 */

const EventEmitter = require("events");

const LCServer = require("./server_setup");
const LobbyManager = require("./lobby_manager");

class Apllication {
    constructor() {
        this.eventHandler = new EventEmitter(); // Used to server-lobby comm
        this.server = new LCServer(this.eventHandler);
        this.lobby = new LobbyManager(this.eventHandler);
    }
}

let App = new Apllication();
