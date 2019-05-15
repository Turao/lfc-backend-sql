'use strict';

import { Model, DataTypes } from 'sequelize';

export default class Event extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 64],
        },
      },
      
      date: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      sequelize,
      modelName: 'event',
      tableName: 'events',
    }
    );
  }

  static associate(sequelize) {
    this.belongsTo(sequelize.models.organization, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      }
    });

    this.hasMany(sequelize.models.user, { as: 'moderators' });
    this.hasMany(sequelize.models.statement);
  }

}