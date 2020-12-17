/*
 * This file defines and implements the Match class.
 * The Match keeps track of a match game state, validates moves, regulates
 *  the clock and declares winners.
 */

const matchParamsList = require("./constants").createMatchFields;
const matchEmitterMTypes = require("./constants").matchEmitterMTypes;
const baseBoard = require("./constants").baseBoard;

const print = console.log;

class Match {
    constructor(matchEmitter, matchParams, players) {
        this.matchEmitter = matchEmitter;
        this.params = matchParams;
        this.id = null;
        this.players = players;
        this.white = this.players[0];
        this.black = this.players[1];
        this.board = null;
        this.Connect = this.Connect.bind(this);
        this.Start = this.Start.bind(this);
        this.InitializeBoard = this.InitializeBoard.bind(this);
        this.MakeMove = this.MakeMove.bind(this);

        this.matchEmitter.on(matchEmitterMTypes.makeMove, this.MakeMove);
    }

    // Connects the Match to the Match manager, by receiving and supplying
    //  required data
    Connect(id) {
        this.id = id;
        return [this.players, this.matchEmitter];
    }

    Start() {
        this.InitializeBoard();
        this.players.forEach((player) => {
            this.matchEmitter.emit(
                matchEmitterMTypes.tellDetails,
                player,
                this.players,
                player == this.white
            );
        });
        print(this.board);
    }

    MakeMove(player, orig, dest) {
        let otherPlayer = player === this.white ? this.black : this.white;
        print(this.board[orig[0]][orig[1]] !== "");
        // TODO: Check if move is from the correct player
        // TODO: Check if move is valid*/
        if (this.board[orig[0]][orig[1]] !== "") {
            this.board[dest[0]][dest[1]] = this.board[orig[0]][orig[1]];
            this.board[orig[0]][orig[1]] = "";
            this.matchEmitter.emit(
                matchEmitterMTypes.madeMove,
                otherPlayer,
                orig,
                dest
            );
        } else {
            print("ERROR IN MOVEMENT: PIECE NOT FOUND");
        }
    }

    InitializeBoard() {
        this.board = JSON.parse(JSON.stringify(baseBoard));
    }
}

module.exports = Match;
