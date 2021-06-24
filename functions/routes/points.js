
const { Router } = require('express');
const { check } = require('express-validator');

const { getPoints,
    postPoints,
    putPoint,
    deletePoint
} = require('../controllers/points');
const { userIdValid, pointsIdValid } = require('../helpers/validation-db');
const { validationForm } = require('../middlewares/validation-form');

const router = Router();

router.get('/:id/points/', getPoints);

router.post('/:id/points/',
    [check('quantity', 'Points are int').isNumeric().not().isString(),
    check('reason', 'You have to write a reason').not().isEmpty().isLength({ min: 4 }),
    check('id').custom(userIdValid),
        validationForm]
    , postPoints);

router.put('/:id/points/', [
    check('id').custom(userIdValid),
    validationForm
    ], putPoint);

router.delete('/:idUser/points/:idPoints/',[
    check('idUser').custom(userIdValid),
    pointsIdValid,
    validationForm,
    ], deletePoint);



module.exports = router;
