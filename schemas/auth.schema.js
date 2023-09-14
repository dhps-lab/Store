const Joi = require('joi');

// Here only format fields are supported
const email = Joi.string().email();
const password = Joi.string(); //If is needed password with a pattern It just adds the pattern thus .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
const token = Joi.string();

const logInSchema = Joi.object({
  email: email.required(),
  password: password.required(),
})

const recoverySchema = Joi.object({
  email: email.required(),
});

const changePasswordSchema = Joi.object({
  newPassword: password.required(),
  token: token.required()
});

module.exports = { logInSchema, recoverySchema, changePasswordSchema };
