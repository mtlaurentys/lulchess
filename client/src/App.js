import React from "react";
import "./App.css";
import NavBar from "./components/navbar/Navbar";
import RoomPanel from "./components/rooms_panel/RoomPanel";
import ServerHandler from "./ServerHandler";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messageTypes: null };
    this.serverHandler = new ServerHandler(this.assignMessageTypes);
    this.serverConnection = this.serverHandler.getConnection();
  }

  assignMessageTypes = (types) => {
    this.setState({ messageTypes: types });
  };
  renderLoad() {
    return (
      <div className="App">
        <NavBar id="navBar"></NavBar>
        <h1>Loading...</h1>
      </div>
    );
  }
  render() {
    if (this.state.messageTypes === null) return this.renderLoad();
    return (
      <div className="App">
        <NavBar id="navBar"></NavBar>
        <RoomPanel id="roomPanel" serv={this.serverConnection}></RoomPanel>
      </div>
    );
  }
}

export default App;
