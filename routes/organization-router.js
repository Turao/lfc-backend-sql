'use strict';

import express from 'express';
const router = express.Router();

import AuthController from '../api/controllers/auth';
import OrganizationController from '../api/controllers/organization';

// organizations
router.get('/organizations/', OrganizationController.get);

// make sure user is authorized to use endpoint
router.use('/organization/', AuthController.authorize);

// organization
router.get('/organization/:id', OrganizationController.getById);
router.post('/organization/', OrganizationController.create);
router.put('/organization/:id', OrganizationController.update);
router.delete('/organization/:id', OrganizationController.destroy);

export default router;