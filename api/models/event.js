const db = require('../../database/db');

const User = require('./user');
const Statement = require('./statement');
const Organization = require('./organization');

const Event = db.define('event', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 64,
    },
  },

  date: {
    type: db.Sequelize.DATE,
    defaultValue: Date.now(),
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
