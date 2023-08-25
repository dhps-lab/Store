const express = require('express');
const router = express.Router();
const { checkApiKey } = require('../middlewares/auth.handler');

router.get('/', (req, res) => {
  res.send('Hello my server on express')
});

router.get('/shopping-cart', checkApiKey, (req, res) => {
  res.send('Hello, I\'m a new path');
});

router.get('/home', (req, res) => {
  res.json([
    {
    message: 'Hello, You\'re in the home directory',
    rc: 200
    }
  ]);
});


module.exports = router;
