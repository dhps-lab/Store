const { Sequelize } = require('sequelize');

const config =  require('../config/config');

const setupModels = require('./../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPass);
const options = {
  dialect: 'postgres',
  logging: false,
}

if(config.isProd){
  options.logging = true;
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);


module.exports = sequelize;
