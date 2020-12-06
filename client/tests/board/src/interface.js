/*
 * This is the entry point of the react client application. The file contains
 *  the definition and implementation of application class.
 */

import React from "react";
import "./app.css";
import NavBar from "./components/navbar/navbar";
import RoomPanel from "./components/rooms_panel/room_panel";
import ServerHandler from "./server_handler";
const util = require("util");
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messageTypes: null, sessionID: null, activeRooms: [] };
    }

    componentDidMount() {
        this.AssignMessageTypes = this.AssignMessageTypes.bind(this);
        this.UpdateActiveRooms = this.UpdateActiveRooms.bind(this);
        this.serverHandler = new ServerHandler(
            this.AssignMessageTypes,
            this.UpdateActiveRooms
        );
        this.serverConnection = this.serverHandler.getConnection();
    }

    AssignMessageTypes(types) {
        this.setState({ messageTypes: types });
    }

    UpdateActiveRooms(updatedRooms) {
        this.setState({ activeRooms: updatedRooms });
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
        console.log(
            "APP::: " +
                util.inspect(this.state.activeRooms, {
                    showHidden: false,
                    depth: null,
                })
        );
        if (this.state.messageTypes === null) return this.RenderLoad();
        return (
            <div className="App">
                <NavBar id="navBar"></NavBar>
                <RoomPanel
                    key={this.state.activeRooms}
                    id="roomPanel"
                    serverHandler={this.serverHandler}
                    activeRooms={this.state.activeRooms}
                ></RoomPanel>
            </div>
        );
    }
}

export default App;
