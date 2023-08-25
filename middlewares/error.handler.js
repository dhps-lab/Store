const { request } = require("express");
const { Sequelize } = require("sequelize");

function logErrors(err,req,res,next) {
  console.error(err); // monitored error in console
  next(err); // Handle error to next function
}

function errorHandler(err,req,res,next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function sequelizeErrorHandler(err,req,res,next) {
  if (err instanceof Sequelize.BaseError) {
    const { output, fields } = err;
    const outputJson = {
      message: `Seems something is wrong with field ${Object.keys(fields)}`,
      fields: fields
    }
    console.log(`Seems something is wrong with field ${fields}`);
    res.status(409).json(outputJson);
  }else{
    next(err);
  }
}

function boomErrorHandler(err,req,res,next) {
  if (err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else{
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler };
