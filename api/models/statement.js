'use strict';

import { Model, DataTypes } from 'sequelize';

export default class Statement extends Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [10, 256],
        },
      },
    
      date: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      sequelize,
      modelName: 'statement',
      tableName: 'statements',
    }
    );
  }


  static associate(sequelize) {
    this.belongsTo(sequelize.models.user, {
      as: 'politician',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    
    this.belongsTo(sequelize.models.event, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    
    this.hasMany(sequelize.models.factcheck);
  }

}
