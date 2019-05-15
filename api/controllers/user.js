'use strict';

import Sequelize from 'sequelize';
import User from '../models/user';


class UserController {
  
  async get(req, res) {
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const sort = req.query.sort ? req.query.sort : 'createdAt';
    const order = req.query.order ? req.query.order : 'DESC';

    const users = await User.findAll({
      limit,
      offset: page*limit,
      order: [[sort, order]],
    });

    res.json(users);
  }

  async getById(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404); // not found
    }
  }

  async create(req, res) {
    const { user } = req.body;
    try {
      const created = await User.create(user);
      // override password bc model scope does not work with create
      created.password = undefined;
      res.status(201).json(created);
    } catch (error) {
      console.error(error);
      if (error instanceof Sequelize.ValidationError) {
        res.sendStatus(400); // bad request
      } else {
        res.sendStatus(500); // internal error
      }
    }
  }

  async update(req, res) {
    const { user } = req.body;
    try {
      const updated = await User.update(user, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true
      });
      res.json(updated[1]);
    } catch (error) {
      console.error(error);
      if (error instanceof Sequelize.ValidationError) {
        res.sendStatus(400); // bad request
      } else {
        res.sendStatus(500); // internal error
      }
    }
  }
  
  async destroy(req, res) {
    const { id } = req.params;
    const found = await User.findByPk(id);
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

export default new UserController();