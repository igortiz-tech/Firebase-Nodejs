
const { firestore } = require('firebase-functions');
const { dbFirebase } = require('../config/firebaseConnection');
const db = dbFirebase();


const existsEmail = async (email = '') => {

    const queryDB = db.collection('users').where('email', '==', email);
    const exists = await queryDB.get();


    if (!exists.empty) {
        throw new Error(`The user already exists with the email: ${email}`);
    }

};

const userIdValid = async (id) =>  {

    const queryDB = await db.collection('users').doc(id).get();
    
    if (!queryDB.exists) {

        throw new Error(`User with ID: ${id} is not in db`);

    }

};


const pointsIdValid = async (req, res, next) =>  {
    
    const {idUser, idPoints} = req.params;

    const queryDB = await db.collection('users').doc(idUser).collection('points').doc(idPoints).get();
    
    if (!queryDB.exists) {

        res.status(400).json({msg: 'Points are not valid'})
    }
    next()
};

module.exports = {
    existsEmail,
    userIdValid,
    pointsIdValid
}