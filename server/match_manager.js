/*
 * This file defines and implements the MatchManager class.
 * The MatchManager is the initial point that client requests, with regard to
 *  active matches, are dealt with.
 */

const EventEmitter = require("events");

const appEmitterMTypes = require("./constants").appEmitterMTypes;
const matchEmitterMTypes = require("./constants").matchEmitterMTypes;
const print = console.log;

class MatchManager {
    constructor(appEmitter) {
        this.appEmitter = appEmitter;
        this.matches = {}; // player -> matchEm played
        this.players = {}; // matchEm -> list of players in match

        this.StartMatch = this.StartMatch.bind(this);
        this.MakeMove = this.MakeMove.bind(this);

        this.appEmitter.on(appEmitterMTypes.startMatch, this.StartMatch);
        this.appEmitter.on(appEmitterMTypes.makeMove, this.MakeMove);
    }

    StartMatch(match) {
        let players, mEm;
        [players, mEm] = match.Connect(getID());
        mEm.on(matchEmitterMTypes.tellDetails, (uID, listP, color) => {
            this.appEmitter.emit(
                appEmitterMTypes.tellDetails,
                uID,
                listP,
                color
            );
        });
        mEm.on(matchEmitterMTypes.madeMove, (uID, orig, dest) => {
            print("EMITIU PRO SERVER HANDLER");
            this.appEmitter.emit(appEmitterMTypes.madeMove, uID, {
                origin: orig,
                destine: dest,
            });
        });
        this.players[mEm] = players;
        players.forEach((p) => (this.matches[p] = mEm));
        match.Start();
    }

    MakeMove(uID, params) {
        print("params:" + params);
        if (params.origin && params.destine) {
            print("entrou");
            this.matches[uID].emit(
                matchEmitterMTypes.makeMove,
                uID,
                params["origin"],
                params["destine"]
            );
        } else print("Invalid movement signature. Client Bug.");
    }
}

function getID() {
    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    return s4() + s4() + "-" + s4();
}

module.exports = MatchManager;
