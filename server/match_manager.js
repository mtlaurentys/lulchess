/*
 * This file defines and implements the MatchManager class.
 * The MatchManager is the initial point that client requests, with regard to
 *  active matches, are dealt with.
 */

const EventEmitter = require("events");

const appEmitterMTypes = require("./constants").appEmitterMTypes;
const matchEmitterMTypes = require("./constants").matchEmitterMTypes;

class MatchManager {
    constructor(appEmitter) {
        this.appEmitter = appEmitter;
        this.matches = {}; // player -> matchEm played
        this.players = {}; // matchEm -> list of players in match

        this.StartMatch = this.StartMatch.bind(this);

        this.appEmitter.on(appEmitterMTypes.startMatch);
    }

    StartMatch(match) {
        let players, mEm;
        [players, mEm] = match.Connect(getID());
        mEm.on(matchEmitterMTypes.tellDetails, (uID, listP, color) =>
            this.appEmitter.emit(
                appEmitterMTypes.tellDetails,
                uID,
                listP,
                color
            )
        );
        this.players[mEm] = players;
        players.forEach((p) => (this.matches[p] = mEm));
        match.Start();
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
