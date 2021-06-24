const Server = require('../functions/models/server');

const server = new Server(); 


exports.app = server.functions();






