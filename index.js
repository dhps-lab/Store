const { request } = require('express');
const express = require('express');
const { faker } = require('@faker-js/faker');
const cors = require('cors');

const routerApi = require('./routes/index');
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');


const app = express();
const port = 3010;

//this is a middleware were we can use a json in the body request
app.use(express.json());



// Only cors(), whatever server can connect to our API.

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error('Not allowed to connect to'));
    }
  }
};
app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=> {
  console.log('listening on port', port);
});
