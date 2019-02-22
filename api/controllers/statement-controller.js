'use strict';

const sequelize = require('sequelize');
const models = require('../models/');
const StatementModel = models.statement;

const StatementController = {
  getAll: async (_, res) => {
    const statements = await StatementModel.findAll();
    res.json(statements);
  },

  get: async (req, res) => {
    const { id } = req.params;
    const statement = await StatementModel.findByPk(id, {
      include: ['politician', 'event', 'factchecks'],
    });
    if (statement) {
      res.json(statement);
    } else {
      res.sendStatus(404); // not found
    }
  },

  create: async (req, res) => {
    const { statement } = req.body;
    try {
      const created = await StatementModel.create(statement);
      res.status(201).json(created);
    } catch (error) {
      console.error(error);
      if (error instanceof sequelize.ValidationError) {
        res.sendStatus(400); // bad request
      } else {
        res.sendStatus(500); // internal error
      }
    }
  },

  update: async (req, res) => {
    const { statement } = req.body;
    try {
      const updated = await StatementModel.update(statement, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.json(updated);
    } catch (error) {
      console.error(error);
      if (error instanceof sequelize.ValidationError) {
        res.sendStatus(400); // bad request
      } else {
        res.sendStatus(500); // internal error
      }
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    const found = await StatementModel.findByPk(id);
    if (found) {
      try {
        const destroyed = await found.destroy();
        res.sendStatus(200); // succesfull
      } catch (error) {
        console.error(error);
        res.sendStatus(500); // internal error
      }
    } else {
      res.sendStatus(404); // not found
    }
  },
};

module.exports = StatementController;
