import React from "react";
import "./active_room.css";

import Match from "./match";

const print = console.log;
const util = require("util");

class ActiveRoom extends React.Component {
    constructor(props) {
        super(props);
        this.SetServerCallback = props.SetServerCallback;
        this.serverHandler = props.serverHandler;
        print(props.room);
        this.state = {
            finding: false,
            id: null,
            inGame: false,
            playersIds: null,
            color: null,
        };
        this.RenderRoom = this.RenderRoom.bind(this);
        this.tellUpdate = props.tellUpdate;
    }

    componentDidMount() {
        this.SetServerCallback("createdRoom", (rID) => {
            // Handles server sending matchStarted before joined
            if (this.state.inGame) this.setState({ id: rID });
            else this.setState({ finding: true, id: rID });
            this.tellUpdate(true, rID);
        });
        this.SetServerCallback("leftRoom", () => {
            this.setState({
                finding: false,
                id: null,
                inGame: false,
            });
            this.tellUpdate(false, null);
        });
        this.SetServerCallback("joined", (message) => {
            let rID = JSON.parse(message);
            // Handles server sending matchStarted before joined
            if (this.state.inGame) this.setState({ id: rID });
            else this.setState({ finding: true, id: rID });
            this.tellUpdate(true, rID);
        });
        this.SetServerCallback("matchStarted", (players, color) =>
            this.setState({
                finding: false,
                inGame: true,
                playerIds: players,
                color: color,
            })
        );
    }

    RenderRoom() {
        return (
            <div className="findingBox">
                <div id="leaveRoomBox">
                    <button
                        id="leaveRoomButton"
                        onClick={() => this.serverHandler.Send("leaveRoom")}
                    >
                        <span id="leaveRoomText">&times;</span>
                    </button>
                </div>
                {this.state.id}
            </div>
        );
    }

    render() {
        if (this.state.finding)
            return <div className="ActiveRoom">{this.RenderRoom()}</div>;
        else if (this.state.inGame && this.state.id !== null)
            return (
                <div className="ActiveRoom">
                    <Match
                        BroadcastMove={(orig, dest) =>
                            this.serverHandler.Send("makeMove", {
                                origin: orig,
                                destine: dest,
                            })
                        }
                        SetServerCallback={this.SetServerCallback}
                        ids={this.state.playersIds}
                        color={this.state.color}
                    />
                </div>
            );
        else if (this.state.inGame) return <div>Found Match... Loading!</div>;
        else return null;
    }
}

export default ActiveRoom;
