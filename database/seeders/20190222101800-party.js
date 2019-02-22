'use strict';

const parties = [
  {
    name: 'good guys',
    abbreviation: 'gg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    name: 'bad guys',
    abbreviation: 'bg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    name: 'townsfolk',
    abbreviation: 'tf',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('parties', parties, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('parties', null, {});
  }
};
