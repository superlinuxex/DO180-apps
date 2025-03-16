const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME || 'todoapp', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'password', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
});

module.exports = sequelize;