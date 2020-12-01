/*
 * This file defines and implements the Match class.
 * The Match keeps track of a match game state, validates moves, regulates
 *  the clock and declares winners.
 */

const matchParamsList = require("./constants").createMatchFields;
const matchEmitterMTypes = require("./constants").matchEmitterMTypes;

const print = console.log;

class Match {
    constructor(matchEmitter, matchParams, players) {
        this.matchEmitter = matchEmitter;
        this.params = matchParams;
        this.id = null;
        this.players = players;
        this.white = this.players[0];
        this.black = this.players[1];
        this.Connect = this.Connect.bind(this);
        this.Start = this.Start.bind(this);
    }

    // Connects the Match to the Match manager, by receiving and supplying
    //  required data
    Connect(id) {
        this.id = id;
        return [this.players, this.matchEmitter];
    }

    Start() {
        this.players.forEach((player) => {
            this.matchEmitter.emit(
                matchEmitterMTypes.tellDetails,
                player,
                this.players,
                player == this.white
            );
        });
    }
}

module.exports = Match;
