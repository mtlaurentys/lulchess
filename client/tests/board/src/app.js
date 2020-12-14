/*
 * This is the entry point of the react client application. The file contains
 *  the definition and implementation of application class.
 */

import React from "react";
import "./app.css";
import ActiveRoom from "./components/room/active_room";

class App extends React.Component {
    render() {
        return (
            <React.StrictMode>
                <div className="App">
                    <ActiveRoom
                        serverHandler={null}
                        SetServerCallback={null}
                        tellUpdate={(activeRoom, rID) => {}}
                    />
                </div>
            </React.StrictMode>
        );
    }
}

export default App;
