const express = require('express');
const router = express.Router();

const StatementController = require('../api/controllers/statement-controller');

// factchecks
router.get('/statements/', StatementController.getAll);

// factcheck
router.get('/statement/:id', StatementController.get);
router.post('/statement/', StatementController.create);
router.put('/statement/:id', StatementController.update);
router.delete('/statement/:id', StatementController.destroy);

module.exports = router;