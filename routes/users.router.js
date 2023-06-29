const express = require('express');

const UserService = require('../services/user.service');

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

router.post('/',(req, res) => {
  const body = req.body;
  res.json({
    message: 'User created',
    data: body,
    rc:'200'
  })
});

module.exports = router;
