var RWLock = require("rwlock");
const createErrors = require("./constants").createRoomErrors;
const print = console.log;
class Room {
    constructor(eventEmitter, matchParams, player1, rID) {
        this.eventEmitter = eventEmitter;
        let ts = matchParams.teamSize;
        this.numPlayers = Number(ts[0]) + Number(ts[2]);
        this.players = [player1];
        this.lock = new RWLock();
        this.active = false;
        this.AddPlayer = this.AddPlayer.bind(this);
        this.StartMatch = this.StartMatch.bind(this);
        this.eventEmitter.on("player_joined", (player) => {
            this.AddPlayer(player);
        });
        this.id = rID;
        this.GetInfo = this.GetInfo.bind(this);
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
            print("len: " + this.players.length + "max" + this.numPlayers);
            if (this.players.length < this.numPlayers) {
                this.players.push(player);
                added = true;
                release();
            } else {
                release();
                this.eventEmitter.emit(
                    "create_room_error",
                    createErrors.roomFull
                );
            }
        });
        if (added)
            if (this.players.length == this.numPlayers) {
                this.eventEmitter.emit("room_full");
                this.StartMatch();
            }
        return added;
    }

    RemovePlayer(player) {
        this.lock.writeLock((release) => {
            let i = 0;
            while (i < this.players.length) {
                if (this.players[i] == player) {
                    this.players.splice(i, 1);
                }
                i += 1;
            }
        });
    }

    StartMatch() {
        console.log("Starting Match");
    }
}

module.exports = Room;
