
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers,
    postUsers,
    putUser,
    deleteUser
} = require('../controllers/users');
const { existsEmail, userIdValid } = require('../helpers/validation-db');

const { validationForm } = require('../middlewares/validation-form');


const router = Router();

router.get('/', getUsers)

router.post('/', [
    check('name', 'Enter your name').not().notEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password must be > 8 char').isLength({ min: 8 }),
    check('email').custom(existsEmail),
    validationForm
], postUsers)

router.put('/:id',
    [
        check('id').custom(userIdValid),
        validationForm
    ], putUser);

router.delete('/:id', [
    check('id').custom(userIdValid),
    validationForm
    ],deleteUser);



module.exports = router;
