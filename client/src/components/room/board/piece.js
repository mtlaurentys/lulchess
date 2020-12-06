import React from "react";
import { useDrag, dragPreviewImage, DragPreviewImage } from "react-dnd";

const print = console.log;
const spritesPaths = require("../../../constants/constants").spritesPaths;

export default function Piece({ pieceName: pieceName, pieceID: pieceID }) {
    const [dragProperties, dragConnector, previewConnector] = useDrag({
        item: { type: "piece", id: pieceID + "-p" },
        collect: (monitor) => {
            return { isDragging: !!monitor.isDragging() };
        },
    });
    print(pieceName);
    print(pieceName);
    print(spritesPaths[pieceName]);
    return (
        <>
            <DragPreviewImage
                connect={previewConnector}
                src={spritesPaths[pieceName]}
            />
            <div ref={dragConnector}>
                <img
                    src={spritesPaths[pieceName]}
                    className="piece"
                    alt={pieceName}
                />
            </div>
        </>
    );
}
