'use strict';

const models = require('../models/');
const PartyModel = models.party;

const PartyController = {
  getAll: async (_, res) => {
    const parties = await PartyModel.findAll();
    res.json(parties);
  },

  get: async (req, res) => {
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
      res.json(created);
    } catch (error) {
      console.error(error);
      res.sendStatus(500); // internal error
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
      });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.sendStatus(500); // internal error
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
