const express = require('express');
const router = express.Router();

const AuthController = require('../api/controllers/auth-controller');
const FactCheckController = require('../api/controllers/factcheck-controller');

// factchecks
router.get('/factchecks/', FactCheckController.getAll);

// make sure user is authorized to use endpoint
router.use('/factcheck/', AuthController.authorize);

// factcheck
router.get('/factcheck/:id', FactCheckController.get);
router.post('/factcheck/', FactCheckController.create);
router.put('/factcheck/:id', FactCheckController.update);
router.delete('/factcheck/:id', FactCheckController.destroy);

module.exports = router;