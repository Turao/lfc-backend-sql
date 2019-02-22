'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [users, ] = await queryInterface.sequelize.query(
      'SELECT id from users;'
    );

    const [statements, ] = await queryInterface.sequelize.query(
      'SELECT id from statements;'
    );
    
    const factchecks = [
      {
        comment: 'this is some comment',
        source: 'sourceOfCheck.com',
        veracity: 'true',
        checkerId: users[0].id,
        statementId: statements[0].id,
        moderatorId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('factchecks', factchecks, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('factchecks', null, {});
  }
};
