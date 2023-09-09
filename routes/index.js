const express = require('express');
const passport = require('passport');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const homeRouter = require('./home.router');
const customersRouter = require('./customer.router');
const ordersRouter = require('./order.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', homeRouter);
  router.use('/products',
  passport.authenticate('jwt', { session: false}),
  productsRouter);
  router.use('/orders', ordersRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
