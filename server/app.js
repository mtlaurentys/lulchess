/*
 * Initial point of the server application
 */

const EventEmitter = require('events');
const http = require('http');
const server = http.createServer();
const MatchManager = require('./match_manager');

match_manager = new MatchManager;
server.listen(3001);