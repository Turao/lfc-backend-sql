'use strict';

import express from 'express';
const router = express.Router();

import AuthController from '../api/controllers/auth';
import EventController from '../api/controllers/event';

// events
router.get('/events/', EventController.get);

// make sure user is authorized to use endpoint
router.use('/event/', AuthController.authorize);

// event
router.get('/event/:id', EventController.getById);
router.post('/event/', EventController.create);
router.put('/event/:id', EventController.update);
router.delete('/event/:id', EventController.destroy);

export default router;