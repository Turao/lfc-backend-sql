'use strict';

const models = require('../models/');
const OrganizationModel = models.organization;

const OrganizationController = {
  getAll: async (_, res) => {
    const organizations = await OrganizationModel.findAll();
    res.json(organizations);
  },

  get: async (req, res) => {
    const { id } = req.params;
    const organization = await OrganizationModel.findByPk(id, {
      include: ['events'],
    });
    if (organization) {
      res.json(organization);
    } else {
      res.sendStatus(404); // not found
    }
  },

  create: async (req, res) => {
    const { organization } = req.body;
    try {
      const created = await OrganizationModel.create(organization);
      res.json(created);
    } catch (error) {
      console.error(error);
      res.sendStatus(500); // internal error
    }
  },

  update: async (req, res) => {
    const { organization } = req.body;
    try {
      const updated = await OrganizationModel.update(organization, {
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
    const found = await OrganizationModel.findByPk(id);
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

module.exports = OrganizationController;
