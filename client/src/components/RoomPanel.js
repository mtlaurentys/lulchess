import React from "react";
import MatchCreationMenu from "./MatchCreationMenu";
import "./RoomPanel.css";

class RoomPanel extends React.Component {
  state = {
    clicked: 0,
  };
  render() {
    return (
      <div id="roomPanel">
        <button
          id="createMatch"
          className={"sel" + (1 - this.state.clicked)}
          onClick={() => {
            this.setState({ clicked: 0 });
          }}
        >
          Create Match
        </button>
        <button
          id="viewLobby"
          className={"sel" + this.state.clicked}
          onClick={() => {
            this.setState({ clicked: 1 });
          }}
        >
          View Lobby
        </button>
        <MatchCreationMenu />
      </div>
    );
  }
}

export default RoomPanel;
