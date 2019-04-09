const express = require('express');
const router = express.Router();

const AuthController = require('../api/controllers/auth-controller');
const PartyController = require('../api/controllers/party-controller');

// parties
router.get('/parties/', PartyController.get);

// make sure user is authorized to use endpoint
router.use('/party/', AuthController.authorize);

// party
router.get('/party/:id', PartyController.getById);
router.post('/party/', PartyController.create);
router.put('/party/:id', PartyController.update);
router.delete('/party/:id', PartyController.destroy);

module.exports = router;