import React from "react";

const print = console.log;
class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.activeRooms = props.rooms;
        this.requestRoomUpdate = props.requestUpdate;
    }

    componentDidMount() {
        print("chegou");
        this.requestRoomUpdate();
    }

    componentDidUpdate(prevProps) {}

    render() {
        if (this.activeRooms.length) {
            return (
                <ul>
                    {this.activeRooms.map((room) => (
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
