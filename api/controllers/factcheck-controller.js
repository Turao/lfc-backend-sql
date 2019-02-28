'use strict';

const sequelize = require('sequelize');
const models = require('../models/');
const FactCheckModel = models.factcheck;

const FactCheckController = {
  getAll: async (_, res) => {
    const factchecks = await FactCheckModel.findAll();
    res.json(factchecks);
  },

  get: async (req, res) => {
    const { id } = req.params;
    const factcheck = await FactCheckModel.findByPk(id, {
      include: ['statement', 'checker', 'moderator'],
    });
    if (factcheck) {
      res.json(factcheck);
    } else {
      res.sendStatus(404); // not found
    }
  },

  create: async (req, res) => {
    const { factcheck } = req.body;
    try {
      const created = await FactCheckModel.create(factcheck);
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
    const { factcheck } = req.body;
    try {
      const updated = await FactCheckModel.update(factcheck, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true
      });
      res.json(updated[1]);
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
    const found = await FactCheckModel.findByPk(id);
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

module.exports = FactCheckController;
