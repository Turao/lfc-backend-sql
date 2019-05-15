'use strict';

import { Model, DataTypes } from 'sequelize';

export default class FactCheck extends Model {
  static init(sequelize) {
    return super.init({
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
    },
    {
      sequelize,
      modelName: 'factcheck',
      tableName: 'factchecks',
    }
    );  
  }


  static associate(sequelize) {
    this.belongsTo(sequelize.models.user, {
      as: 'checker',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });

    this.belongsTo(sequelize.models.statement, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });

    this.belongsTo(sequelize.models.user, {
      as: 'moderator',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      },
    });
  }

}
