import React from "react";
import * as enums from "../../../constants/match_enums";
import "./match_creation_menu.css";
import TeamSizeSelector from "./team_size_selector";
import TimeSelector from "./time_selector";
import PowerUpSelector from "./powerup_selector";

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
            inRoom: props.inRoom,
            boards: 1,
            winCondition: enums.winCondition.firstCheckmate,
            powerType: enums.powerType.board,
            fixedPowers: [],
        };

        this.create = props.CreateMatch;
        this.updateClock = this.UpdateClock.bind(this);
        this.updateTeamSize = this.UpdateTeamSize.bind(this);
        this.DrawCreateMatch = this.DrawCreateMatch.bind(this);
        this.UpdatePowerUps = this.UpdatePowerUps.bind(this);
    }

    shouldComponentUpdate(nextProp, nextState, nextContext) {
        if (nextProp.inRoom !== nextState.inRoom) {
            nextState.inRoom = nextProp.inRoom;
        }
        return true;
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

    DrawCreateMatch() {
        if (this.state.inRoom)
            return (
                <button onClick={() => this.create(this.state)} disabled>
                    Create Match
                </button>
            );
        else
            return (
                <button onClick={() => this.create(this.state)}>
                    Create Match
                </button>
            );
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
                {this.DrawCreateMatch()}
            </div>
        );
    }
}

export default MatchCreationMenu;
