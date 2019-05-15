'use strict';

import express from 'express';
const router = express.Router();

import AuthController from '../api/controllers/auth';

// signup
router.post('/signup/', AuthController.signup);

// login
router.post('/login/', AuthController.login);

export default router;