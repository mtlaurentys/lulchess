import React from "react";

const print = console.log;

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRooms: [],
        };
        this.requestRoomUpdate = props.requestUpdate;
        this.SetServerCallback = props.SetServerCallback;
    }

    componentDidMount() {
        this.SetServerCallback("activeRooms", (nRoom) =>
            this.setState({ activeRooms: nRoom })
        );
        this.requestRoomUpdate();
    }

    componentDidUpdate(prevProps) {}

    render() {
        if (this.state.activeRooms.length) {
            return (
                <ul>
                    {this.state.activeRooms.map((room) => (
                        <li key={room.id}>{room.id}</li>
                    ))}
                </ul>
            );
        } else {
            return <div>There are no active rooms!</div>;
        }
    }
}

export default Lobby;
