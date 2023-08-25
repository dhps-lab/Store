const express = require('express');

const validatorHandler = require('./../middlewares/validator.handler')
const UserService = require('../services/user.service');
const { createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();


router.get('/', async (req, res, next) => {
  try{
    const { limit, offset } = req.query;
    if(limit & offset) {
      res.json({
        limit,
        offset
      });
    }
    const users = await service.find();
    res.json(users);
  } catch(err){
    next(err);
  }

})

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body);
      const newUser = await service.create(body);
      res.json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
