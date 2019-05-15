'use strict';

import sequelize from 'sequelize';
import StatementModel from '../models/statement';


class StatementController {
  async get (req, res) {
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const sort = req.query.sort ? req.query.sort : 'createdAt';
    const order = req.query.order ? req.query.order : 'DESC';

    const statements = await StatementModel.findAll({
      limit,
      offset: page*limit,
      order: [[sort, order]],
      include: ['politician', 'event', 'factchecks'],
    });

    res.json(statements);
  }


  async getById (req, res) {
    const { id } = req.params;
    const statement = await StatementModel.findByPk(id, {
      include: ['politician', 'event', 'factchecks'],
    });
    if (statement) {
      res.json(statement);
    } else {
      res.sendStatus(404); // not found
    }
  }


  async create (req, res) {
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
  }


  async update (req, res) {
    const { statement } = req.body;
    try {
      const updated = await StatementModel.update(statement, {
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
  }

};

export default new StatementController();