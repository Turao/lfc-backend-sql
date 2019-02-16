const express = require('express');
const router = express.Router();

const UserController = require('../api/controllers/UserController');

// users
router.get('/users/', UserController.getAll);

// user
router.get('/user/:id', UserController.get);
router.post('/user/', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

module.exports = router;
