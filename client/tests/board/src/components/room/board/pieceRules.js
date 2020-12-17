import { piecesControlKeys } from "../../../constants/constants";
import whitePawnRule from "./rules/whitePawn";
import blackPawnRule from "./rules/blackPawn";
import knightRule from "./rules/knight";
import bishopRule from "./rules/bishop";
import rookRule from "./rules/rook";
import queenRule from "./rules/queen";
import kingRule from "./rules/king";

let rules = {
    methods: {
        isWhite: null,
        hasJustMoved: null,
        isInCheck: null,
        hasPiece: null,
        hasFriendlyPiece: null,
        hasOpponentPiece: null,
        isPinned: null,
    },
    pieceRules: {
        whitePawn: whitePawnRule,
        blackPawn: blackPawnRule,
        knight: knightRule,
        bishop: bishopRule,
        rook: rookRule,
        queen: queenRule,
        king: kingRule,
    },
    move(piece, orig, dest) {
        this.pieceRules[piece].canMove(orig, dest);
    },
    init(utilsDefinitions) {
        Object.keys(this.methods).forEach((defi) => {
            if (utilsDefinitions.hasOwnProperty(defi)) {
                this.methods[defi] = utilsDefinitions[defi];
            }
        });
        Object.keys(this.pieceRules).forEach(
            (rule) => (this.pieceRules[rule].methods = this.methods)
        );
        delete this.init;
        return this;
    },
};

export default rules.init({
    isWhite: (row, col) => console.log(row, col),
});
