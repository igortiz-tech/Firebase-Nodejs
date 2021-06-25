
const admin = require('firebase-admin');

const dbFirebase = () => {


    return admin.firestore();


};


module.exports = {
    dbFirebase
};


