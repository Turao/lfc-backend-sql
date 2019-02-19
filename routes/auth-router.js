const express = require('express');
const router = express.Router();

const AuthController = require('../api/controllers/auth-controller');

// signup
router.post('/signup/', AuthController.signup);

// login
router.post('/login/', AuthController.login);

module.exports = router;