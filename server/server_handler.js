/*
 * This file is responsible for setting up the server and providing
 *  new connections with callback and handling methods
 */

const webSocketServer = require("websocket").server;
const http = require("http");

// Server Configuration
const servConsts = require("./constants");
const webSocketsServerPort = servConsts.webSocketsServerPort;
const clientMessageTypes = servConsts.clientMessageTypes;
const roomsMessageTypes = require("./constants").roomsMessageTypes;

//Helper
const print = console.log;

class LCServer {
    constructor(serverEmitter) {
        this.server = http.createServer();
        this.server.listen(webSocketsServerPort);
        this.wsServer = new webSocketServer({
            httpServer: this.server,
        });
        this.clients = {};
        this.serverEmitter = serverEmitter;

        this.HandleMessage = this.HandleMessage.bind(this);
        this.ReceiveNewConnection = this.ReceiveNewConnection.bind(this);
        this.SendMessage = this.SendMessage.bind(this);

        this.wsServer.on("request", this.ReceiveNewConnection);
        this.serverEmitter.on(serverEmitterMTypes.activeRooms, (cID, rooms) =>
            this.SendMessage("activeRooms", cID, rooms)
        );
        this.serverEmitter.on(serverEmitterMTypes.createdRoom, (cID, rID) =>
            this.SendMessage("createdRoom", cID, rID)
        );
        this.serverEmitter.on(serverEmitterMTypes.leftRoom, (cID) =>
            this.SendMessage("leftRoom", cID, "")
        );
        this.serverEmitter.on(
            serverEmitterMTypes.joinedStatus,
            (cID, status, rID) => {
                if (status) this.SendMessage("joined", cID, rID);
                else this.SendMessage("notJoin", cID, "");
            }
        );
    }

    SendMessage(messageType, cID, infoObject) {
        console.log(
            "SENT MESSAGE: " + messageType + " " + JSON.stringify(infoObject)
        );
        if (!this.clients[cID]) return;
        this.clients[cID].send(messageType + " " + JSON.stringify(infoObject));
    }

    ReceiveNewConnection(request) {
        let userID = getID();
        const connection = request.accept(null, request.origin);
        this.clients[userID] = connection;
        console.log("NEW CONNECTION: " + userID);
        connection.on("message", (event) => {
            this.HandleMessage(userID, event);
        });
        connection.on("close", (a, b) => this.CloseConnection(userID, a, b));
        connection.send(
            "clientMessageTypes " + JSON.stringify(clientMessageTypes)
        );
        connection.send("ID " + userID);
    }

    CloseConnection(id, code, reason) {
        print("LEAVING: " + id);
        this.serverEmitter.emit("user_disconnected", id);
        delete this.clients[id];
    }

    HandleMessage(cnID, event) {
        console.log("Message from: " + cnID);
        let params = JSON.parse(event.utf8Data);
        if (!params.hasOwnProperty("messageType")) {
            console.log("Unspecified Request. Ignoring...");
            return;
        }
        let mType = params.messageType;
        if (!clientMessageTypes.hasOwnProperty(mType)) {
            console.log("Bad Request. Ignoring...");
            return;
        }
        console.log("Good Request");
        switch (clientMessageTypes.mType) {
            case clientMessageTypes.getPieces:
                break;
            case clientMessageTypes.getInterpreter:
                break;
            default:
                this.serverEmitter.emit(
                    "client_message",
                    cnID,
                    clientMessageTypes[mType],
                    params
                );
        }
        console.log(params);
    }
}

module.exports = LCServer;

// TODO: Use OpenID
function getID() {
    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    return s4() + s4() + "-" + s4();
}
