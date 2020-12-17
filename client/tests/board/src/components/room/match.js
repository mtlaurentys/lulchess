import React from "react";

import "./match.css";

import Board from "./board/board";
import Clock from "./clock/clock";
import { baseBoard } from "../../constants/constants";

class Match extends React.Component {
    constructor(props) {
        super(props);
        let brd = [];
        baseBoard.forEach((row) => {
            let r = [];
            row.forEach((piece) => r.push(piece));
            brd.push(r);
        });
        this.state = {
            boardState: brd,
        };
    }

    render() {
        return (
            <div id="match">
                <div id="boardContainer">
                    <Board ID="board" board={this.state.boardState} />
                </div>
                <div id="clocks">
                    <Clock ID="opponentClock" />
                    <Clock ID="ownClock" />
                </div>
            </div>
        );
    }
}

export default Match;
