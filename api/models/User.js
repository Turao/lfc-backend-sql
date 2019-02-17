const db = require('../../db/db');

const User = db.define('user', {
  username: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 8,
      max: 64,
      isAlphanumeric: true,
    },
  },

  firstName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 64,
      isAlpha: true,
    },
  },

  lastName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 64,
      isAlpha: true,
    },
  },

  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      max: 64,
    },
  },

  password: {
    type: db.Sequelize.STRING,
  },
});

// force will drop the table if it already exists!
// Table created
User.sync({ force: true });

module.exports = User;
