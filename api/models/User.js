const db = require('../../db');

const User = db.define('user', {
  firstName: {
    type: db.Sequelize.STRING,
  },
  lastName: {
    type: db.Sequelize.STRING,
  },
});

// force will drop the table if it already exists!
// Table created
User.sync({ force: true })
  .then(() => User.create({
    firstName: 'John',
    lastName: 'Wick',
  }));

module.exports = User;
