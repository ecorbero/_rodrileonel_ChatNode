
const { Router } = require('express');
const { createGroup, getGroup } = require('../controllers/gourpController');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

// create Group
router.post('/',createGroup); //validateJWT, 

// get group
router.get('/:groupname',getGroup); // validateJWT, 

module.exports = router;