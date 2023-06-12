const { request } = require('express');
const express = require('express');
const routerApi = require('./routes/index');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3010;

//this is a middleware were we can use a json in the body request
app.use(express.json());

routerApi(app);

app.listen(port, ()=> {
  console.log('listening on port', port);
});
