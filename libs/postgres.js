const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'storeClient',
    password: 'admin123',
    database: 'my_store'
  });
  console.log('Waiting for connection...')
  await client.connect();
  console.log('Conected')
  return client;
}

module.exports = getConnection;
