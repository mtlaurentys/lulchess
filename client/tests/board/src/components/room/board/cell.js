import React from "react";
import { useDrop } from "react-dnd";
import Piece from "./piece";
import "./cell.css";

const print = console.log;
const spritesPaths = require("../../../constants/constants").spritesPaths;

const Cell = (props) => {
    let color = (props.row + props.col) % 2 === 0 ? "black" : "white";
    let leftOffset = props.col * 12.5;
    let topOffset = props.row * 12.5;

    return (
        <div
            className="chessSquare"
            style={{
                backgroundColor: color,
                display: "block",
                left: leftOffset + "%",
                top: topOffset + "%",
            }}
        >
            {props.piece}
        </div>
    );
};

export default Cell;
