const db = require('../../db/db');
const User = require('./User');

const Party = db.define('party', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 64,
    },
  },

  abbreviation: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 64,
      isAlpha: true,
    },
  },

});

Party.associate = (models) => {
  Party.hasMany(models.User, { as: 'politicians' });
};

// force will drop the table if it already exists!
// Table created
Party.sync({ force: true });

module.exports = Party;
