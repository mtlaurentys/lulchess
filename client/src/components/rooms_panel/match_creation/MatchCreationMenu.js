import React from "react";
import * as enums from "../../../constants/MatchCreationEnums";
import "./MatchCreationMenu.css";
import TeamSizeSelector from "./TeamSizeSelector";
import TimeSelector from "./TimeSelector";
import PowerUpSelector from "./PowerUpSelector";

// const createMatchType = 2;

class MatchCreationMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamSize: "1-1",
            timeSelection: "10-0-10-0",
            powerUps: {
                powerAmt: 3,
                boardPlay: enums.boardPlay.parallel,
                powerSelection: enums.powerSelection.random,
            },
            boards: 1,
            winCondition: enums.winCondition.firstCheckmate,
            powerType: enums.powerType.board,
            fixedPowers: [],
        };

        this.create = props.CreateMatch;
        this.updateClock = this.UpdateClock.bind(this);
        this.updateTeamSize = this.UpdateTeamSize.bind(this);
        this.CreateMatch = this.CreateMatch.bind(this);
        this.UpdatePowerUps = this.UpdatePowerUps.bind(this);
    }

    UpdateClock(newTimeFormat) {
        this.setState({ timeSelection: newTimeFormat });
    }

    UpdateTeamSize(newTeamSizes) {
        this.setState({ teamSize: newTeamSizes });
    }

    UpdatePowerUps(powerUpChoices) {
        this.setState({
            powerUps: powerUpChoices,
        });
    }

    CreateMatch() {
        this.create(this.state);
    }

    render() {
        let st = this.state;
        return (
            <div id="MCreationMenu">
                <TeamSizeSelector
                    teams={st.teamSize}
                    callback={this.UpdateTeamSize}
                />
                <TimeSelector
                    clock={st.timeSelection}
                    callback={this.UpdateClock}
                />
                <PowerUpSelector
                    options={st.powerUps}
                    callback={this.UpdatePowerUps}
                />
                <button onClick={this.CreateMatch}>Create Match</button>
            </div>
        );
    }
}

export default MatchCreationMenu;
