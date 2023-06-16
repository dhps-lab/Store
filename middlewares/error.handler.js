const { request } = require("express");

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

function boomErrorHandler(err,req,res,next) {
  if (err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else{
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
