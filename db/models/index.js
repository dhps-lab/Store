const { Category, CategorySchema } = require('./category.model');
const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize) {
  Category.init(CategorySchema, Category.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setupModels;
