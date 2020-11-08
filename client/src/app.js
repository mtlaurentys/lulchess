/*
 * This is the entry point of the react client application. The file contains
 *  the definition and implementation of application class.
 */

import React from "react";
import "./app.css";
import NavBar from "./components/navbar/navbar";
import RoomPanel from "./components/rooms_panel/room_panel";
import ServerHandler from "./server_handler";
const print = console.log;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageTypes: null,
            sessionID: null,
            SetServerCallback: null,
        };
        this.AssignMessageTypes = this.AssignMessageTypes.bind(this);
    }

    componentDidMount() {
        this.serverHandler = new ServerHandler(this.AssignMessageTypes);
        this.serverConnection = this.serverHandler.getConnection();
        this.setState({
            SetServerCallback: this.serverHandler.GetCallbackSetter(),
        });
    }

    AssignMessageTypes(types) {
        print("called");
        this.setState({ messageTypes: types });
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
        print("App Render: " + this.SetServerCallback);
        if (this.state.messageTypes === null) return this.RenderLoad();
        return (
            <div className="App">
                <NavBar id="navBar"></NavBar>
                <RoomPanel
                    id="roomPanel"
                    serverHandler={this.serverHandler}
                    SetServerCallback={this.state.SetServerCallback}
                ></RoomPanel>
            </div>
        );
    }
}

export default App;
