const boom = require('@hapi/boom');

function validatorHandler(schema, property){
  // We return a middleware to validate whatever schema with right property
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false}); // abort early is false for return with all errors
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
