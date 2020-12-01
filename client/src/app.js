/*
 * This is the entry point of the react client application. The file contains
 *  the definition and implementation of application class.
 */

import React from "react";
import "./app.css";
import NavBar from "./components/navbar/navbar";
import RoomPanel from "./components/rooms_panel/room_panel";
import ActiveRoom from "./components/room/active_room";
import ServerHandler from "./server_handler";
const print = console.log;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.serverHandler = new ServerHandler();
        this.serverConnection = this.serverHandler.getConnection();
        this.state = {
            messageTypes: null,
            sessionID: null,
            inRoom: false,
            roomID: null,
            SetServerCallback: this.serverHandler.GetCallbackSetter(),
        };
        this.AssignID = this.AssignID.bind(this);
    }

    componentDidMount() {
        this.state.SetServerCallback("uID", this.AssignID);
        this.serverHandler.Connect();
    }

    AssignID(uID) {
        this.setState({ sessionID: uID });
    }

    RenderLoad() {
        return (
            <div className="App">
                <NavBar id="navBar"></NavBar>
                <h1>Loading...</h1>
            </div>
        );
    }

    render() {
        if (this.state.sessionID === null) return this.RenderLoad();
        return (
            <React.StrictMode>
                <div className="App">
                    <NavBar id="navBar"></NavBar>
                    <RoomPanel
                        id="roomPanel"
                        rID={this.state.roomID}
                        inRoom={this.state.inRoom}
                        serverHandler={this.serverHandler}
                        SetServerCallback={this.state.SetServerCallback}
                    ></RoomPanel>
                    <ActiveRoom
                        serverHandler={this.serverHandler}
                        SetServerCallback={this.state.SetServerCallback}
                        tellUpdate={(activeRoom, rID) => {
                            if (activeRoom !== this.state.inRoom)
                                this.setState({
                                    inRoom: activeRoom,
                                    roomID: rID,
                                });
                        }}
                    />
                </div>
            </React.StrictMode>
        );
    }
}

export default App;
