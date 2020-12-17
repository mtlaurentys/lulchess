import React from "react";
import Cell from "./cell";
import Piece from "./piece";
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
        this.OpponentMovePiece = this.OpponentMovePiece.bind(this);
        this.OwnMovePiece = this.OwnMovePiece.bind(this);
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
        this.SetServerCallback = props.SetServerCallback;
    }

    componentDidMount() {
        this.SetServerCallback("madeMove", this.OpponentMovePiece);
    }

    OpponentMovePiece(params) {
        let pID = this.state.cellPiece[[params.origin]];
        if (pID == null) {
            print("Board state is incorrect");
            // TODO: Why would it happen? Should it fix the state?
        }
        this.MovePiece(pID, params.destine);
    }

    OwnMovePiece(pieceID, dest) {
        let orig = this.state.piecePositions[pieceID];
        this.MovePiece(pieceID, dest);
        this.props.BroadcastMove(orig, dest);
    }

    MovePiece(pieceID, dest) {
        let orig = this.state.piecePositions[pieceID];
        let newCellPiece = { ...this.state.cellPiece };
        newCellPiece[orig] = null;
        newCellPiece[dest] = pieceID;
        let newPiecePositions = { ...this.state.piecePositions };
        newPiecePositions[pieceID] = dest;
        // TODO: check if move is valid
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
                Move={this.OwnMovePiece}
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
