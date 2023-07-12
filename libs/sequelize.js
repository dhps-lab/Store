const { Sequelize } = require('sequelize');

const config =  require('../config/config');

const setupModels = require('./../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPass);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

console.log(URI);
const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: false,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
