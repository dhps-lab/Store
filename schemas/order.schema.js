const Joi = require('joi');

// Here only format fields are supported
const id = Joi.number().integer();
const customerId = Joi.number().integer();

const getOrderSchema = Joi.object({
  id: id.required(),
})

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
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

module.exports = { getOrderSchema, createOrderSchema };
