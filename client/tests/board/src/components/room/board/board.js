import React from "react";
import Cell from "./cell";
import Piece from "./piece";
import "./board.css";

const print = console.log;

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board,
            pieceObjects: {},
        };
        this.DrawCell = this.DrawCell.bind(this);
        for (let row = 0; row < this.state.board.length; row++) {
            for (let col = 0; col < this.state.board[0].length; col++) {
                const element = this.state.board[row][col];
                if (this.state.board[row][col] !== "")
                    this.state.pieceObjects[[row, col]] = (
                        <Piece
                            pieceName={this.state.board[row][col]}
                            pieceID={[row, col]}
                        />
                    );
                else this.state.pieceObjects[[row, col]] = <></>;
            }
        }
    }

    DrawCell(cellPiece, row, col) {
        let k = row + "-" + col;
        return (
            <Cell
                key={k}
                cellID={k}
                row={row}
                col={col}
                piece={this.state.pieceObjects[[row, col]]}
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
