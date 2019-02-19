'use strict';

module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        max: 64,
      },
    },
    
  });

  organization.associate = (models) => {
    models.organization.hasMany(models.event);
  };

  return organization;
};
