import { w3cwebsocket as W3CWebSocket } from "websocket";

const print = console.log;
const util = require("util");

class ServerHandler {
    constructor() {
        this.serverConnection = new W3CWebSocket("ws://127.0.0.1:8000");
        this.serverConnection.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        this.callbacks = {};
        this.Send = this.Send.bind(this);
        this.SetCallback = this.SetCallback.bind(this);
        this.GetCallbackSetter = this.GetCallbackSetter.bind(this);
        this.HandleServerMessages = this.HandleServerMessages.bind(this);
    }

    Connect() {
        this.serverConnection.onmessage = this.HandleServerMessages;
    }

    GetCallbackSetter() {
        return this.SetCallback;
    }

    SetCallback(key, cbFunc) {
        print(cbFunc);
        this.callbacks[key] = cbFunc;
    }

    Send(messType, paramsObj) {
        if (!paramsObj) {
            paramsObj = { messageType: messType };
        } else {
            paramsObj.messageType = messType;
        }
        console.log("SENT:\n" + JSON.stringify(paramsObj));
        this.serverConnection.send(JSON.stringify(paramsObj));
    }

    HandleServerMessages(message) {
        let mes = message.data;
        let divider = mes.indexOf(" ");
        let firstWord = mes.substring(0, divider);
        print("RECEIVED:\n" + message);
        switch (firstWord) {
            case "ID":
                console.log("ID: " + mes.substring(divider, mes.lenght));
                break;
            default:
                print(this.callbacks[firstWord]);
                this.callbacks[firstWord](
                    JSON.parse(mes.substring(divider, mes.lenght))
                );
                break;
        }
    }

    getConnection = () => {
        return this.serverConnection;
    };

    getMessageTypes = () => {
        return this.clientMessageTypes;
    };
}

export default ServerHandler;
