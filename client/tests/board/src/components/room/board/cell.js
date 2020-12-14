import React from "react";
import { useDrop } from "react-dnd";
import Piece from "./piece";
import "./cell.css";

const print = console.log;
const itemTypes = require("../../../constants/constants").itemTypes;

const Cell = (props) => {
    let color = (props.row + props.col) % 2 === 0 ? "black" : "white";
    let leftOffset = props.col * 12.5;
    let topOffset = props.row * 12.5;

    const [{ isOver }, drop] = useDrop({
        accept: itemTypes.piece,
        drop: (item, monitor) => props.Move(item.id, [props.row, props.col]),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });
    return (
        <div
            ref={drop}
            className="chessSquare"
            style={{
                backgroundColor: color,
                opacity: isOver ? 0.5 : 1,
                display: "block",
                left: leftOffset + "%",
                top: topOffset + "%",
            }}
        ></div>
    );
};

export default Cell;
