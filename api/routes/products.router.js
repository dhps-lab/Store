const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();
const ProductsService = require('../services/products.service');
const service = new ProductsService();

router.get('/filter', (req, res) => {
  res.send(faker.commerce.productName());
})

router.get('/', (req, res) => {
  const products = service.find();
  res.status(200).json(products);
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.status(200).json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const product = service.create(body);
  res.status(201).json(product);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.updateProduct(id, body);
  res.json(product);
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = service.delete(id);
  res.json(deleted);
});

module.exports = router;
