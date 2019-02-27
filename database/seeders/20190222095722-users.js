'use strict';

const models = require('../../api/models');
const UserModel = models.user;

const users = [
  {
    username: 'fred',
    firstName: 'Fred',
    lastName: 'Jones',
    email: 'fred@jones.com',
    password: 'fred123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'daphne',
    firstName: 'Daphne',
    lastName: 'Blake',
    email: 'daphne@blake.com',
    password: 'daphne123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'velma',
    firstName: 'Velma',
    lastName: 'Dinkley',
    email: 'velma@dinkley.com',
    password: 'velma123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'shaggy',
    firstName: 'Norville',
    lastName: 'Rodgers',
    email: 'norville@rodgers.com',
    password: 'shaggy123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'scooby',
    firstName: 'Scooby',
    lastName: 'Doo',
    email: 'scooby@doo.com',
    password: 'scooby123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return UserModel.bulkCreate(users, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
