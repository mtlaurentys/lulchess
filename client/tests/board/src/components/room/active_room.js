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
        this.state = {
            finding: false,
            id: "dasda",
            inGame: true,
            playersIds: null,
            color: null,
        };
        this.RenderRoom = this.RenderRoom.bind(this);
        this.tellUpdate = props.tellUpdate;
    }

    componentDidMount() {}

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
