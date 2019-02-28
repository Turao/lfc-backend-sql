'use strict';

module.exports = (sequelize, DataTypes) => {
  const factcheck = sequelize.define('factcheck', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 256],
      },
    },
    
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 256],
        isUrl: true,
      },
    },
    
    veracity: {
      type: DataTypes.ENUM,
      values: ['true', 'false', 'partial'],
    },
    
    verifiedByModerator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
  });

  factcheck.associate = (models) => {
    models.factcheck.belongsTo(models.user, {
      as: 'checker',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      }
    });
    models.factcheck.belongsTo(models.statement, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      }
    });
    models.factcheck.belongsTo(models.user, {
      as: 'moderator',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      }
    });
  };

  return factcheck;
};
