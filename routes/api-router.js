'use strict';

import express from 'express';
const router = express.Router();

import AuthRouter from './auth-router';
router.use('/', AuthRouter);

import EventRouter from './event-router';
router.use('/', EventRouter);

import FactCheckRouter from './factcheck-router';
router.use('/', FactCheckRouter);

import OrganizationRouter from './organization-router';
router.use('/', OrganizationRouter);

import PartyRouter from './party-router';
router.use('/', PartyRouter);

import StatementRouter from './statement-router';
router.use('/', StatementRouter);

import UserRouter from './user-router';
router.use('/', UserRouter);

export default router;