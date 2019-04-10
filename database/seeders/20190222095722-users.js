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

  {
    username: 'bond',
    firstName: 'James',
    lastName: 'Bond',
    email: 'james@bond.com',
    password: 'bond123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'john',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: 'john123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'bart',
    firstName: 'Bart',
    lastName: 'Simpson',
    email: 'bart@simpson.com',
    password: 'bart123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'homer',
    firstName: 'Homere',
    lastName: 'Simpson',
    email: 'homer@simpson.com',
    password: 'homer123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'lisa',
    firstName: 'Lisa',
    lastName: 'Simpson',
    email: 'lisa@simpson.com',
    password: 'lisa123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'marge',
    firstName: 'Marge',
    lastName: 'Simpson',
    email: 'marge@simpson.com',
    password: 'marge123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'maggie',
    firstName: 'Maggie',
    lastName: 'Simpson',
    email: 'maggie@simpson.com',
    password: 'maggie123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return UserModel.bulkCreate(users, { individualHooks: true });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
