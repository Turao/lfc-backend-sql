'use strict';

module.exports = (sequelize, DataTypes) => {
  const party = sequelize.define('party', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 64],
      },
    },
    
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 64],
        isAlpha: true,
      },
    },
    
  });

  party.associate = (models) => {
    models.party.hasMany(models.user, { as: 'politicians' });
  };

  return party;
};