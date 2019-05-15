'use strict';

const up = async (queryInterface, Sequelize) => {
  const [users, ] = await queryInterface.sequelize.query(
    'SELECT id from users;'
  );

  const [events, ] = await queryInterface.sequelize.query(
    'SELECT id from events;'
  );

  const statements = [
    {
      content: 'this is some statement',
      date: new Date(),
      politicianId: users[0].id,
      eventId: events[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  return queryInterface.bulkInsert('statements', statements, {});
};

const down = (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('statements', null, {});
};

export { up, down };