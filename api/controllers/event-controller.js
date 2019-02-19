'use strict';

const models = require('../models/');
const EventModel = models.event;

const EventController = {
  getAll: async (_, res) => {
    const events = await EventModel.findAll();
    res.json(events);
  },

  get: async (req, res) => {
    const { id } = req.params;
    const event = await EventModel.findByPk(id, {
      include: ['organization', 'moderators', 'statements'],
    });
    if (event) {
      res.json(event);
    } else {
      res.sendStatus(404); // not found
    }
  },

  create: async (req, res) => {
    const { event } = req.body;
    try {
      const created = await EventModel.create(event);
      res.json(created);
    } catch (error) {
      console.error(error);
      res.sendStatus(500); // internal error
    }
  },

  update: async (req, res) => {
    const { event } = req.body;
    try {
      const updated = await EventModel.update(event, {
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
    const found = await EventModel.findByPk(id);
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

module.exports = EventController;
