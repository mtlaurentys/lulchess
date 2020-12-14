import React from "react";

import "./match.css";

import Board from "./board/board";
const baseBoard = require("../../constants/constants").baseBoard;

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
        return <Board board={this.state.boardState} />;
    }
}

export default Match;
