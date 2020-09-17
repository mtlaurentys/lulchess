import React from "react";
import "./App.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import NavBar from "./components/navbar/Navbar";
import RoomPanel from "./components/rooms_panel/RoomPanel";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.serverConnection = new W3CWebSocket("ws://127.0.0.1:8000");
    this.serverConnection.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    this.serverConnection.onmessage = (message) => {
      console.log(message.data);
    };
  }

  render() {
    return (
      <div className="App">
        <NavBar id="navBar"></NavBar>
        <RoomPanel id="roomPanel" serv={this.serverConnection}></RoomPanel>
      </div>
    );
  }
}

export default App;
