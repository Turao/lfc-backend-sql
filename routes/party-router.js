const express = require('express');
const router = express.Router();

const PartyController = require('../api/controllers/party-controller');

// parties
router.get('/parties/', PartyController.getAll);

// party
router.get('/party/:id', PartyController.get);
router.post('/party/', PartyController.create);
router.put('/party/:id', PartyController.update);
router.delete('/party/:id', PartyController.destroy);

module.exports = router;