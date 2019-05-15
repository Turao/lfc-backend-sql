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

const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('organizations', organizations, {});
};

const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('organizations', null, {});
};

export { up, down };