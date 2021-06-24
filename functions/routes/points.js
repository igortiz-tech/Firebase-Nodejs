
const { Router } = require('express');

const { getPoints, 
        postPoints,
        putPoint,
        deletePoint
    } = require('../controllers/points');

const router = Router();

router.get('/', getPoints);

router.post('/', postPoints);

router.put('/:id', putPoint);

router.delete('/:id', deletePoint);



module.exports = router;
