import React from "react";

import "./match.css";

const baseBoard = require("../../../constants/constants").initialBoard;
const print = console.log;

class Match extends React.Component {
    constructor(props) {
        super(props);
        brd = [];
        baseBoard.forEach((row) => {
            let r = [];
            row.forEach((piece) => r.push(piece));
            brd.push(r);
        });
        this.state = {};
    }

    render() {
        return <div>GAME</div>;
    }
}

export default Match;
