'use strict';

import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
import config from '../../config/database';

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);


// load models
import Event from './event';
import FactCheck from './factcheck';
import Organization from './organization';
import Party from './party';
import Statement from './statement';
import User from './user';

const models = {
  Event,
  FactCheck,
  Organization,
  Party,
  Statement,
  User,
};

// initalize models on database
Object.values(models).forEach(model => model = model.init(sequelize))

// run associate function if exists
// ie create relationships in the ORM
Object.values(models)
      .filter(model => typeof model.associate === 'function')
      .forEach(model => model.associate(sequelize))


export { sequelize };
