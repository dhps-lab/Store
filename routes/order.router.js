const express = require('express');

const validatorHandler = require('./../middlewares/validator.handler')

const OrderService = require('./../services/order.service');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req,res,next) => {
  try{
    const orders = await service.find();
    return res.json(orders);
  }catch(err){
    next(err);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req,res,next) => {
    try{
      const { id } = req.params;
      const orders = await service.findOne(id);
      return res.json(orders);
    }catch(err){
      next(err);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req,res,next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      return res.json(newOrder);
    } catch (err) {
      next(err);
    }
});

router.post('/add-item/',
  validatorHandler(addItemSchema , 'body'),
  async (req,res,next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      return res.json(newItem);
    } catch (err) {
      next(err);
    }
});

module.exports = router;
