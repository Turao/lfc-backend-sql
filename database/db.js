const Sequelize = require('sequelize');

const db = new Sequelize({
  database: 'database',
  username: 'psuser',
  password: 'pspassword',
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  operatorsAliases: false,
});

module.exports = db;
