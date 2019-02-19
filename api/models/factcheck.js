const db = require('../../database/db');

const User = require('./user');
const Statement = require('./statement');

const FactCheck = db.define('factcheck', {
  comment: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      min: 10,
      max: 256,
    },
  },

  source: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 10,
      max: 256,
      isUrl: true,
    },
  },

  veracity: {
    type: db.Sequelize.ENUM,
    values: ['true', 'false', 'partial'],
  },

  verifiedByModerator: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false,
  },

});

FactCheck.associate = (models) => {
  FactCheck.belongsTo(models.User, { as: 'checker' });
  FactCheck.belongsTo(models.Statement);
  FactCheck.belongsTo(models.User, { as: 'moderator' });
};

// force will drop the table if it already exists!
// Table created
FactCheck.sync({ force: true });

module.exports = FactCheck;
