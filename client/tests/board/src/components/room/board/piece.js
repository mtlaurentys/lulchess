import React from "react";
import { useDrag, dragPreviewImage, DragPreviewImage } from "react-dnd";

import "./piece.css";

const print = console.log;
const itemTypes = require("../../../constants/constants").itemTypes;
const spritesPaths = require("../../../constants/constants").spritesPaths;

const Piece = (props) => {
    const [{ isDragging }, dragConnector, previewConnector] = useDrag({
        item: { type: itemTypes.piece, id: props.pieceID },
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging(),
                previewOptions: { backgroundColor: "purple" },
            };
        },
    });
    return (
        <>
            <DragPreviewImage
                connect={previewConnector}
                src={spritesPaths[props.pieceName]}
            />
            <img
                ref={dragConnector}
                style={{ opacity: isDragging ? 0 : 1 }}
                className="piece"
                src={spritesPaths[props.pieceName]}
                alt={props.pieceName}
            />
        </>
    );
};

export default Piece;
