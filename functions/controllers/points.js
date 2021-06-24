const admin = require('firebase-admin');
const { dbFirebase } = require('../config/firebaseConnection');
const db = dbFirebase();
const FieldValue = admin.firestore.FieldValue;

const getPoints = async (req, res) => {

    try {

        let points = await db.collection('users').doc('points').collection('points').get()
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
        res.status(400).json({
            msg: 'sth gone wrong',
            error: error
        })
    }

}

const postPoints = async (req, res) => {

    try {

        const { quantity, reason } = req.body;

        await db.collection('users').doc('points').collection('points').add({
            quantity,
            reason,
            timestamp: FieldValue.timestamp()
        })

        res.status(200).json({
            msg: 'points created'
        })

    } catch (error) {
        res.status(400).json({
            error
        })
    }

};

const putPoint = async (req, res) => {
    try {


        const { id } = req.params;
        const { quantity, points } = req.body;

        await db.collection('users').doc('points').collection('points').doc(id).update({
            quantity,
            points,
            timestamp: FieldValue.serverTimestamp()
        })

        res.status(400).json({
            msg: 'Points '
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



};

module.exports = {
    getPoints,
    postPoints,
    putPoint,
    deletePoint
}