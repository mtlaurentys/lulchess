import React from "react";

import "./lobby.css";

const print = console.log;

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRooms: [],
            rID: props.rID,
        };
        this.requestRoomUpdate = props.requestUpdate;
        this.TryJoin = props.TryJoin;
        this.SetServerCallback = props.SetServerCallback;
    }

    componentDidMount() {
        this.SetServerCallback("activeRooms", (nRoom) =>
            this.setState({ activeRooms: nRoom })
        );
        this.requestRoomUpdate();
        this.SetServerCallback("notJoin", () => alert("could not join"));
    }

    renderRoomItem(rID) {
        if (rID !== this.state.rID)
            return <button onClick={() => this.TryJoin(rID)}>{rID}</button>;
        else
            return (
                <button className="ownMatch" disabled>
                    {rID}
                </button>
            );
    }

    render() {
        if (this.state.activeRooms.length) {
            return (
                <ul>
                    {this.state.activeRooms.map((room) => (
                        <li key={room.id}>{this.renderRoomItem(room.id)}</li>
                    ))}
                </ul>
            );
        } else {
            return <div>There are no active rooms!</div>;
        }
    }
}

export default Lobby;
