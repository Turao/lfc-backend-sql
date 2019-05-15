'use strict';

import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {

  static init(sequelize) {
    const hashPassword = async (user) => {
      if(user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10)
      }
    }

    return super.init({
      // attributes
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 64],
          isAlphanumeric: true,
        },
      },
      
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 64],
          isAlpha: true,
        },
      },
      
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 64],
          isAlpha: true,
        },
      },
      
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [1, 64],
        },
      },
      
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'users',
    
      // options
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      
      scopes: {
        withPassword: {
          attributes: {},
        }
      },

      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      }
    });
  }
  
  async verifyPassword (password) {
    return await bcrypt.compare(password, this.password);
  }
}

export default User;