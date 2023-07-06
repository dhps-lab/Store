require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || 'storeClient',
  dbPass: process.env.DB_PASS || 'admin123',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'my_store',
  dbPort: process.env.DB_PORT || '5432'
}

module.exports = config;
