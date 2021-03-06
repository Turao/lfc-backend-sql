'use strict';

const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define('user', {
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
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    
    scopes: {
      withPassword: {
        attributes: {},
      }
    }
  });
  
  const hashPassword = async function (instance, _) {
    if(instance.changed('password')) {
      instance.password = await bcrypt.hash(instance.password, 10);
    };
  };
  
  user.beforeCreate(hashPassword);
  user.beforeUpdate(hashPassword);
  
  return user;
};
