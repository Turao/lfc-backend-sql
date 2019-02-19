const express = require('express');
const router = express.Router();

const AuthController = require('../api/controllers/auth-controller');
const EventController = require('../api/controllers/event-controller');

// events
router.get('/events/', EventController.getAll);


// make sure user is authorized to use endpoint
router.use('/event/', AuthController.authorize);

// event
router.get('/event/:id', EventController.get);
router.post('/event/', EventController.create);
router.put('/event/:id', EventController.update);
router.delete('/event/:id', EventController.destroy);

module.exports = router;