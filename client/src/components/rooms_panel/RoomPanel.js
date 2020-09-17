import React, { Fragment } from "react";
import MatchCreationMenu from "./match_creation/MatchCreationMenu";
import "./RoomPanel.css";

class RoomPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0,
    };
    this.createMatch = this.createMatch.bind(this);
    this.server = props.serv;
  }

  drawTaskSelector() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }

  drawMenu() {
    if (this.state.clicked === 0)
      return <MatchCreationMenu createMatch={this.createMatch} />;
  }

  createMatch(matchParams) {
    console.log("SENT DATA");
    let params = JSON.parse(JSON.stringify(matchParams));
    console.log(params);
    this.server.send(params);
  }

  render() {
    return (
      <div id="roomPanel">
        {this.drawTaskSelector()}
        {this.drawMenu()}
      </div>
    );
  }
}

export default RoomPanel;
