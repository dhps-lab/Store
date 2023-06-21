const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if(limit & offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('There aren\'t parameters');
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
