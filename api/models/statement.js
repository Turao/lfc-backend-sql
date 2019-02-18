const db = require('../../db/db');
const User = require('./user');
const Event = require('./event');
const FactCheck = require('./factcheck');

const Statement = db.define('statement', {
  content: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      min: 10,
      max: 256,
    },
  },

  date: {
    type: db.Sequelize.DATE,
    defaultValue: Date.now(),
  },

});

Statement.associate = (models) => {
  Statement.belongsTo(models.User, { as: 'politician' });
  Statement.belongsTo(models.Event);
  Statement.hasMany(models.FactCheck);
};

// force will drop the table if it already exists!
// Table created
Statement.sync({ force: true });

module.exports = Statement;
