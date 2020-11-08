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

//Helper
const print = console.log;

class LCServer {
    constructor(eventHandler) {
        this.server = http.createServer();
        this.server.listen(webSocketsServerPort);
        this.wsServer = new webSocketServer({
            httpServer: this.server,
        });
        this.clients = {};
        this.eventHandler = eventHandler;

        this.HandleMessage = this.HandleMessage.bind(this);
        this.ReceiveNewConnection = this.ReceiveNewConnection.bind(this);
        this.SendMessage = this.SendMessage.bind(this);

        this.wsServer.on("request", this.ReceiveNewConnection);
        this.eventHandler.on("rooms_info", (cID, rooms) =>
            this.SendMessage(cID, "activeRooms", rooms)
        );
    }

    SendMessage(cID, messageType, infoObject) {
        console.log("SENT MESSAGE: " + messageType);
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
        this.eventHandler.emit("user_disconnected", id);
        delete this.clients[id];
    }

    HandleMessage(cnID, event) {
        console.log(cnID);
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
                this.eventHandler.emit(
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
