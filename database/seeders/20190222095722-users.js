'use strict';
const bcrypt = require('bcrypt');

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
      const users_with_hashed_passwords = await Promise.all(
        users.map(async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
          return user;
        })
      );
      return queryInterface.bulkInsert('users', users_with_hashed_passwords, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
