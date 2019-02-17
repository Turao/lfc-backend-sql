const express = require('express');
const router = express.Router();

const PartyController = require('../api/controllers/PartyController');
const UserController = require('../api/controllers/UserController');


// parties
router.get('/parties/', PartyController.getAll);

// party
router.get('/party/:id', PartyController.get);
router.post('/party/', PartyController.create);
router.put('/party/:id', PartyController.update);
router.delete('/party/:id', PartyController.destroy);



// users
router.get('/users/', UserController.getAll);

// user
router.get('/user/:id', UserController.get);
router.post('/user/', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

module.exports = router;
