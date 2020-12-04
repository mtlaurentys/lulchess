import React from "react";

import "./cell.css";

const print = console.log;
const spritesPaths = require("../../../constants/constants").spritesPaths;

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            piece: props.piece,
        };
        this.color = (props.row + props.col) % 2 === 0 ? "black" : "white";
        this.leftOffset = props.col * 12.5;
        this.topOffset = props.row * 12.5;
        this.RenderPiece = this.RenderPiece.bind(this);
    }

    RenderPiece() {
        if (this.state.piece === "") return <></>;
        print(spritesPaths[this.state.piece]);
        return (
            <img
                className="piece"
                src={spritesPaths[this.state.piece]}
                alt={this.state.piece}
            />
        );
    }

    render() {
        let pieceElement = this.RenderPiece();
        return (
            <div
                className="chessSquare"
                style={{
                    backgroundColor: this.color,
                    display: "block",
                    left: this.leftOffset + "%",
                    top: this.topOffset + "%",
                }}
            >
                {pieceElement}
            </div>
        );
    }
}

export default Cell;
