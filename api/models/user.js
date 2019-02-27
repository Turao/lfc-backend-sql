'use strict';

const bcrypt = await require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
        max: 64,
        isAlphanumeric: true,
      },
    },
    
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        max: 64,
        isAlpha: true,
      },
    },
    
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        max: 64,
        isAlpha: true,
      },
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        max: 64,
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
  
  const hashPasswordHook = async function (instance, _) {
    if(instance.changed('password')) {
      instance.password = await bcrypt.hash(instance.password, 10);
      await console.log(hash, instance.password);
    }
  };
  
  user.beforeCreate(hashPasswordHook);
  user.beforeUpdate(hashPasswordHook);
  
  return user;
};
