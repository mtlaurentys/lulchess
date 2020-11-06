/*
 * Initial point of the server application
 */

const LCServer = require("./server_setup");

class Apllication {
    constructor() {
        this.server = new LCServer();
    }
}

let App = new Apllication();
