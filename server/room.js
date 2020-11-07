var RWLock = require("rwlock");
const createErrors = require("./constants").createRoomErrors;

class Room {
    constructor(eventEmitter, matchParams, player1, rID) {
        this.eventEmitter = eventEmitter;
        let ts = matchParams.teamSize;
        this.numPlayers = Number(ts[0]) + Number(ts[1]);
        this.players = [player1];
        this.lock = new RWLock();
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
            id: this.id,
        };
    }

    AddPlayer(player) {
        this.lock.writeLock((release) => {
            if (this.players.length < this.numPlayers) {
                this.players.push(player);
                release();
            } else {
                release();
                this.eventEmitter.emit(
                    "create_room_error",
                    createErrors.roomFull
                );
            }
        });
        if (this.players.length == this.numPlayers) {
            this.eventEmitter.emit("room_full");
            this.StartMatch();
        }
    }

    StartMatch() {
        console.log("Starting Match");
    }
}

module.exports = Room;
