const { request } = require('express');
const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3010;

app.get('/', (req, res) => {
  res.send('Hello my server on express')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hello, I\'m a new path');
});

app.get('/products/filter', (req, res) => {
  res.send(faker.commerce.productName());
})

app.get('/products', (req, res) => {

  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    })
  }

  res.json(products);
});



app.get('/home', (req, res) => {
  res.json([
    {
    message: 'Hello, You\'re in the home directory',
    rc: 200
    }
  ]);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    name:'Product 1',
    price: 3000
    });
});

app.get('/users', (req, res) => {
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


app.get('/categories', (req, res) => {
  res.json([{
    category:'Grocery',
    description: 'This is a category general'
  }, {
    category: 'home',
    description: 'This is a home product'
  }]);
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { productId, categoryId } = req.params;

  res.json([{
    productId: productId,
    category: categoryId,
    description: 'This is a category general'
  }, {
    productId: productId,
    category: categoryId,
    description: 'This is a home product'
  }]);
});

app.listen(port, ()=> {
  console.log('listening on port', port);
});
