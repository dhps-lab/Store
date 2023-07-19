const Joi = require('joi');

// Here only format fields are supported
const id = Joi.number().integer();
const name = Joi.string().alphanum();
const lastName = Joi.string().alphanum();
const phone = Joi.string().alphanum();;
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().alphanum(); //If is needed password with a pattern It just adds the pattern thus .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

const getCustomerSchema = Joi.object({
  id: id.required(),
})

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});

const deleteCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, deleteCustomerSchema, getCustomerSchema, updateCustomerSchema };
