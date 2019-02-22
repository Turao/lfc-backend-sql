'use strict';

const organizations = [
  {
    name: 'acme',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    name: 'hannah barbera',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('organizations', organizations, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('organizations', null, {});
  }
};
