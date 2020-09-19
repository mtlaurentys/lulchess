/*
 * This file is responsible for setting up the server and providing
 *  new connections with callback and handling methods
 */

const consts = require("./constants");
const webSocketServer = require("websocket").server;
const http = require("http");

function getID() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
}

function handleMessage(cnID, event) {
  console.log(cnID);
  let params = JSON.parse(event.utf8Data);
  console.log(params);
  let test = params.teamSize;
  console.log(test);
}

class LCServer {
  constructor() {
    this.server = http.createServer();
    this.server.listen(consts.webSocketsServerPort);
    this.wsServer = new webSocketServer({
      httpServer: this.server,
    });
    this.clients = {};
    this.wsServer.on("request", this.receiveNewConnection);
    console.log("CONSTRUIU");
  }

  receiveNewConnection = (request) => {
    console.log("RECEBEU REQUEST");
    var userID = getID();
    console.log(
      new Date() +
        " Recieved a new connection from origin " +
        request.origin +
        "."
    );
    const connection = request.accept(null, request.origin);
    this.clients[userID] = connection;
    console.log("NEW CONNECTION");
    connection.on("message", function incoming(event) {
      handleMessage(userID, event);
    });
    connection.send(new Int8Array([1, 2, 3, 4]));
  };
}

module.exports = LCServer;
