
const md5 = require('md5');
const { dbFirebase } = require('../config/firebaseConnection');
const db = dbFirebase();


const getUsers = async (req, res) => {

    try {

        const users = db.collection('users')
        const snapshot = await users.get()
        const docs = snapshot.docs;

        let response = docs.map(doc =>
        ({
            id: doc.id,
            name: doc.data().name,
            emai: doc.data().email
        })
        );

        res.status(200).json(
            { response }
        );

    } catch {

        res.status(500).json({
            msg: 'sth gone wrong'
        });

    }
}


const postUsers = async (req, res) => {

    const { password, ...user } = req.body;



    if (password) {
        user.password = md5(password)
    }

    try {

        await db.collection('users').add(user);
        res.status(201).json({
            msg: 'User created succesfully'
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Sth wrong with server'
        })
    }

}



const putUser = async (req, res) => {

    try {

        const newInfo = {}

        const data = req.body;
        const { id } = req.params;

        const userData = db.collection('users').doc(id);
        const doc = await userData.get();
        const userInfo = doc.data();

        for (let user in userInfo) {
            
            if (user === 'password' && data[user]) {
                newInfo[user] = md5(data['password']);

            } else if (data[user]) {
                newInfo[user] = data[user]
            } else {
                newInfo[user] = userInfo[user]
            }
        };

        await db.collection('users').doc(id).update(newInfo);

        res.status(200).json({
            msg: 'User updated'
        })


    } catch (error) {
        res.status(500).json({
            msg: 'Sth gone wrong'
        })
    }

};


const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const doc = db.collection('users').doc(id);
        await doc.delete()

        return res.status(200).json(
            { msg: 'User Deleted succesfully' }
        )

    } catch (error) {

    }

}


module.exports = {
    getUsers,
    postUsers,
    putUser,
    deleteUser
}