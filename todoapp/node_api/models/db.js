
const { Sequelize } = require('sequelize');

module.exports.params = {
  dbname: process.env.MYSQL_ENV_MYSQL_DATABASE,
  username: process.env.MYSQL_ENV_MYSQL_USER,
  password: process.env.MYSQL_ENV_MYSQL_PASSWORD,
  params: {
    host: process.env.MYSQL_HOST || 'mysql',
    port: process.env.MYSQL_PORT || '3306',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: false
  }
};
