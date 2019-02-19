'use strict';

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        max: 64,
      },
    },
    
    date: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    
  });

  event.associate = (models) => {
    models.event.belongsTo(models.organization, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      }
    });
    models.event.hasMany(models.user, { as: 'moderators' });
    models.event.hasMany(models.statement);
  };

  return event;
};
