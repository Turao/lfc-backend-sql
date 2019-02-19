'use strict';

const models = require('../models/');
const UserModel = models.user;

const UserController = {
  getAll: async (_, res) => {
    const users = await UserModel.findAll();
    res.json(users);
  },

  get: async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404); // not found
    }
  },

  create: async (req, res) => {
    const { user } = req.body;
    try {
      const created = await UserModel.create(user);
      // override password bc model scope does not work with create
      created.password = undefined;
      res.json(created);
    } catch (error) {
      console.error(error);
      res.sendStatus(500); // internal error
    }
  },

  update: async (req, res) => {
    const { user } = req.body;
    try {
      const updated = await UserModel.update(user, {
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
    const found = await UserModel.findById(id);
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

module.exports = UserController;
