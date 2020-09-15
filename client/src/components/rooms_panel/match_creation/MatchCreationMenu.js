import React from "react";
import "./MatchCreationMenu.css";
import TeamSizeSelector from "./TeamSizeSelector";
import TimeSelector from "./TimeSelector";
import PowerUpSelector from "./PowerUpSelector";

class MatchCreationMenu extends React.Component {
  state = {};

  render() {
    return (
      <div id="MCreationMenu">
        <TeamSizeSelector />
        <TimeSelector />
        <PowerUpSelector />
      </div>
    );
  }
}

export default MatchCreationMenu;
