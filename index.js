const express = require('express');
const app = express();
const port = 3010;

app.get('/', (req, res) => {
  res.send('Hello my server on express')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hello, I\'m a new path');
});

app.get('/products', (req, res) => {
  res.json({
    name:'Product 1',
    price: 3000
  });
});

app.get('/home', (req, res) => {
  res.json({
    message: 'Hello, You\'re in the home directory',
    rc: 200
  });
});


app.get('/categories', (req, res) => {
  res.json([{
    categorie:'Grocery',
    description: 'This is a category general'
  }, {
    categorie: 'home',
    description: 'This is a home product'
  }]);
});

app.listen(port, ()=> {
  console.log('listening on port', port);
});
