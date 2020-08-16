/*
 * Initial point of the server application
 */

const EventEmitter = require('events');

const server = require('http');
const MatchManager = require('./match_manager');
match_manager = new MatchManager;
server.Listen(3000);
EventEmitter.on('create_match', () => {console.log("funcionou")});
EventEmitter.on('connect', () => {console.log("conectou")});