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

const up = (queryInterface, Sequelize) => {
  try {
    return queryInterface.bulkInsert('parties', parties, {});
  } catch (erro) {
    console.trace(error);
  }
};

const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('parties', null, {});
};

export { up, down };