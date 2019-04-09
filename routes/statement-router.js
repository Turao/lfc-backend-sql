const express = require('express');
const router = express.Router();

const AuthController = require('../api/controllers/auth-controller');
const StatementController = require('../api/controllers/statement-controller');

// statements
router.get('/statements/', StatementController.get);

// make sure user is authorized to use endpoint
router.use('/statement/', AuthController.authorize);

// statement
router.get('/statement/:id', StatementController.getById);
router.post('/statement/', StatementController.create);
router.put('/statement/:id', StatementController.update);
router.delete('/statement/:id', StatementController.destroy);

module.exports = router;