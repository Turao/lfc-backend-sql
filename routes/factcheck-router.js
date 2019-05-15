'use strict';

import express from 'express';
const router = express.Router();

import AuthController from '../api/controllers/auth';
import FactCheckController from '../api/controllers/factcheck';

// factchecks
router.get('/factchecks/', FactCheckController.get);

// make sure user is authorized to use endpoint
router.use('/factcheck/', AuthController.authorize);

// factcheck
router.get('/factcheck/:id', FactCheckController.getById);
router.post('/factcheck/', FactCheckController.create);
router.put('/factcheck/:id', FactCheckController.update);
router.delete('/factcheck/:id', FactCheckController.destroy);

export default router;