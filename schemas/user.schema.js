const Joi = require('joi');

// Here only format fields are supported
const id = Joi.number();
const email = Joi.string().email();
const password = Joi.string().alphanum(); //If is needed password with a pattern It just adds the pattern thus .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

const getUserSchema = Joi.object({
  id: id.required(),
})

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const updateUserSchema = Joi.object({
  email: email,
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema };
