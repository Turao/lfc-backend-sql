'use strict';

import express from 'express';
const router = express.Router();

import AuthController from '../api/controllers/auth';
import PartyController from '../api/controllers/party';

// parties
router.get('/parties/', PartyController.get);

// make sure user is authorized to use endpoint
router.use('/party/', AuthController.authorize);

// party
router.get('/party/:id', PartyController.getById);
router.post('/party/', PartyController.create);
router.put('/party/:id', PartyController.update);
router.delete('/party/:id', PartyController.destroy);

export default router;