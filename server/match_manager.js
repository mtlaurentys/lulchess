/*
 * This file defines and implements the MatchManager class.
 * The MatchManager is the initial point that client requests, with regard to
 *  active matches, are dealt with.
 */

const EventEmitter = require("events");

class MatchManager extends EventEmitter {
    create_match(board_specs) {
        //creates the board for all players
        this.emit("create_board", { b_specs: board_specs });
        console.log("called match manager");
    }
}

module.exports = MatchManager;
