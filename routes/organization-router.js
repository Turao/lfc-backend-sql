const express = require('express');
const router = express.Router();

const OrganizationController = require('../api/controllers/organization-controller');

// factchecks
router.get('/organizations/', OrganizationController.getAll);

// factcheck
router.get('/organization/:id', OrganizationController.get);
router.post('/organization/', OrganizationController.create);
router.put('/organization/:id', OrganizationController.update);
router.delete('/organization/:id', OrganizationController.destroy);

module.exports = router;