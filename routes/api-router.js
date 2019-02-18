const express = require('express');
const router = express.Router();

const EventRouter = require('./event-router');
const FactCheckRouter = require('./factcheck-router');
const OrganizationRouter = require('./organization-router');
const PartyRouter = require('./party-router');
const StatementRouter = require('./statement-router');
const UserRouter = require('./user-router');

router.use('/', EventRouter);
router.use('/', FactCheckRouter);
router.use('/', OrganizationRouter);
router.use('/', PartyRouter);
router.use('/', StatementRouter);
router.use('/', UserRouter);

module.exports = router;
