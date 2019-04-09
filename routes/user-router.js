const express = require('express');
const router = express.Router();

const AuthController = require('../api/controllers/auth-controller');
const UserController = require('../api/controllers/user-controller');

// users
router.get('/users/', UserController.get);

// make sure user is authorized to use endpoint
router.use('/user/', AuthController.authorize);

// user
router.get('/user/:id', UserController.getById);
router.post('/user/', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

module.exports = router;