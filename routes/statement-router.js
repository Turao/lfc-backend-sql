'use strict';

import express from 'express';
const router = express.Router();

import AuthController from '../api/controllers/auth';
import StatementController from '../api/controllers/statement';

// statements
router.get('/statements/', StatementController.get);

// make sure user is authorized to use endpoint
router.use('/statement/', AuthController.authorize);

// statement
router.get('/statement/:id', StatementController.getById);
router.post('/statement/', StatementController.create);
router.put('/statement/:id', StatementController.update);
router.delete('/statement/:id', StatementController.destroy);

export default router;