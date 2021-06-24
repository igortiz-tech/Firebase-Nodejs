const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
class Server {

    constructor() {
        this.app = express();
        this.usersPath = '/api/users';
        this.pointsPath = '/api/user';

        this.init();
        
        this.middleware();

        this.routes();

        this.functions(); 
        
    };
    
    init() {
        admin.initializeApp(
            {
                credential: admin.credential.cert('./serveless.json'),
                databaseURL: "https://serveless-apirest-default-rtdb.firebaseio.com"
            }
        )
    };

    functions() {
        return functions.https.onRequest(this.app);
    };

    middleware() { 

        this.app.use( cors() );

        this.app.use( express.json() )
    
    };

    routes() {

        this.app.use( this.usersPath, require('../routes/users') );

        this.app.use( this.pointsPath, require('../routes/points') );

    };

};





module.exports = Server;