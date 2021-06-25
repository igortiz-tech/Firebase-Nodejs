
const { dbFirebase } = require('../config/firebaseConnection');
const db = dbFirebase();
const admin = require('firebase-admin');


const getPoints = async (req, res) => {

    try {

        const { id } = req.params;

        let points = await db.collection('users').doc(id).collection('points').get()
        const snapshot = points.docs

        const response = snapshot.map((sub) =>
        ({
            id: sub.id,
            quantity: sub.data().quantity,
            reason: sub.data().reason
        })
        );



        res.status(200).json(
            response
        )
    } catch (error) {
        res.status(500).json({
            msg: 'sth gone wrong'
        })
    }

};

const postPoints = async (req, res) => {

    try {

        const { id } = req.params;
        const { quantity, reason } = req.body;

        await db.collection('users').doc(id).collection('points').add({
            quantity,
            reason
        })

        res.status(200).json({
            msg: `Points added to perfil, Total: ${quantity}`
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Sth gone wrong'
        })
    }

};

const putPoint = async (req, res) => {

    try {


        const { id } = req.params;
        const { quantity, reason } = req.body;

        await db.collection('users').doc(id).collection('points').doc(id).set({
            quantity: admin.firestore.FieldValue.increment(quantity),
            reason
        }, { merge: true });

        res.status(400).json({
            msg: 'Points added to your profile '
        })

    } catch (error) {
        res.status(400).json(
            {
                error,
                msg: 'Sth gone wrong'
            }
        )
    }

};


const deletePoint = async (req, res) => {

    try {

        const {idUser, idPoints} = req.params; 

        await db.collection('users').doc(idUser).collection('points').doc(idPoints).delete();

        
        res.status(200).json({
            msg: 'Points deleted'
        });




    } catch (error) {
        res.status(500).json({
            msg: 'Sth gone wrong'
        })
    }

};


module.exports = {
    getPoints,
    postPoints,
    putPoint,
    deletePoint
};