'use strict';

import { Model, DataTypes } from 'sequelize';

export default class Organization extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 64]
        },
      },
    },
    {
      sequelize,
      modelName: 'organization',
      tableName: 'organizations',
    }
    );
  }

  static associate(sequelize) {
    this.hasMany(sequelize.models.event);
  }

}
