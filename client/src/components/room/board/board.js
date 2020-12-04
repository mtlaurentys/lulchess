import React from "react";
import Cell from "./cell";

import "./board.css";

const print = console.log;

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board,
        };
        this.DrawCell = this.DrawCell.bind(this);
    }

    DrawCell(cell, rowIndex, colIndex) {
        return (
            <Cell
                key={rowIndex + "-" + colIndex}
                row={rowIndex}
                col={colIndex}
                piece={cell}
            />
        );
    }

    render() {
        return (
            <div id="board">
                {this.state.board.map((row, rowIndex) => {
                    return row.map((cell, colIndex) => {
                        return this.DrawCell(cell, rowIndex, colIndex);
                    });
                })}
            </div>
        );
    }
}

export default Board;
