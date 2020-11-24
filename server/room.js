/*
 * This file defines and implements the Room class.
 * The Room is where the match takes place. It contains the information of the
 *  players and the match params, but does not deal with board state and moves.
 */

const { EventEmitter } = require("events");

var RWLock = require("rwlock");
const createErrors = require("./constants").createRoomErrors;
const Match = require("./match");
const print = console.log;

class Room {
    constructor(managerEmitter, matchParams, player1, rID) {
        this.managerEmitter = managerEmitter;
        this.matchEmitter = null;
        this.match = null;

        let ts = matchParams.teamSize;
        this.numPlayers = Number(ts[0]) + Number(ts[2]);
        this.mParams = matchParams;
        this.players = [player1];
        this.lock = new RWLock();
        this.active = false;
        this.id = rID;

        this.AddPlayer = this.AddPlayer.bind(this);
        this.StartMatch = this.StartMatch.bind(this);
        this.GetInfo = this.GetInfo.bind(this);

        this.managerEmitter.on("start_match", this.StartMatch);
    }

    GetInfo() {
        return {
            maxPlayers: this.numPlayers,
            currentPlayers: this.players.length,
            players: this.players,
            id: this.id,
            active: this.active,
        };
    }

    AddPlayer(player) {
        let added = false;
        this.lock.writeLock((release) => {
            if (this.players.length < this.numPlayers) {
                this.players.push(player);
                added = true;
                release();
            } else {
                release();
                this.managerEmitter.emit(
                    "create_room_error",
                    createErrors.roomFull
                );
            }
        });
        if (added && this.players.length == this.numPlayers)
            this.managerEmitter.emit("start_match");
        return added;
    }

    RemovePlayer(player) {
        this.lock.writeLock((release) => {
            let i = 0;
            while (i < this.players.length) {
                if (this.players[i] == player) {
                    this.players.splice(i, 1);
                    break;
                }
                i += 1;
            }
            release();
        });
    }

    StartMatch() {
        this.active = true;
        this.matchEmitter = new EventEmitter();
        this.match = new Match(this.matchEmitter, this.mParams);
    }
}

module.exports = Room;
