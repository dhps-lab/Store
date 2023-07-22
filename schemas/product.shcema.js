const Joi = require('joi');

// Here only format fields are supported
const id = Joi.number();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();

const getProductSchema = Joi.object({
  id: id.required(),
})

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { getProductSchema, createProductSchema, updateProductSchema, deleteProductSchema };
