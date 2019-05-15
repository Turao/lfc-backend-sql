'use strict';

import sequelize from 'sequelize';
import EventModel from '../models/event';


class EventController {
  async get (req, res) {
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const sort = req.query.sort ? req.query.sort : 'createdAt';
    const order = req.query.order ? req.query.order : 'DESC';

    const events = await EventModel.findAll({
      limit,
      offset: page*limit,
      order: [[sort, order]],
      include: ['organization', 'moderators', 'statements'],
    });

    res.json(events);
  }


  async getById (req, res) {
    const { id } = req.params;
    const event = await EventModel.findByPk(id, {
      include: ['organization', 'moderators', 'statements'],
    });
    if (event) {
      res.json(event);
    } else {
      res.sendStatus(404); // not found
    }
  }


  async create (req, res) {
    const { event } = req.body;
    try {
      const created = await EventModel.create(event);
      res.status(201).json(created);
    } catch (error) {
      console.error(error);
      if (error instanceof sequelize.ValidationError) {
        res.sendStatus(400); // bad request
      } else {
        res.sendStatus(500); // internal error
      }
    }
  }


  async update (req, res) {
    const { event } = req.body;
    try {
      const updated = await EventModel.update(event, {
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
  }


  async destroy (req, res) {
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
  }

};

export default new EventController();