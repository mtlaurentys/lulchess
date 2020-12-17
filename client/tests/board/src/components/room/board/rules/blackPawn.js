let blackPawnRule = {
    canMove(orig, dest) {
        if (utils.hasFriendlyPiece(dest)) return false;
    },
};

export default blackPawnRule;
