const Joi = require('joi');

// Here only format fields are supported
const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
})

const createOrderSchema = Joi.object({
  customerId,
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

const updateProductSchema = Joi.object({
  // name: name,
  // price: price,
  // image: image,
  // description
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { getOrderSchema, createOrderSchema, addItemSchema};
