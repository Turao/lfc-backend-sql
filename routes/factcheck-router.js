const express = require('express');
const router = express.Router();

const AuthController = require('../api/controllers/auth-controller');
const FactCheckController = require('../api/controllers/factcheck-controller');

// factchecks
router.get('/factchecks/', FactCheckController.get);

// make sure user is authorized to use endpoint
router.use('/factcheck/', AuthController.authorize);

// factcheck
router.get('/factcheck/:id', FactCheckController.getById);
router.post('/factcheck/', FactCheckController.create);
router.put('/factcheck/:id', FactCheckController.update);
router.delete('/factcheck/:id', FactCheckController.destroy);

module.exports = router;