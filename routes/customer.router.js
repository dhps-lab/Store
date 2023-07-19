const express = require('express');

const validatorHandler = require('./../middlewares/validator.handler')

const CustomerService = require('./../services/customer.service');
const { createCustomerSchema, getCustomerSchema } = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req,res,next) => {
  try{
    const customers = await service.find();
    return res.json(customers);
  }catch(err){
    next(err);
  }
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req,res,next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      return res.json(newCustomer);
    } catch (err) {
      next(err);
    }
})

module.exports = router;
