
const { Router } = require('express');

const { getUsers, 
        postUsers,
        putUser,
        deleteUser
    } = require('../controllers/users')

const router = Router()

router.get('/', getUsers)

router.post('/', postUsers)

router.put('/:id', putUser)



router.delete('/:id', deleteUser)



module.exports = router;
