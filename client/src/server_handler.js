import { w3cwebsocket as W3CWebSocket } from "websocket";

class ServerHandler {
    constructor(messageTypeCallback) {
        this.serverConnection = new W3CWebSocket("ws://127.0.0.1:8000");
        this.serverConnection.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        this.serverConnection.onmessage = this.handleServerMessages;
        this.messageTypeCallback = messageTypeCallback;
        this.callbacks = {};
        this.Send = this.Send.bind(this);
        this.SetCallback = this.SetCallback.bind(this);
    }

    SetCallback(key, cbFunc) {
        this.callbacks[key] = cbFunc;
    }

    Send(messType, paramsObj) {
        if (!paramsObj) {
            paramsObj = { messageType: messType };
        }
        paramsObj.messageType = messType;
        console.log("SENT:\n" + JSON.stringify(paramsObj));
        this.serverConnection.send(JSON.stringify(paramsObj));
    }

    handleServerMessages = (message) => {
        let mes = message.data;
        let divider = mes.indexOf(" ");
        let firstWord = mes.substring(0, divider);
        switch (firstWord) {
            case "clientMessageTypes":
                this.messageTypeCallback(
                    JSON.parse(mes.substring(divider, mes.lenght))
                );
                break;
            case "ID":
                console.log("ID: " + mes.substring(divider, mes.lenght));
                break;
            default:
                this.callbacks[firstWord](
                    JSON.parse(mes.substring(divider, mes.lenght))
                );
                break;
        }
    };

    getConnection = () => {
        return this.serverConnection;
    };

    getMessageTypes = () => {
        return this.clientMessageTypes;
    };
}

export default ServerHandler;
