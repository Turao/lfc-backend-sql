const db = require('../../db/db');
const Event = require('./event');

const Organization = db.define('organization', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 64,
    },
  },

});

Organization.associate = (models) => {
  Organization.hasMany(models.Event);
};

// force will drop the table if it already exists!
// Table created
Organization.sync({ force: true });

module.exports = Organization;
