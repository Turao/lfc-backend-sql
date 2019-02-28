'use strict';

module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 64]
      },
    },
    
  });

  organization.associate = (models) => {
    models.organization.hasMany(models.event);
  };

  return organization;
};
