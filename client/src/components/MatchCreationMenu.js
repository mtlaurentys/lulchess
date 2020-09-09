import React from "react";
import "./MatchCreationMenu.css";

class MatchCreationMenu extends React.Component {
  state = {
    options: [0, 1],
    clicked: 0,
  };
  render() {
    return (
      <div id="MCreationMenu">
        <div id="numPlayerSelector">
          <label htmlFor="numPlayerSelector">#Player for team 1</label>
          <input className="numPlayerBox" defaultValue="1" maxLength="2" />
          X
          <input className="numPlayerBox" defaultValue="1" maxLength="2" />
        </div>
      </div>
    );
  }
}

export default MatchCreationMenu;
