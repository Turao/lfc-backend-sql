'use strict';

import express from 'express';
const router = express.Router();

import AuthController from '../api/controllers/auth';
import UserController from '../api/controllers/user';

// users
router.get('/users/', UserController.get);

// make sure user is authorized to use endpoint
router.use('/user/', AuthController.authorize);

// user
router.get('/user/:id', UserController.getById);
router.post('/user/', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

export default router;