/*
 * Initial point of the server application
 */

"use strict";

const EventEmitter = require("events");

const LCServer = require("./server_handler");
const LobbyManager = require("./lobby_manager");
const MatchManager = require("./match_manager");

class Apllication {
    constructor() {
        this.appEmitter = new EventEmitter();
        this.server = new LCServer(this.appEmitter);
        this.lobby = new LobbyManager(this.appEmitter);
        this.matchManager = new MatchManager(this.appEmitter);
    }
}

let App = new Apllication();
