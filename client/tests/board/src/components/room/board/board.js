import React from "react";

import { piecesControlKeys } from "../../../constants/constants";
import Cell from "./cell";
import Piece from "./piece";
import pieceRules from "./pieceRules";

import "./board.css";

const print = console.log;

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numRows: props.board.length,
            numCols: props.board[0].length,
            board: props.board,
            pieceObjects: {}, // pieceID => piece
            cellPiece: {}, // position => pieceID || null
            piecePositions: {}, //pieceID => position
        };
        this.DrawCell = this.DrawCell.bind(this);
        this.MovePiece = this.MovePiece.bind(this);
        for (let row = 0; row < props.board.length; row++) {
            for (let col = 0; col < props.board[0].length; col++) {
                const element = props.board[row][col];
                if (props.board[row][col] !== "") {
                    this.state.pieceObjects[[row, col]] = (
                        <Piece
                            key={[row, col]}
                            pieceName={props.board[row][col]}
                            pieceID={[row, col]}
                        />
                    );
                    this.state.cellPiece[[row, col]] = [row, col];
                    this.state.piecePositions[[row, col]] = [row, col];
                } else {
                    this.state.pieceObjects[[row, col]] = <></>;
                    this.state.cellPiece[[row, col]] = null;
                    this.state.piecePositions[[row, col]] = [row, col];
                }
            }
        }
        print(pieceRules);
    }

    MovePiece(pieceID, dest) {
        let orig = this.state.piecePositions[pieceID];
        let newCellPiece = { ...this.state.cellPiece };
        newCellPiece[orig] = null;
        newCellPiece[dest] = pieceID;
        let newPiecePositions = { ...this.state.piecePositions };
        newPiecePositions[pieceID] = dest;
        //checkmove
        this.setState({
            cellPiece: newCellPiece,
            piecePositions: newPiecePositions,
        });
    }

    DrawCell(pieceID, row, col) {
        let k = row + "-" + col;
        return (
            <Cell
                key={k}
                cellID={k}
                row={row}
                col={col}
                Move={this.MovePiece}
                piece={this.state.pieceObjects[pieceID]}
            />
        );
    }

    render() {
        return (
            <div id={this.props.ID}>
                {Object.entries(this.state.cellPiece).map(([pos, pieceID]) => {
                    return this.DrawCell(
                        pieceID,
                        Number(pos[0]),
                        Number(pos[2])
                    );
                })}
            </div>
        );
    }
}

export default Board;
