const { request } = require('express');
const express = require('express');
const { faker } = require('@faker-js/faker');

const routerApi = require('./routes/index');
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');


const app = express();
const port = 3010;

//this is a middleware were we can use a json in the body request
app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=> {
  console.log('listening on port', port);
});
