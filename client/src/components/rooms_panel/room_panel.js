import React, { Fragment } from "react";
import MatchCreationMenu from "./match_creation/match_creation_menu";
import Lobby from "./view_lobby/lobby";
import "./room_panel.css";
const util = require("util");
const print = console.log;

class RoomPanel extends React.Component {
    constructor(props) {
        super(props);
        this.SetServerCallback = props.SetServerCallback;
        this.serverHandler = props.serverHandler;
        this.state = {
            clicked: 0,
            inRoom: props.inRoom,
        };
        this.CreateMatch = this.CreateMatch.bind(this);
        this.GetActiveRooms = this.GetActiveRooms.bind(this);
        this.TryJoin = this.TryJoin.bind(this);
    }

    shouldComponentUpdate(nextProp, nextState, nextContext) {
        if (nextProp.inRoom !== nextState.inRoom) {
            nextState.inRoom = nextProp.inRoom;
        }
        return true;
    }

    CreateMatch(matchParams) {
        this.serverHandler.Send("createMatch", matchParams);
    }

    GetActiveRooms() {
        this.serverHandler.Send("getActiveRooms");
    }

    TryJoin(rID) {
        this.serverHandler.Send("tryJoin", { rID: rID });
    }

    drawTaskSelector() {
        return (
            <Fragment>
                <button
                    id="createMatch"
                    className={"sel" + (1 - this.state.clicked)}
                    onClick={() => {
                        this.setState({ clicked: 0 });
                    }}
                >
                    Create Match
                </button>
                <button
                    id="viewLobby"
                    className={"sel" + this.state.clicked}
                    onClick={() => {
                        this.setState({ clicked: 1 });
                    }}
                >
                    View Lobby
                </button>
            </Fragment>
        );
    }

    drawMenu() {
        switch (this.state.clicked) {
            case 0:
                return (
                    <MatchCreationMenu
                        inRoom={this.state.inRoom}
                        CreateMatch={this.CreateMatch}
                    />
                );
            case 1:
                return (
                    <Lobby
                        id="listOfRooms"
                        TryJoin={this.TryJoin}
                        SetServerCallback={this.SetServerCallback}
                        requestUpdate={this.GetActiveRooms}
                    />
                );
            default:
                return (
                    <span>Programming error, please report to developers</span>
                );
        }
    }

    render() {
        return (
            <div id="roomPanel">
                {this.drawTaskSelector()}
                {this.drawMenu()}
            </div>
        );
    }
}

export default RoomPanel;
