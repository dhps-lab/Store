const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const homeRouter = require('./home.router');
const customersRouter = require('./customer.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', homeRouter);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
}

module.exports = routerApi;
