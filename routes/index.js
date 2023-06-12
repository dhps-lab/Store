const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const homeRouter = require('./home.router');

function routerApi(app){
  app.use('/', homeRouter);
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter);
}

module.exports = routerApi;
