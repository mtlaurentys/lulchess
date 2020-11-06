import { w3cwebsocket as W3CWebSocket } from "websocket";

class ServerHandler {
    constructor(mesTypeCallback) {
        this.serverConnection = new W3CWebSocket("ws://127.0.0.1:8000");
        this.serverConnection.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        this.serverConnection.onmessage = this.handleServerMessages;
        this.callback = mesTypeCallback;
        this.Send = this.Send.bind(this);
    }

    Send(messType, paramsObj) {
        paramsObj.messageType = messType;
        console.log("SENT:\n" + JSON.stringify(paramsObj));
        this.serverConnection.send(JSON.stringify(paramsObj));
    }

    handleServerMessages = (message) => {
        let mes = message.data;
        let divider = mes.indexOf(" ");
        let firstWord = mes.substring(0, divider);
        if (firstWord === "clientMessageTypes") {
            this.callback(JSON.parse(mes.substring(divider, mes.lenght)));
        } else if (firstWord === "ID") {
            console.log("ID: " + mes.substring(divider, mes.lenght));
        }
        console.log(this.clientMessageTypes);
    };

    getConnection = () => {
        return this.serverConnection;
    };

    getMessageTypes = () => {
        return this.clientMessageTypes;
    };
}

export default ServerHandler;
