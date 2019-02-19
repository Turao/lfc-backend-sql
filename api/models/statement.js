'use strict';

module.exports = (sequelize, DataTypes) => {
  const statement = sequelize.define('statement', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 10,
      max: 256,
    },
  },

  date: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  
});

statement.associate = (models) => {
  models.statement.belongsTo(models.user, {
    as: 'politician',
    onDelete: 'CASCADE',
    foreignKey: {
      allowNull: false,
    }
  });
  models.statement.belongsTo(models.event, {
    onDelete: 'CASCADE',
    foreignKey: {
      allowNull: false,
    }
  });
  models.statement.hasMany(models.factcheck);
};

return statement
};