const EventEmitter = require('events');

class MatchManager extends EventEmitter {
    create_match (board_specs) {
        //creates the board for all players
        this.emit("create_board", {b_specs: board_specs});
        console.log("called match manager");
    }
}

module.exports = MatchManager;