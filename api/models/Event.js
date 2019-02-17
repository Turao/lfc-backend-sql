const db = require('../../db/db');

const User = require('./User');
const Statement = require('./Statement');
const Organization = require('./Organization');

const Event = db.define('event', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 64,
      isAlphanumeric: true,
    },
  },

  date: {
    type: db.Sequelize.DATE,
    validate: {
      isAfter: Date.now(),
    },
  },

});

Event.associate = (models) => {
  Event.belongsTo(models.Organization);
  Event.hasMany(models.User, { as: 'moderators' });
  Event.hasMany(models.Statement);
};

// force will drop the table if it already exists!
// Table created
Event.sync({ force: true });

module.exports = Event;
