'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [organizations, ] = await queryInterface.sequelize.query(
      'SELECT id from organizations;'
    );

    const events = [{
      name: '2020 US Elections',
      date: new Date(),
      organizationId: organizations[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }];

    return queryInterface.bulkInsert('events', events, {});
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('events', null, {});
  }
};
