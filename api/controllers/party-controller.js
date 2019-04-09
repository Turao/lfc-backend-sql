'use strict';

const sequelize = require('sequelize');
const models = require('../models/');
const PartyModel = models.party;

const PartyController = {
  get: async (req, res) => {
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const sort = req.query.sort ? req.query.sort : 'createdAt';
    const order = req.query.order ? req.query.order : 'DESC';

    const parties = await PartyModel.findAll({
      limit,
      offset: page*limit,
      order: [[sort, order]],
    });

    res.json(parties);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const party = await PartyModel.findByPk(id, {
      include: ['politicians'],
    });
    if (party) {
      res.json(party);
    } else {
      res.sendStatus(404); // not found
    }
  },

  create: async (req, res) => {
    const { party } = req.body;
    try {
      const created = await PartyModel.create(party);
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
    const { party } = req.body;
    try {
      const updated = await PartyModel.update(party, {
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
    const found = await PartyModel.findByPk(id);
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

module.exports = PartyController;
