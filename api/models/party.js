'use strict';

import { Model, DataTypes } from 'sequelize';

export default class Party extends Model {
  static init(sequelize) {
    return super.init({
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
    },
    {
      sequelize,
      modelName: 'party',
      tableName: 'parties',
    }
    );
  }

  static associate(sequelize) {
    this.hasMany(sequelize.models.user, { as: 'politicians' });
  }

}
