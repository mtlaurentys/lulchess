import React from "react";
import "./active_room.css";

const print = console.log;
const util = require("util");

class ActiveRoom extends React.Component {
    constructor(props) {
        super(props);
        this.SetServerCallback = props.SetServerCallback;
        print(props.room);
        this.state = {
            finding: false,
            id: null,
        };
        this.RenderRoom = this.RenderRoom.bind(this);
        this.tellUpdate = props.tellUpdate;
    }

    componentDidMount() {
        this.SetServerCallback("createdRoom", (rID) => {
            this.setState({ finding: true, id: rID });
        });
        this.tellUpdate(true);
    }

    RenderRoom() {
        if (this.state.finding) {
            return <div className="findingBox">{this.state.id}</div>;
        } else {
            return <p>DE BOA</p>;
        }
    }

    render() {
        return <div className="ActiveRoom">{this.RenderRoom()}</div>;
    }
}

export default ActiveRoom;
