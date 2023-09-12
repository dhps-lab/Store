require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || 'storeClient',
  dbPass: process.env.DB_PASS || 'admin123',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'my_store',
  dbPort: process.env.DB_PORT || '5432',
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  mailHost: process.env.MAIL_HOST,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailPort: process.env.MAIL_PORT,
  mailFrom: process.env.MAIL_FROM,
}

module.exports = config;
