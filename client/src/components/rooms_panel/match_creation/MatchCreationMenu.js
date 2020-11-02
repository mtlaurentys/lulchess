import React from "react";
import * as enums from "../../../constants/MatchCreationEnums";
import "./MatchCreationMenu.css";
import TeamSizeSelector from "./TeamSizeSelector";
import TimeSelector from "./TimeSelector";
import PowerUpSelector from "./PowerUpSelector";

const createMatchType = 2;

class MatchCreationMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamSize: "1-1",
      timeSelection: "10-0-10-0",
      powerAmt: 3,
      boards: 1,
      boardPlay: enums.boardPlay.parallel,
      winCondition: enums.winCondition.firstCheckmate,
      powerType: enums.powerType.board,
      powerSelection: enums.powerSelection.random,
      fixedPowers: [],
    };

    this.create = props.createMatch;
    this.updateClock = this.updateClock.bind(this);
    this.updateTeamSize = this.updateTeamSize.bind(this);
    this.createMatch = this.createMatch.bind(this);
  }

  updateClock(newTimeFormat) {
    this.setState({ timeSelection: newTimeFormat });
  }

  updateTeamSize(newTeamSizes) {
    this.setState({ teamSize: newTeamSizes });
  }

  createMatch() {
    let params = JSON.stringify(this.state);
    this.create(params);
  }

  render() {
    let st = this.state;
    return (
      <div id="MCreationMenu">
        <TeamSizeSelector teams={st.teamSize} callback={this.updateTeamSize} />
        <TimeSelector clock={st.timeSelection} callback={this.updateClock} />
        <PowerUpSelector />
        <button onClick={this.createMatch}>Create Match</button>
      </div>
    );
  }
}

export default MatchCreationMenu;
