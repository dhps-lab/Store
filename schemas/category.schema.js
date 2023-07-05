const Joi = require('joi');

// Here only format fields are supported
const id = Joi.number();
const name = Joi.string().alphanum().min(3).max(15);
const image = Joi.string().uri();

const getCategorySchema = Joi.object({
  id: id.required(),
})

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required()
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image
});

const deleteCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { getCategorySchema, createCategorySchema, updateCategorySchema, deleteCategorySchema };
