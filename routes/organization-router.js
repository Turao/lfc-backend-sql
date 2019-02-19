const express = require('express');
const router = express.Router();

const AuthController = require('../api/controllers/auth-controller');
const OrganizationController = require('../api/controllers/organization-controller');

// organizations
router.get('/organizations/', OrganizationController.getAll);

// make sure user is authorized to use endpoint
router.use('/organization/', AuthController.authorize);

// organization
router.get('/organization/:id', OrganizationController.get);
router.post('/organization/', OrganizationController.create);
router.put('/organization/:id', OrganizationController.update);
router.delete('/organization/:id', OrganizationController.destroy);

module.exports = router;